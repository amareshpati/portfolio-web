import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
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
  @media (max-width: 960px) {
    flex-direction: column;
  }
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
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 0;
  overflow: hidden; /* Clips the child buttons to perfectly match the rounded corners */
  @media (max-width: 768px) {
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    overflow-x: auto;
    /* Hide scrollbar for a clean UI on mobile */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 18px;
  padding: 0 5px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  background: ${({ theme }) => theme.primary + 25};
  color: ${({ theme }) => theme.primary};
  line-height: 1;
  transition: all 0.3s ease;
`;

const ToggleButton = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 80px;
  justify-content: center;
  white-space: nowrap;
  transition: background 0.25s ease, color 0.25s ease;
  
  /* Separator: use left border on all but the first child
     to avoid any border on the very last element edge */
  &:not(:first-child) {
    border-left: 1.5px solid ${({ theme }) => theme.primary};
  }

  /* Hover: only on real pointer devices (never sticks on touch) */
  @media (hover: hover) and (pointer: fine) {
    &:hover:not([data-active="true"]) {
      background: ${({ theme }) => theme.primary + 20};
    }
  }

  /* Active press feedback for touch devices */
  &:active {
    background: ${({ theme }) => theme.primary + 30};
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    min-width: 62px;
    font-size: 13px;
  }
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary};
    color: ${theme.white};
    
    ${CountBadge} {
      background: ${theme.white};
      color: ${theme.primary};
    }
  `}
`;

const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  margin: 22px 0 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin: 16px 0 24px;
  }
`;

const ToggleSwitchLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-left: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ToggleSwitch = styled.input`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background: ${({ theme }) => theme.primary + 20};
  outline: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background: ${({ theme }) => theme.primary};
  }

  &::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 2px;
    left: 2px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.3s;
    transform: ${({ checked }) => (checked ? "translateX(20px)" : "translateX(0)")};
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 28px;
  width: 100%;
  align-items: start;
`;

const SectionLabel = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 8px;
`;

const SectionTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
`;

const SectionLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.text_secondary + 40};
`;

const PinIcon = styled.span`
  font-size: 14px;
  opacity: 0.6;
`;

const ShowMoreBtn = styled.button`
  margin-top: 36px;
  padding: 12px 40px;
  background: none;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [sourceFilter, setSourceFilter] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const applyFilters = (list) => {
    return list.filter((project) => {
      if (toggle !== "all" && !project.category.includes(toggle)) return false;
      if (sourceFilter && !project.github) return false;
      return true;
    });
  };

  const pinnedProjects = applyFilters(projects.filter((p) => p.pinned));
  const recentProjects = applyFilters(projects.filter((p) => !p.pinned));

  // Default view: up to 3 pinned + up to 3 recent; Show All: everything
  const visiblePinned = showAll ? pinnedProjects : pinnedProjects.slice(0, 3);
  const visibleRecent = showAll ? recentProjects : recentProjects.slice(0, Math.max(0, 6 - visiblePinned.length));

  const totalFiltered = pinnedProjects.length + recentProjects.length;

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "40px" }}>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        <FiltersRow>
          <ToggleButtonGroup>
            <ToggleButton active={toggle === "all"} onClick={() => setToggle("all")}>
              ALL <CountBadge>{(sourceFilter ? projects.filter(p => p.github) : projects).length}</CountBadge>
            </ToggleButton>
            <ToggleButton active={toggle === "Mobile app"} onClick={() => setToggle("Mobile app")}>
              Mobile <CountBadge>{projects.filter(p => sourceFilter ? (p.github && p.category.includes("Mobile app")) : p.category.includes("Mobile app")).length}</CountBadge>
            </ToggleButton>
            <ToggleButton active={toggle === "web app"} onClick={() => setToggle("web app")}>
              Web <CountBadge>{projects.filter(p => sourceFilter ? (p.github && p.category.includes("web app")) : p.category.includes("web app")).length}</CountBadge>
            </ToggleButton>
            <ToggleButton active={toggle === "backend"} onClick={() => setToggle("backend")}>
              Backend <CountBadge>{projects.filter(p => sourceFilter ? (p.github && p.category.includes("backend")) : p.category.includes("backend")).length}</CountBadge>
            </ToggleButton>
          </ToggleButtonGroup>

          <ToggleSwitchContainer>
            <ToggleSwitch
              type="checkbox"
              checked={sourceFilter}
              onChange={() => setSourceFilter(!sourceFilter)}
            />
            <ToggleSwitchLabel>Source Code Only</ToggleSwitchLabel>
          </ToggleSwitchContainer>
        </FiltersRow>

        {/* Pinned Projects */}
        {visiblePinned.length > 0 && (
          <>
            <SectionLabel>
              <PinIcon>📌</PinIcon>
              <SectionTitle>Pinned Projects</SectionTitle>
              <SectionLine />
            </SectionLabel>
            <CardContainer>
              {visiblePinned.map((project) => (
                <ProjectCard key={`pinned-${project.id}`} project={project} pinned />
              ))}
            </CardContainer>
          </>
        )}

        {/* Recent Projects */}
        {visibleRecent.length > 0 && (
          <>
            <SectionLabel>
              <SectionTitle>Recent Projects</SectionTitle>
              <SectionLine />
            </SectionLabel>
            <CardContainer>
              {visibleRecent.map((project) => (
                <ProjectCard key={`recent-${project.id}`} project={project} />
              ))}
            </CardContainer>
          </>
        )}

        {/* Show More / Show Less */}
        {totalFiltered > 6 && (
          <ShowMoreBtn onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "Show Less ↑" : `Show More (${totalFiltered - 6} more) ↓`}
          </ShowMoreBtn>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;