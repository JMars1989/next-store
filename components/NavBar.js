import Link from "next/link";
import styled from 'styled-components';
import UnstyledLink from "./styled/UnstyledLink";

const Nav = styled.nav`
    background: white;
`
const NavContainer = styled.div`
    background: white;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    font-size: 2rem;
`

const NavBar = () => {
    return (
        <Nav>
            <NavContainer>
                <Link href="/">
                    <UnstyledLink> Home</UnstyledLink>
                </Link>
            </NavContainer>
        </Nav>
    )
}

export default NavBar;
