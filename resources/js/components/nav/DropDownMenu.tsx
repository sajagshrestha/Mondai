import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useReduxDispatch } from "../../reducers";
import { removeFromStorage } from "../../utils/localStorage";

const DropDownMenuWrapper = styled.div`
    position: absolute;
    bottom: -2.5rem;
    right: 0;
    cursor: pointer;
`;
const DropDownItem = styled.div`
    background-color: ${(props) => props.theme.colorOrange};
    padding: 1rem;
    width: 7.5rem;
    text-align: center;
    font-size: 1.1rem;
    color: ${(props) => props.theme.primaryText};
    font-weight: 700;
    z-index: 2;
`;
const DropdownMenu: React.FC<{ handleClose: () => void }> = ({
    handleClose,
}) => {
    const dispatch = useReduxDispatch();

    const dropDownRef = useRef(null);

    useEffect(() => {
        const clickOutsideListener = (e: MouseEvent) => {
            if (e.target !== dropDownRef.current) {
                handleClose();
            }
        };
        document.addEventListener("click", clickOutsideListener);
        return () => {
            document.removeEventListener("click", clickOutsideListener);
        };
    }, [handleClose]);

    const logout = () => {
        removeFromStorage("user");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <DropDownMenuWrapper ref={dropDownRef}>
            <DropDownItem onClick={logout}>Log Out</DropDownItem>
        </DropDownMenuWrapper>
    );
};

export default DropdownMenu;
