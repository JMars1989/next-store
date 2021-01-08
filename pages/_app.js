import styled from "styled-components";
import { Normalize } from "styled-normalize";
import NavBar from '../components/NavBar';
import CartProvider from "../context/Cart";
import Cart from "../components/Cart";

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

    ${'' /* from uiGradients */}
    background: linear-gradient(to right, #1d4350, #a43931);
    font-family: 'Lato', sans-serif;
    ${'' /* color: #EEEFF0; */}
    min-height: 100vh;
`

const Page = styled.div`
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
`

const MyApp = ({ Component, pageProps }) => {
    return (
        <CartProvider>
            <Container>
                <Normalize />
                <NavBar />
                <Page>
                    <Component {...pageProps} />
                </Page>
                <Cart />
            </Container>
        </CartProvider>
    )
}

export default MyApp;