import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const Container = styled.div`
  
  min-height: 400px;
  position: relative;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;
//padding: 1rem 2rem;
//background: #8f8b88; //to match shirt mock up

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;
//grid-template-columns: 1fr 1fr;
//grid-template-columns: auto auto auto;
//display: inline-grid;

const Price = styled.div`
  bottom: 0.5rem;
  right: 1rem;
  font-size: 1.5rem;
  display: block;
`;
//position: absolute;

const renderProduct = product => {
  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <Image
            alt="Relic"
            src={`/images/${product.imageName}`}
            width={1000}
            height={1000}
          />
          <h1>{product.name}</h1>
          {/* <p>{product.description}</p> */}
          <Price>${product.price / 100}.00</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = props => {
  const { addItemToCart } = useCart();
  return (
    <ProductsContainer>
      {props.products.map(product => renderProduct(product, addItemToCart))}
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
