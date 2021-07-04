import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchAllBoards } from "../../services/BoardService";

const DashboardWrapper = styled.div``;

const CreateProjectSection = styled.div``;

const ProjectsSection = styled.div``;

const Dashboard = () => {
    const { isLoading, data } = useQuery("boards", fetchAllBoards);

    if (isLoading) return <h1>Loading</h1>;

    return (
        <DashboardWrapper>
            <CreateProjectSection></CreateProjectSection>
            <ProjectsSection>
                {data?.map((board: any) => board.name)}
            </ProjectsSection>
        </DashboardWrapper>
    );
};
export default Dashboard;
