import Link from "next/link";
import styled from "styled-components";
import { Normalize } from "styled-normalize";

const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

    ${'' /* from uiGradients */}
    background: linear-gradient(to right, #1d4350, #a43931);
    font-family: 'Lato', sans-serif;
`

const MyApp = ({ Component, pageProps }) => {
    return (
        <Container>
            <Normalize />
            <Link href="/">
                <a> Home</a>
            </Link>
            <Component {...pageProps} />
        </Container>
    )
}

export default MyApp;