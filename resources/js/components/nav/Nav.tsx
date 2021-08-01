import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logoPath from "../../assets/logo.svg";
import { useReduxSelector } from "../../reducers";
import { UserMenuButton } from "../common/userMenuButton";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import DropdownMenu from "./DropDownMenu";

const NavWrapper = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;
`;

const Logo = styled.img`
    height: 3rem;
    width: 10.5rem;
    cursor: pointer;
`;

const NavLinksSection = styled.div`
    display: flex;
    align-items: center;
    gap: 4rem;
`;

const NavLink = styled(Link)`
    cursor: pointer;
    font-size: 1.2rem;
    color: ${(props) => props.theme.colorOrange};
`;

const Nav: React.FC = () => {
    const { userName, isLoggedIn } = useReduxSelector((state) => state.user);
    const [isOpen, setOpen] = useState<boolean>(false);

    const history = useHistory();

    return (
        <NavWrapper>
            <Logo src={logoPath} alt="logo" onClick={() => history.push("/")} />
            <NavLinksSection>
                {isLoggedIn && (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>

                        <UserMenuButton
                            onClick={() => {
                                console.log("open");
                                setOpen(true);
                            }}
                            variant="outlined"
                            endIcon={<ExpandMoreOutlinedIcon />}
                        >
                            {userName}
                        </UserMenuButton>
                    </>
                )}
                {isOpen ? (
                    <DropdownMenu
                        handleClose={() => {
                            setOpen(false);
                        }}
                    />
                ) : null}
            </NavLinksSection>
        </NavWrapper>
    );
};

export default Nav;
