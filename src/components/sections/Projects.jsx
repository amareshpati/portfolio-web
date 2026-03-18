import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectItem from "../cards/ProjectItem";
import ProjectModal from "./ProjectModal";
import { ListAlt, FilterList, History } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
  margin-bottom: 100px;
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
  font-weight: 500;
  max-width: 700px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const RepoHeader = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card + "40"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 12px 12px 0 0;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const RepoStats = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  
  span {
    color: ${({ theme }) => theme.text_secondary};
    font-weight: 400;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  background: ${({ theme }) => theme.card_light + "50"};
  border-radius: 8px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const ToggleButton = styled.div`
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary};
    color: #fff !important;
  `}
  
  &:hover:not([active="true"]) {
    color: ${({ theme }) => theme.text_primary};
  }
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card + "20"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 8px;
  gap: 8px;
`;

const SectionLabel = styled.div`
  padding: 16px 16px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.text_secondary + 20};
`;

const ShowMoreBtn = styled.button`
  margin-top: 32px;
  padding: 10px 24px;
  background: none;
  border: 1.5px solid ${({ theme }) => theme.text_secondary + 30};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 10};
  }
`;

const SourceFilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px;
  cursor: pointer;
  user-select: none;
`;

const SourceToggle = styled.div`
  width: 36px;
  height: 20px;
  background: ${({ active, theme }) => active ? theme.primary : theme.text_secondary + "40"};
  border-radius: 20px;
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    top: 3px;
    left: ${({ active }) => active ? "19px" : "3px"};
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

const SourceLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ active, theme }) => active ? theme.primary : theme.text_secondary};
  transition: all 0.2s;
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [sourceOnly, setSourceOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const applyFilters = (list) => {
    return list.filter((project) => {
      // Source code filter
      if (sourceOnly && !project.github) return false;

      // Category filter
      if (toggle === "all") return true;

      const projectCategories = Array.isArray(project.category)
        ? project.category
        : [project.category];

      return projectCategories.some(cat =>
        cat.toLowerCase().includes(toggle.toLowerCase())
      );
    });
  };

  const pinnedProjects = applyFilters(projects.filter((p) => p.pinned));
  const recentProjects = applyFilters(projects.filter((p) => !p.pinned));

  const visiblePinned = showAll ? pinnedProjects : pinnedProjects.slice(0, 4);
  const visibleRecent = showAll ? recentProjects : recentProjects.slice(0, Math.max(0, 8 - visiblePinned.length));

  const totalFiltered = pinnedProjects.length + recentProjects.length;

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Contribution Activity</Title>
        <Desc>
          A log of merged features and completed applications.
          Click on any entry for the full pull request details and source diffs.
        </Desc>

        <RepoHeader>
          <RepoStats>
            <Stat>
              <ListAlt fontSize="small" />
              {projects.length} <span>Total</span>
            </Stat>
            <Stat>
              <History fontSize="small" />
              {pinnedProjects.length + recentProjects.length} <span>Visible</span>
            </Stat>
          </RepoStats>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <SourceFilterContainer onClick={() => setSourceOnly(!sourceOnly)}>
              <SourceToggle active={sourceOnly} />
              <SourceLabel active={sourceOnly}>Public Source Only</SourceLabel>
            </SourceFilterContainer>

            <ToggleButtonGroup>
              <ToggleButton active={toggle === "all"} onClick={() => setToggle("all")}>
                All
              </ToggleButton>
              <ToggleButton active={toggle === "web app"} onClick={() => setToggle("web app")}>
                Web
              </ToggleButton>
              <ToggleButton active={toggle === "Mobile app"} onClick={() => setToggle("Mobile app")}>
                Mobile
              </ToggleButton>
              <ToggleButton active={toggle === "backend"} onClick={() => setToggle("backend")}>
                Backend
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </RepoHeader>

        <ListContainer>
          {visiblePinned.length > 0 && (
            <>
              <SectionLabel>
                📌 Pinned Projects <SectionLine />
              </SectionLabel>
              {visiblePinned.map((project) => (
                <ProjectItem
                  key={`pinned-${project.id}`}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </>
          )}

          {visibleRecent.length > 0 && (
            <>
              <SectionLabel>
                <FilterList fontSize="inherit" /> Recent Activity <SectionLine />
              </SectionLabel>
              {visibleRecent.map((project) => (
                <ProjectItem
                  key={`recent-${project.id}`}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </>
          )}
        </ListContainer>

        {totalFiltered > (visiblePinned.length + visibleRecent.length) && (
          <ShowMoreBtn onClick={() => setShowAll(true)}>
            View more contributions...
          </ShowMoreBtn>
        )}

        {showAll && totalFiltered > 8 && (
          <ShowMoreBtn onClick={() => setShowAll(false)}>
            Show fewer entries
          </ShowMoreBtn>
        )}
      </Wrapper>

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Container>
  );
};

export default Projects;