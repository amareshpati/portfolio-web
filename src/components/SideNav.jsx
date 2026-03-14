import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useThemeToggle } from "../utils/ThemeContext";
import {
  LightModeRounded,
  DarkModeRounded,
  GitHub,
  DashboardRounded,
  KeyboardArrowDownRounded,
  FolderOpenRounded,
  TerminalRounded,
  SettingsRounded
} from "@mui/icons-material";
import { useNavContext } from "../utils/NavContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { NAV_LINKS } from "./Navbar";
import { Bio } from "../data/constants";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const SideNavContainer = styled.aside`
  position: fixed;
  ${({ $navPosition }) => ($navPosition === "right" ? "right: 0;" : "left: 0;")}
  top: 60px; /* Below Navbar */
  bottom: 0;
  width: 260px;
  background: ${({ theme }) => theme.card + "f2"};
  backdrop-filter: blur(12px);
  border-right: 1px solid ${({ theme }) => theme.text_secondary + "15"};
  border-left: ${({ $navPosition, theme }) => $navPosition === "right" ? `1px solid ${theme.text_secondary + "15"}` : "none"};
  display: ${({ $navPosition }) => ($navPosition === "top" ? "none" : "flex")};
  flex-direction: column;
  z-index: 999;
  animation: ${fadeIn} 0.5s ease-out;

  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

const ExplorerHeader = styled.div`
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectFolder = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: ${({ theme }) => theme.text_secondary + "05"};
  
  svg { font-size: 16px; color: ${({ theme }) => theme.primary}; }
`;

const NavList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px 6px 32px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.text_secondary};
  background: ${({ $isActive, theme }) => $isActive ? theme.primary + "10" : "transparent"};
  font-size: 13px;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 2px solid ${({ $isActive, theme }) => $isActive ? theme.primary : "transparent"};

  svg { 
    font-size: 18px; 
    color: ${({ theme, $isActive }) => $isActive ? theme.primary : theme.text_secondary};
    opacity: 0.7;
  }

  .ext {
    opacity: 0.4;
    font-size: 11px;
    margin-left: auto;
  }

  &:hover {
    background: ${({ theme }) => theme.text_secondary + "10"};
    color: ${({ theme }) => theme.text_primary};
    svg { opacity: 1; }
  }
`;

const ExplorerFooter = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.bgLight + "80"};
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "15"};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionIcon = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.text_secondary + "15"};
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary + "30"};
  }
  
  svg { font-size: 18px; }
`;

const GitStatus = styled.a`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const SideNav = () => {
  const sectionIds = NAV_LINKS.filter(link => !link.external && link.href.startsWith("#")).map(link => link.href);
  const activeSection = useScrollSpy(sectionIds, 200);
  const { isDark, toggleTheme } = useThemeToggle();
  const { navPosition, setNavPosition } = useNavContext();
  const [spinning, setSpinning] = useState(false);

  const handleNavToggle = () => {
    if (navPosition === 'top') setNavPosition('left');
    else if (navPosition === 'left') setNavPosition('right');
    else setNavPosition('top');
  };

  const handleThemeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height / 2)
    );
    setSpinning(true);
  };

  const themeIcon = isDark ? <LightModeRounded /> : <DarkModeRounded />;

  return (
    <SideNavContainer $navPosition={navPosition}>
      <ExplorerHeader>
        EXPLORER
        <SettingsRounded sx={{ fontSize: 14 }} />
      </ExplorerHeader>

      <ProjectFolder>
        <KeyboardArrowDownRounded />
        <FolderOpenRounded />
        PORTFOLIO-APP
      </ProjectFolder>

      <NavList>
        <div style={{ padding: '4px 16px 4px 24px', fontSize: '11px', color: '#8b949e', fontWeight: 600 }}>
          <KeyboardArrowDownRounded sx={{ fontSize: 14, verticalAlign: 'middle' }} /> src
        </div>

        {NAV_LINKS.map(({ label, href, Icon, ext, external }) => {
          const isActive = activeSection === href || (activeSection === "" && href === "#About");

          return (
            <NavItem
              key={label}
              href={external ? Bio.blogs : href}
              $isActive={isActive}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon />
              {label}
              <span className="ext">{ext}</span>
            </NavItem>
          );
        })}
      </NavList>

      <ExplorerFooter>
        <ActionIcon onClick={handleNavToggle} title="Switch Layout">
          <DashboardRounded />
        </ActionIcon>
        <ActionIcon onClick={handleThemeToggle} title="Toggle Theme">
          {themeIcon}
        </ActionIcon>
        <ActionIcon as="a" href={Bio.github} target="_blank" title="Terminal">
          <TerminalRounded />
        </ActionIcon>

        <GitStatus href={Bio.github} target="_blank">
          <GitHub sx={{ fontSize: 14 }} />
          SYNC
        </GitStatus>
      </ExplorerFooter>
    </SideNavContainer>
  );
};

export default SideNav;
