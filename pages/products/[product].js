import { useState, useEffect } from "react";
import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import Image from "next/image";
import useCart from "../../hooks/useCart";

const Block = styled.div`
  display: block;
  align-items: flex-end;
`;
const SubTitle = styled.p`
  padding: 0.3rem 0.5rem;
`

const Price = styled.span`
  font-size: 2rem;
  padding: 0.2rem 1rem;
  border-radius: 5px;
  font-weight: 800;
`;
// background: #000000;
// color: white;


const Input = styled.input`
  margin: 7px;
  opacity: 0;
  width: 0px;
  position: fixed;  
`;
//opacity and width = 0 to remove

const Label = styled.label`
  width: 100px;
  height: 100px;
  padding: 10px;
  margin: 0.3rem;
  justify-content: center;
  align-content: center;
  align-items: center;
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
//  text-shadow: 1px 1px 1px #000000;
//color: ${(props) => (props.selected ? "palevioletred" : "ff0000")};
// ${({ selectedSize }) =>
// selectedSize &&
// `
// background: 'ff0000';
// `}
//background: ${props => props.selected ? "palevioletred" : "ff0000"};
//backgroundColor: ${props => props.value === props.selectedSize ? "palevioletred" : "white"}
//background-color: transparent;
//display: flex;

const AddToCartButton = styled.button`
  display: inline-block;
  width: 80%;
  margin: 1rem 0.3rem;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 0.5rem 0;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Product = ({ product: { data, content } }) => {
  const { cart, addItemToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(-1);

  useEffect(() => {
    if (!data.sizes) {
      console.log("No sizes");
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
        <Wrapper>
          <Image
            alt="Relic"
            src={`/images/${data.imageName}`}
            width={"400%"}
            height={"400%"}
            layout="intrinsic"
          />
        </Wrapper>
        <Wrapper>
          <Block>
            <h1>{data.name}</h1>
            <Price>${data.price / 100}</Price>
            <SubTitle>{data.description}</SubTitle>
          </Block>

          <Block>
            {data.sizes &&
              data.sizes.map((s, i) => {
                return (
                  <Label field={s} selected={s == selectedSize} >
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

          <div dangerouslySetInnerHTML={{ __html: html }} />
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
