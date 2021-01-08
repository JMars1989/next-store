
import { useEffect } from 'react'
import Page from '../components/styled/Page'
import useCart from '../hooks/useCart'

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