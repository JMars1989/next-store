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
`;

const Ul = styled.ul`
  padding: 0;
`;

const Text = styled.span``;

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
  margin: 0 2rem;
  flex-direction: column;
  display: flex;

  align-items: center;

  //flex-direction: row;
`;
// display: block;
//   align-items: flex-end;
// flex-wrap: wrap;
// flex-direction: row;
//display: flex;

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
    //const { data } = await axios.post(url, { cart: newCart });
    //console.log(data)
    router.push("/success");
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
                      {item.qty}x {item.name} - {item.size} ${item.price / 100}
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
