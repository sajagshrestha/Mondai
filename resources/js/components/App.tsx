import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import List from "./list/List";
import ProtectedRoute from "./common/ProtectedRoute";

const AppWrapper = styled.div`
    min-height: 100vh;
    background-color: ${(props) => props.theme.primaryBackground};
`;

const MainWrapper = styled.div`
    width: min(80%, 1250px);
    margin: 0 auto;
`;

const App: React.FC = () => {
    return (
        <AppWrapper>
            <MainWrapper>
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoute exact path="/dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/board/list">
                        <List />
                    </ProtectedRoute>
                </Switch>
            </MainWrapper>
        </AppWrapper>
    );
};

export default App;
