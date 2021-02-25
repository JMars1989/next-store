import { useState, useEffect } from "react";
import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import Image from "next/image";
import useCart from "../../hooks/useCart";

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(90% / 2);
  margin: 0.8rem 0.8rem;
`;

const Block = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 2.6rem;
`;

const Price = styled.span`
  font-size: 1.5rem;
  border-radius: 5px;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  /* padding: 0 0 0.5rem 0;  
  margin: 1rem 0 0.5rem 0; */
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10px;
  height: 10px;
  padding: 10px 20px;
  margin: 0.2rem 0.4rem 0.8rem 0rem;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid;

  &:hover,
  &:active {
    background-color: #878787;
  }
  background: ${(props) => (props.selected ? "#898989" : "#3d3d3d")};
  color: ${(props) => (props.selected ? "#ffffff" : "#c2c2c2")};
`;

const Input = styled.input`
  opacity: 0;
  width: 0px;
  position: fixed;
`;
//opacity and width = 0 to remove

const AddToCartButton = styled.button`
  height: 3rem;
  font-size: 1.2rem;

  &:hover,
  &:active {
    background-color: #878787;
  }
`;

const Product = ({ product: { data, content } }) => {
  const { addItemToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(-1);

  useEffect(() => {
    if (!data.sizes) {
      setSelectedSize(-1);
    } else {
      setSelectedSize("S");
    }
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(data, 1, selectedSize);
  };

  const html = marked(content);
  return (
    <Page>
      <ProductsContainer>
          <Image
            alt="Relic"
            src={`/images/${data.imageName}`}
            width={798}
            height={798}
            layout="intrinsic"
          />

        <Wrapper>
          <Title>{data.name}</Title>
          <Price>${data.price / 100}.00</Price>
          <Block>
            {data.sizes &&
              data.sizes.map((s, i) => {
                return (
                  <Label field={s} selected={s === selectedSize}>
                    <Input
                      type="radio"
                      value={s}
                      name={"Size"}
                      onChange={() => setSelectedSize(s)}
                      key={i}
                    />
                    {s}
                  </Label>
                );
              })}
          </Block>
          <AddToCartButton onClick={handleClick}>Add to cart</AddToCartButton>

          <div>
            <SubTitle>{data.description}</SubTitle>
            <SubTitle dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </Wrapper>
      </ProductsContainer>
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
