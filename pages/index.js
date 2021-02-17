import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Price = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 2.5rem;
`;

const Input = styled.input`
  margin: 7px;
  opacity: 0;
  position: fixed;
  width: 0;


`;

const Label = styled.label`
  width: 60px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 1px;
  font-size: 14px;
  text-shadow: 1px 1px 1px #000000;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid;

  &:hover,
  &:active {
    background-color: #999999;
  }
`;



const renderProduct = (product, addItemToCart) => {
  const [selectedSize, setSelectedSize] = useState("small");

  //!product.sizes => size = -1 for physical media
  //product.sizes => size = small by default
  useEffect(() => {
    if (!product.sizes) {
      setSelectedSize(-1);
    } else {
      setSelectedSize("small");
    }
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  return (
    <Container>
      <Link key={product.id} href={product.slug}>
        <UnstyledLink>
          <h1>{product.name}</h1>
          <Image
            alt="Relic"
            src={`/images/${product.imageName}`}
            width={1000}
            height={1000}
          />
          <p>{product.description}</p>
          <button onClick={handleClick}>Add to cart</button>
          <Price>${product.price / 100}</Price>
        </UnstyledLink>
      </Link>
      {product.sizes &&
        product.sizes.map((s) => {
          return (
            <Label field={s}>
              <Input
                type="radio"
                value={s}
                name={"Size"}
                onChange={({ target }) => setSelectedSize(target.value)}
              />
              {s}
            </Label>
          );
        })}
    </Container>
  );
};

const HomePage = (props) => {
  const { cart, addItemToCart } = useCart();
  //console.log(cart);
  return (
    <ProductsContainer>
      {props.products.map((product) => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    // read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    // pull out frontmatter => name
    const { data } = matter(fileContent);
    // return name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug,
    };
    return product;
  });

  return {
    props: {
      products,
    },
  };
};

export default HomePage;
