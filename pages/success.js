
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

const Success = () => {
    const { emptyCart } = useCart()

    useEffect(() => {
        emptyCart()
    }, [])

    return (
        <Page>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase!</p>
        </Page>
    )
}

export default Success;