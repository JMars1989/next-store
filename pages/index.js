import Link from 'next/link'
import fs from 'fs';
import matter from 'gray-matter'


const HomePage = (props) => {
    return props.products.map((product) => {
        return (
            <div>
                <Link href={product.slug}>
                    <a><h1>{product.name}</h1></a>
                </Link>
                <p>{product.description}</p>
                <p>${product.price / 100}</p>
            </div>
        );
    });
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