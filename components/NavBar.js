import Link from "next/link";
import styled from 'styled-components';
import UnstyledLink from "./styled/UnstyledLink";
import { FiShoppingCart } from "react-icons/fi"
import useCart from "../hooks/useCart";

const Nav = styled.nav`
    background: #3d3d3d;
    padding: 0.3rem 1rem;
`
const NavContainer = styled.div`
    background: #3d3d3d;
    color: #e0e0e0;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
`
const ShoppingCart = styled(FiShoppingCart)`
  margin: 0.2rem 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const NavBar = () => {
    const { openCart } = useCart();

    const handleClick = () => {
        openCart();
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
