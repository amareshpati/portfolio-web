import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme, keyframes } from "styled-components";
import { Bio } from "../data/constants";
import { MenuRounded, LightModeRounded, DarkModeRounded } from "@mui/icons-material";
import { useThemeToggle } from "../utils/ThemeContext";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const spinOnce = keyframes`
  from { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.2); }
  to   { transform: rotate(360deg) scale(1); }
`;

const ThemeToggleBtn = styled.button`
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.primary + 40};
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px ${({ theme }) => theme.black + 15};
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.primary + 15};
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IconSpan = styled.span`
  display: inline-flex;
  animation: ${({ $spinning }) => ($spinning ? spinOnce : "none")} 0.5s ease forwards;
  line-height: 1;
`;

const MobileIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeToggle();

  const handleToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(rect.left + rect.width / 2);
    const y = Math.round(rect.top + rect.height / 2);
    toggleTheme(x, y);
    setSpinning(true);
  };
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <div style={{ display: 'flex', alignItems: 'center', color: theme.text_primary, cursor: 'pointer' }}>
            {Bio.name}
          </div>
        </NavLogo>

        <MobileIcon>
          <ThemeToggleBtn onClick={handleToggle} title="Toggle theme">
            <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
              {isDark ? <LightModeRounded sx={{ fontSize: "22px" }} /> : <DarkModeRounded sx={{ fontSize: "22px" }} />}
            </IconSpan>
          </ThemeToggleBtn>
          <div onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded style={{ color: "inherit" }} />
          </div>
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">About</NavLink>
          <NavLink href="#Skills">Skills</NavLink>
          <NavLink href="#Experience">Experience</NavLink>
          <NavLink href="#Projects">Projects</NavLink>
          <NavLink href="#Education">Education</NavLink>
          <NavLink href={Bio.blogs} target="_blank" rel="noopener noreferrer">Blogs</NavLink>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">
              About
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">
              Skills
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">
              Experience
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">
              Projects
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">
              Education
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href={Bio.blogs} target="_blank" rel="noopener noreferrer">
              Blogs
            </NavLink>
            <GithubButton
              href={Bio.github}
              target="_Blank"
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              Github Profile
            </GithubButton>
          </MobileMenu>
        )}

        <ButtonContainer>
          <ThemeToggleBtn onClick={handleToggle} title="Toggle theme">
            <IconSpan
              $spinning={spinning}
              onAnimationEnd={() => setSpinning(false)}
            >
              {isDark ? <LightModeRounded sx={{ fontSize: "22px" }} /> : <DarkModeRounded sx={{ fontSize: "22px" }} />}
            </IconSpan>
          </ThemeToggleBtn>
          <GithubButton href={Bio.github} target="_Blank" style={{ marginLeft: "12px" }}>
            Github Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
