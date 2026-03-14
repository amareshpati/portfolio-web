import React from "react";
import styled from "styled-components";
import { education } from "../../data/constants";
import EducationManifest from "../cards/EducationManifest";
import EarthCanvas from "../canvas/Earth";
import { Terminal } from "@mui/icons-material";

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
  max-width: 1100px;
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
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 60px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const ManifestList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 40px;
`;

const InitHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  opacity: 0.8;
  
  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.primary + "40"});
  }
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to left, transparent, ${({ theme }) => theme.primary + "40"});
  }
`;

const Education = () => {
  return (
    <Container id="Education">
      <Wrapper>
        <Title>Core Foundation</Title>
        <Desc>
          The architectural base layer of my technical expertise, initialized through 
          verified academic curriculum and structural building blocks.
        </Desc>

        <InitHeader>
          <Terminal style={{ fontSize: 18 }} />
          LOAD_CORE_MODULES --initial
        </InitHeader>

        <ManifestList>
          {education.map((item, index) => (
            <EducationManifest 
              key={`education-${index}`} 
              education={item} 
              index={index} 
            />
          ))}
        </ManifestList>
        
        <EarthCanvas />
      </Wrapper>
    </Container>
  );
};

export default Education;
