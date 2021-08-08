import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logoPath from "../../assets/logo.svg";
import { useReduxSelector } from "../../reducers";
import { UserMenuButton } from "../common/userMenuButton";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import DropdownMenu from "./DropDownMenu";
import MuiMenu from "@material-ui/core/Menu";
import MuiMenuItem from "@material-ui/core/MenuItem";
import { useReduxDispatch } from "../../reducers";
import { removeFromStorage } from "../../utils/localStorage";

const NavWrapper = styled.div`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;
`;

const Menu = styled(MuiMenu)`
    &&.MuiPaper-root {
        background-color: red;
    }
`;

const MenuItem = styled(MuiMenuItem)``;

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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useReduxDispatch();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        removeFromStorage("user");
        dispatch({ type: "LOGOUT" });
        handleClose();
    };

    const history = useHistory();

    return (
        <NavWrapper>
            <Logo src={logoPath} alt="logo" onClick={() => history.push("/")} />
            <NavLinksSection>
                {isLoggedIn && (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>

                        <UserMenuButton
                            onClick={handleClick}
                            variant="outlined"
                            endIcon={<ExpandMoreOutlinedIcon />}
                        >
                            {userName}
                        </UserMenuButton>
                    </>
                )}
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    getContentAnchorEl={null}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </NavLinksSection>
        </NavWrapper>
    );
};

export default Nav;
