import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import { useRouter } from "next/router";
import axios from "axios";
import Product from "./products/[product]";

const Item = styled.li`
  list-style: none;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const Ul = styled.ul`
  flex-direction: column;
  display: flex;
`;

const Text = styled.span`
  justify-content: space-around;
  align-items: flex-start;
  padding: 0.4rem;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.5rem;
`;

const Button = styled.button`
  font-size: 1.6rem;
  outline: none;
  border: none;
  width: 50%;
  padding: 1rem;

  &:hover,
  &:active {
    background-color: #c2c2c2;
    cursor: pointer;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  margin: 2rem 0 0.6rem 0;
  padding: 0.25rem 0 0 0;
`;

const Checkout = () => {
  const { cart, total } = useCart();
  const router = useRouter();

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map((id, qty) => ({
      id,
      qty,
    }));
    const { data } = await axios.post(url, { cart: newCart });
    console.log(data)
    //if success
    router.push("/success");
    //else if error >
    //router.push("/error");
  };

  return (
    <Page>
      <Block>
        <Title>Check Out</Title>
        {cart.length > 0 ? (
          <>
            <Ul>
              {cart.map((item) => {
                return (
                  <Item>
                    <Text>
                      {item.qty}x {item.name}
                    </Text>
                    <Text>{item.size}</Text>
                    <Text>
                      ${item.price / 100}
                      .00
                    </Text>
                  </Item>
                );
              })}
            </Ul>
            <Total>
              <Text>Total ${total / 100}.00</Text>
            </Total>
            <Button onClick={processPayment}>Process Payment</Button>
          </>
        ) : (
          <p>You don't appear to have anything in your cart!</p>
        )}
      </Block>
    </Page>
  );
};

export default Checkout;
