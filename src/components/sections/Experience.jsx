import React from "react";
import styled from "styled-components";
import { experiences } from "../../data/constants";
import ExperienceLog from "../cards/ExperienceLog";
import { 
  Terminal, 
  TerminalOutlined,
  Dns 
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 60px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const LogStream = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const TerminalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding: 12px 20px;
  background: ${({ theme }) => theme.card + "80"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Experience = () => {
  return (
    <Container id="Experience">
      <Wrapper>
        <Title>Deployment History</Title>
        <Desc>
          A chronological stream of system deployments and role transitions 
          across my professional career pipeline.
        </Desc>

        <TerminalHeader>
          <Dns style={{ fontSize: 18 }} />
          <span>system_admin@portfolio: ~ /career_logs --list-all</span>
        </TerminalHeader>

        <LogStream>
          {experiences.map((experience, index) => (
            <ExperienceLog
              key={`experience-${index}`}
              experience={experience}
              index={index}
              total={experiences.length}
            />
          ))}
        </LogStream>
      </Wrapper>
    </Container>
  );
};

export default Experience;
