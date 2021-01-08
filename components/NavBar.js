import Link from "next/link";
import styled from 'styled-components';
import UnstyledLink from "./styled/UnstyledLink";
import { FiShoppingCart } from "react-icons/fi"
import useCart from "../hooks/useCart";

const Nav = styled.nav`
    background: white;
`
const NavContainer = styled.div`
    background: white;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
`
const ShoppingCart = styled(FiShoppingCart)`
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const NavBar = () => {
   // const { openCart } = useCart();

    const handleClick = () => {
        //openCart();
        console.log("ASDF")
    };

    return (
        <Nav>
            <NavContainer>
                <Link href="/">
                    <UnstyledLink>Home</UnstyledLink>
                </Link>
                <ShoppingCart onClick={handleClick} />
            </NavContainer>
        </Nav>
    )
}

export default NavBar;
