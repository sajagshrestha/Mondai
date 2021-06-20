import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logoPath from "../../assets/logo.svg";

const NavWrapper = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.img`
    height: 3rem;
    width: 10.5rem;
    cursor: pointer;
`;

const NavLinksSection = styled.div``;

const Nav: React.FC = () => {
    const history = useHistory();

    return (
        <NavWrapper>
            <Logo src={logoPath} alt="logo" onClick={() => history.push("/")} />
            <NavLinksSection>link</NavLinksSection>
        </NavWrapper>
    );
};

export default Nav;
