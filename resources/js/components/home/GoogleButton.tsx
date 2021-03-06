import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import googleIconPath from "../../assets/google.svg";

const GoogleButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.2rem;
    background-color: ${(props) => props.theme.colorOrange};
    padding: 1.5em 2em;
    cursor: pointer;
    box-shadow: 4px 10px 20px rgba(0, 0, 0, 0.3);
`;

const GoogleIcon = styled.img``;

const ButtonLabel = styled.p`
    font-size: 1.6rem;
    font-family: ${(props) => props.theme.primaryFont};
    color: ${(props) => props.theme.primaryText};
    font-weight: bold;
`;

const GoogleButton: React.FC = () => {
    const history = useHistory();

    const googleLogin = () => {
        history.push("/login");
    };

    return (
        <GoogleButtonWrapper onClick={googleLogin}>
            <GoogleIcon src={googleIconPath} alt="google icon" />
            <ButtonLabel>Continue With Google</ButtonLabel>
        </GoogleButtonWrapper>
    );
};

export default GoogleButton;
