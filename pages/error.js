
import { useEffect } from 'react'
import styled from "styled-components";
//import Page from '../components/styled/Page'
import useCart from '../hooks/useCart'

const Page = styled.div`
    background: #171717;
    padding: 1rem 2rem;
    padding: 1rem 0rem;
    color: #e0e0e0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Error = () => {
    const { emptyCart } = useCart()

    useEffect(() => {
        //emptyCart()
    }, [])

    return (
        <Page>
            <h2>There was an error with your payment. :(</h2>
            <p>If this continues, please contact us.</p>
        </Page>
    )
}

export default Error;