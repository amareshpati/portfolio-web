import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { 
  Verified, 
  MenuBook, 
  CalendarToday, 
  Star,
  Settings
} from "@mui/icons-material";

const ManifestCard = styled(motion.div)`
  width: 100%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 80px;
  background: ${({ theme }) => theme.primary + 10};
  border-right: 1px solid ${({ theme }) => theme.text_secondary + 15};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  gap: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    padding: 0 24px;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
    justify-content: space-between;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SchoolTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const DegreeTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #27c93f20;
  color: #27c93f;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid #27c93f40;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  
  svg {
    color: ${({ theme }) => theme.primary};
  }
`;

const Description = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.bgLight + "80"};
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.primary};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.card};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  padding: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SpecsLabel = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  writing-mode: vertical-rl;
  rotate: 180deg;
  opacity: 0.5;
  
  @media (max-width: 768px) {
    writing-mode: horizontal-tb;
    rotate: 0deg;
  }
`;

const EducationManifest = ({ education, index }) => {
  return (
    <ManifestCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Sidebar>
        <IconWrapper>
          <img src={education.img} alt={education.school} />
        </IconWrapper>
        <SpecsLabel>BOOT_SEQUENCE_CORE</SpecsLabel>
        <Settings style={{ fontSize: 20, opacity: 0.3 }} />
      </Sidebar>

      <MainContent>
        <Header>
          <TitleSection>
            <SchoolTitle>{education.school}</SchoolTitle>
            <DegreeTitle>{education.degree}</DegreeTitle>
          </TitleSection>
          <Badge>
            <Verified style={{ fontSize: 16 }} /> VERIFIED_CREDENTIAL
          </Badge>
        </Header>

        <DetailGrid>
          <DetailItem>
            <CalendarToday style={{ fontSize: 18 }} />
            {education.date}
          </DetailItem>
          {education.grade && education.grade !== "N/A" && (
            <DetailItem>
              <Star style={{ fontSize: 18 }} />
              GPA/Grade: {education.grade}
            </DetailItem>
          )}
          <DetailItem>
            <MenuBook style={{ fontSize: 18 }} />
            Core Module Initialization
          </DetailItem>
        </DetailGrid>

        <Description>
          {education.desc}
        </Description>
      </MainContent>
    </ManifestCard>
  );
};

export default EducationManifest;
