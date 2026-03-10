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
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ active, theme }) =>
    active &&
    `
    background: ${theme.primary + 20};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
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

  const projectCount = (type = "all") => {
    if (type === "all") {
      return ` (${(sourceFilter ? projects.filter((p) => p.github) : projects).length})`;
    }
    return ` (${projects.filter((p) => {
      return sourceFilter
        ? p?.github && p.category.includes(type)
        : p.category.includes(type);
    }).length})`;
  };

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "40px" }}>
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton active={toggle === "all"} onClick={() => setToggle("all")}>
            ALL{projectCount()}
          </ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "Mobile app"} onClick={() => setToggle("Mobile app")}>
            Mobile App{projectCount("Mobile app")}
          </ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "web app"} onClick={() => setToggle("web app")}>
            Web App{projectCount("web app")}
          </ToggleButton>
          <Divider />
          <ToggleButton active={toggle === "backend"} onClick={() => setToggle("backend")}>
            Backend{projectCount("backend")}
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleSwitchContainer>
          <ToggleSwitch
            type="checkbox"
            checked={sourceFilter}
            onChange={() => setSourceFilter(!sourceFilter)}
          />
          <ToggleSwitchLabel>Source Code Available Only</ToggleSwitchLabel>
        </ToggleSwitchContainer>

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