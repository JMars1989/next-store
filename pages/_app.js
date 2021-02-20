import styled from "styled-components";
import { Normalize } from "styled-normalize";
import NavBar from '../components/NavBar';
import CartProvider from "../context/Cart";
import Cart from "../components/Cart";
import Page from "../components/styled/Page";

const Container = styled.div`

@import url('https://fonts.googleapis.com/css2?family=Abel&family=Cinzel&display=swap');
    background: #171717;
    font-family:  'Cinzel', serif;
    ${'' /* color: #EEEFF0; */}
    min-height: 100vh;
    color: #e0e0e0;
`
//@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
// ${'' /* from uiGradients */}
//     background: linear-gradient(to right, #1d4350, #a43931);

// const Page = styled.div`
//     width: 100%;
//     max-width: 950px;
//     margin: 0 auto;
// `
//margin: 0 auto;

// const Page = styled.div`
//     background: #171717;
//     padding: 1rem 2rem;
//     padding: 1rem 0rem;
//     color: #e0e0e0;
// `

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