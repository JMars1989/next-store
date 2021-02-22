import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import matter from "gray-matter";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Container = styled.div`
  min-height: 400px;
  position: relative;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
  margin: 0 .3rem 0 .3rem;
`;
//padding: 1rem 2rem;
//background: #8f8b88; //to match shirt mock up

// const ProductsContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-gap: 0.5rem;
//   margin: 0 auto;
// `;

const Title = styled.h1`
  margin: 0 0;
  padding: 0.25rem 0 0.25rem 0;
`;

const Price = styled.div`
  font-size: 1.5rem;
  padding: 0 0 1.2rem 0;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const renderProduct = (product) => {
  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <Image
            alt="Relic"
            src={`/images/${product.imageName}`}
            width={400}
            height={400}
            layout="intrinsic"
          />
          <Center>
            <Title>{product.name}</Title>
            <Price>${product.price / 100}.00</Price>
          </Center>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = props => {
  const { addItemToCart } = useCart();
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
