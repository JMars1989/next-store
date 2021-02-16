import fs from 'fs';
import matter from 'gray-matter';
import marked from "marked";
import styled from 'styled-components';
import Page from '../../components/styled/Page';
import Image from "next/image";

const Title = styled.div`
    display: flex;
    align-items: flex-end;
`
const SubTitle = styled.p`
    padding: 0.75rem 0.5rem;
    color: #666;
`

const Price = styled.span`
    font-size: 2rem;
    padding: 0.25rem 1rem;
    border-radius: 5px;
    background: #000000;
    color: white;
    font-weight: 800;
    margin-bottom: 1rem;
    display: inline-block;
`

//need drop down selector for available sizes that shows only if the product has the option

const Product = ({ product: { data, content } }) => {
    const html = marked(content)
    return (
        <Page>
            <Title>
                <h1>{data.name}</h1>
                <SubTitle>{data.description}</SubTitle>
            </Title>
            <Image alt="Relic" src={`/images/${data.imageName}`} width={1000} height={1000} />
            <Price>${data.price / 100}</Price>
            {data.sizes && <h3>What size? {data.sizes[0]}</h3>}
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </Page>
    )
};

export const getStaticPaths = () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const paths = filenames.map(filename => {
        return {
            params: {
                product: filename.replace('.md', ''),
            },
        };
    });

    return {
        paths,
        fallback: false,
    }
};

export const getStaticProps = async (context) => {
    const productName = context.params.product
    const filepath = `${process.cwd()}/content/${productName}.md`;
    const fileContent = fs.readFileSync(filepath).toString();
    const { data, content } = matter(fileContent);
    return {
        props: {
            product: {
                data,
                content,
            }
        },
    };
};

export default Product;