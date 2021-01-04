import fs from 'fs';
import matter from 'gray-matter';

const Product = ({ product: { data, content } }) => {
    return (
        <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>${data.price / 100}</p>
        </div>
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