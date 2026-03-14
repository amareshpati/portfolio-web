import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useThemeToggle } from "../utils/ThemeContext";
import { LightModeRounded, DarkModeRounded, GitHub, DashboardRounded } from "@mui/icons-material";
import { useNavContext } from "../utils/NavContext";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { NAV_LINKS } from "./Navbar";
import { Bio } from "../data/constants";

const spinOnce = keyframes`
  from { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.2); }
  to   { transform: rotate(360deg) scale(1); }
`;

const SideNavContainer = styled.nav`
  position: fixed;
  ${({ $navPosition }) => ($navPosition === "right" ? "right: 30px;" : "left: 30px;")}
  top: 50%;
  transform: translateY(-50%);
  display: ${({ $navPosition }) => ($navPosition === "top" ? "none" : "flex")};
  flex-direction: column;
  gap: 20px;
  z-index: 1000;

  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.text_primary + "99"};
  font-size: ${({ $isActive }) => ($isActive ? "28px" : "24px")};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  text-decoration: none;
  transition: all 0.3s ease-out;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
  }

`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.primary + "33"};
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.08);
  }
  &:active {
    transform: scale(0.93);
  }
`;

const GithubButton = styled.a`
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 7px;
  border-radius: 20px;
  cursor: pointer;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const IconSpan = styled.span`
  display: inline-flex;
  ${({ $spinning }) =>
    $spinning &&
    css`animation: ${spinOnce} 0.45s ease forwards;`}
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

  const themeIcon = isDark ? (
    <LightModeRounded sx={{ fontSize: "22px" }} />
  ) : (
    <DarkModeRounded sx={{ fontSize: "22px" }} />
  );

  return (
    <SideNavContainer $navPosition={navPosition}>
      {NAV_LINKS.map(({ label, href, external }) => {
        // Evaluate if link is currently active
        const isActive = activeSection === href;

        return (
          <NavItem
            key={label}
            href={external ? Bio.blogs : href}
            $isActive={isActive}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </NavItem>
        );
      })}

      <ActionsContainer>
        <ActionButton as="button" onClick={handleNavToggle} title={`Current Layout: ${navPosition}`}>
          <DashboardRounded sx={{ fontSize: "22px" }} />
        </ActionButton>
        <ActionButton as="button" onClick={handleThemeToggle} title="Toggle theme">
          <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
            {themeIcon}
          </IconSpan>
        </ActionButton>
        <GithubButton href={Bio.github} target="_blank" rel="noopener noreferrer" title="GitHub">
          <GitHub sx={{ fontSize: "17px" }} />
          Github
        </GithubButton>
      </ActionsContainer>
    </SideNavContainer>
  );
};

export default SideNav;
