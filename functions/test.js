//const { default: Product } = require("../pages/products/[product]")

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        //body: `public key: ${process.env.STRIPE_PUBLIC_KEY}`
        body: "Test"
    };
};