import Link from 'next/link'
import fs from 'fs';
import matter from 'gray-matter'
import styled from "styled-components";
import Product from './products/[product]';
import UnstyledLink from '../components/styled/UnstyledLink';

const Container = styled.div`
    background: white;
    padding: 1rem 2rem;
    min-height: 200px;
    position: relative;
`

const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    margin: 0.5rem 0;
`
const Price = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
`

const renderProduct = (product) => {
    return (
        <Link href={product.slug}>
            <UnstyledLink>
                <Container>
                    <h1>{product.name}</h1>

                    <p>{product.description}</p>
                    <Price>${product.price / 100}</Price>
                </Container>
            </UnstyledLink>
        </Link>
    )
}

const HomePage = (props) => {
    return <ProductsContainer>
        {props.products.map((product) => {
            return (
                renderProduct(product)
            );
        })}
    </ProductsContainer>;
};

export const getStaticProps = async () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const products = filenames.map((filename) => {
        const fileContent = fs.readFileSync(`${directory}/${filename}`)
        const { data } = matter(fileContent);
        console.log(data);
        const slug = `/products/${filename.replace('.md', '')}`
        const product = {
            ...data,
            slug,
        }
        return product;
    })

    console.log(products)

    return {
        props: {
            products,
        },
    }
}

export default HomePage