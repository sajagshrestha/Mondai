import React, { useEffect } from "react";
import styled from "styled-components";
import { getAuthToken } from "../../services";

const DashboardWrapper = styled.div``;

const CreateProjectSection = styled.div``;

const ProjectsSection = styled.div``;

const Dashboard = () => {
    useEffect(() => console.log(getAuthToken()), []);
    return (
        <DashboardWrapper>
            <CreateProjectSection></CreateProjectSection>
            <ProjectsSection>{getAuthToken()}</ProjectsSection>
        </DashboardWrapper>
    );
};
export default Dashboard;
