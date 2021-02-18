import { useState, useEffect } from "react";
import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import Image from "next/image";
import useCart from "../../hooks/useCart";

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;
const SubTitle = styled.p`
  padding: 0.75rem 0.5rem;
  color: #666;
`;

const Price = styled.span`
  font-size: 2rem;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  background: #000000;
  color: white;
  font-weight: 800;
  margin-bottom: 1rem;
  display: inline-block;
`;

const Input = styled.input`
  margin: 7px;
  opacity: 1;
`;

//opacity and width = 0 to remove
//  position: fixed;
// width: 0;

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

const Product = ({ product: { data, content } }) => {
  const { cart, addItemToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(-1);

  //!product.sizes => size = -1 for physical media
  //product.sizes => size = small by default
  useEffect(() => {
    if (!data.sizes) {
      console.log("No sizes");
      setSelectedSize(-1);
    } else {
      setSelectedSize("small");
    }
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(data, 1, selectedSize);
  };

  const html = marked(content);
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
        <SubTitle>{data.description}</SubTitle>
      </Title>
      <Image
        alt="Relic"
        src={`/images/${data.imageName}`}
        width={"400%"}
        height={"400%"}
      />

      {data.sizes &&
        data.sizes.map((s) => {
          return (
            <Label field={s}>
              <Input
                type="radio"
                value={s}
                name={"Size"}
                onChange={() => setSelectedSize(s)}
                //onChange={() => console.log(s)}
                // style={{ backgroundColor: "black" }}
                // checked={true}
              />
              {s}
            </Label>
          );
        })}

      <button onClick={handleClick}>Add to cart</button>
      <Price>${data.price / 100}</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};

export const getStaticPaths = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filepath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filepath).toString();
  const { data, content } = matter(fileContent);
  return {
    props: {
      product: {
        data,
        content,
      },
    },
  };
};

export default Product;
