import React from "react";
import styled from "styled-components";
import logoPath from "../../assets/logo.svg";

const NavWrapper = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

const Logo = styled.img`
    height: 3rem;
    width: 10.5rem;
`;

const NavLinksSection = styled.div``;

const Nav: React.FC = (props) => {
    return (
        <NavWrapper>
            <Logo src={logoPath} alt="logo" />
            <NavLinksSection>link</NavLinksSection>
        </NavWrapper>
    );
};

export default Nav;
