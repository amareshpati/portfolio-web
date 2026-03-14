import React from "react";
import styled from "styled-components";
import { 
  MergeType, 
  GitHub, 
  Launch, 
  Apple,
  ArrowForwardIos
} from "@mui/icons-material";

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: ${({ theme }) => theme.card + "60"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 15};
  border-radius: 12px;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.card};
    border-color: ${({ theme }) => theme.primary + 50};
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6e40c9;
  background: #6e40c915;
  padding: 8px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 200px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const Title = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ID = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 400;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + 25};
  font-weight: 500;
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.text_secondary + 15};
  }
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.2);
  }
`;

const MoreArrow = styled.div`
  color: ${({ theme }) => theme.text_secondary + 50};
  margin-left: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const GooglePlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 01-.67-1.5V1.74c0-.6.24-1.13.67-1.5l.08-.07 12.37 12.37v.29L3.26 23.83l-.08-.07zM16.54 15.9l-3.13-3.13 3.13-3.13 3.53 2.01c1.01.57 1.01 1.51 0 2.08l-3.53 2.17zm-13.36 7.23l-.13.11L16.18 16.9l-3.13-3.13L3.18 23.13zm0-22.26L13.05 10.23l-3.13-3.13L3.05 1.01l-.13.11L3.18.87z" />
  </svg>
);

const ProjectItem = ({ project, onClick }) => {
  return (
    <Row onClick={() => onClick(project)}>
      <StatusIcon title="Merged">
        <MergeType />
      </StatusIcon>
      
      <Content>
        <TitleRow>
          <Title>{project.title}</Title>
          <ID>#{project.id}</ID>
        </TitleRow>
        <TagsRow>
          <Tag style={{ background: '#f0f0f0', color: '#555', borderColor: '#ccc' }}>
            {Array.isArray(project.category) ? project.category[0] : project.category}
          </Tag>
          {project.tags.slice(0, 3).map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
          {project.tags.length > 3 && <Tag>+{project.tags.length - 3}</Tag>}
        </TagsRow>
      </Content>

      <ActionIcons onClick={(e) => e.stopPropagation()}>
        {project.github && (
          <IconLink href={project.github} target="_blank" title="GitHub">
            <GitHub fontSize="small" />
          </IconLink>
        )}
        {project.webapp && (
          <IconLink href={project.webapp} target="_blank" title="Web App">
            <Launch fontSize="small" />
          </IconLink>
        )}
        {project.playStore && (
          <IconLink href={project.playStore} target="_blank" title="Play Store">
            <GooglePlayIcon />
          </IconLink>
        )}
        {project.appStore && (
          <IconLink href={project.appStore} target="_blank" title="App Store">
            <Apple fontSize="small" />
          </IconLink>
        )}
        <MoreArrow>
          <ArrowForwardIos style={{ fontSize: 16 }} />
        </MoreArrow>
      </ActionIcons>
    </Row>
  );
};

export default ProjectItem;
