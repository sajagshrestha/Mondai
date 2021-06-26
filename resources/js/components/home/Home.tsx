import React from "react";
import styled from "styled-components";
import heroSVGPath from "../../assets/hero.svg";
import GoogleButton from "./GoogleButton";
import Button from "../common/Button";
import { useReduxSelector } from "../../reducers";
import { useHistory } from "react-router-dom";

const HomeWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const HeroTitleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
    justify-content: center;
`;

const Title = styled.h1`
    font-family: ${(props) => props.theme.primaryFont};
    color: ${(props) => props.theme.primaryText};
    font-size: 4rem;
    span {
        color: ${(props) => props.theme.highlightedText};
    }
    line-height: 5rem;
`;

const SecondaryTitle = styled.div`
    color: ${(props) => props.theme.secondaryText};
    font-size: 1.3rem;
    margin-bottom: 1rem;
`;

const HeroImgSection = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const HeroImg = styled.img`
    width: 35rem;
`;

const Home: React.FC = () => {
    const { isLoggedIn } = useReduxSelector((state) => state.user);
    const history = useHistory();

    const onGoToDashboard = () => {
        history.push("/dashboard");
    };

    return (
        <HomeWrapper>
            <HeroTitleSection>
                <Title>
                    Issue tracking done right with <span>Mondai</span>
                </Title>
                <SecondaryTitle>
                    Capture, track, resolve and report on bugs and issues
                    throughout your entire development process.
                </SecondaryTitle>
                {isLoggedIn ? (
                    <Button onClick={onGoToDashboard}>Go to Dashboard</Button>
                ) : (
                    <GoogleButton />
                )}
            </HeroTitleSection>
            <HeroImgSection>
                <HeroImg src={heroSVGPath} alt="hero" />
            </HeroImgSection>
        </HomeWrapper>
    );
};

export default Home;
