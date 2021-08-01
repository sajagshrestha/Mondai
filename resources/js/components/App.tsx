import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Home from "./home/Home";
import Nav from "./nav/Nav";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import BoardList from "./list/BoardList";
import ProtectedRoute from "./common/ProtectedRoute";
import Invite from "./invite/Invite";

const AppWrapper = styled.div`
    min-height: 100vh;
    background-color: ${(props) => props.theme.primaryBackground};
    padding-bottom: 3rem;
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
                    <Route path="/login">
                        <Login />
                    </Route>
                    <ProtectedRoute path="/dashboard">
                        <Dashboard />
                    </ProtectedRoute>
                    <ProtectedRoute path="/board/list/:id">
                        <BoardList />
                    </ProtectedRoute>
                    <Route path="/invite/:boardId">
                        <Invite />
                    </Route>
                </Switch>
            </MainWrapper>
        </AppWrapper>
    );
};

export default App;
