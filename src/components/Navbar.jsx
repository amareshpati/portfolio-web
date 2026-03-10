import React, { useState, useEffect } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme, keyframes, css } from "styled-components";
import { Bio } from "../data/constants";
import {
  MenuRounded,
  CloseRounded,
  LightModeRounded,
  DarkModeRounded,
  HomeRounded,
  BuildRounded,
  WorkRounded,
  FolderRounded,
  SchoolRounded,
  ArticleRounded,
  GitHub,
} from "@mui/icons-material";
import { useThemeToggle } from "../utils/ThemeContext";

/* ─── Animations ──────────────────────────────────────────────── */
const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spinOnce = keyframes`
  from { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.2); }
  to   { transform: rotate(360deg) scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* ─── Nav Shell ───────────────────────────────────────────────── */
const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg + "ee"};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.primary + "22"};
  color: ${({ theme }) => theme.text_primary};
  transition: background 0.3s ease;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* ─── Logo ────────────────────────────────────────────────────── */
const NavLogo = styled(LinkR)`
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: 0.3px;
  flex-shrink: 0;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

/* ─── Desktop Nav Items ───────────────────────────────────────── */
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
    transition: width 0.25s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
    &::after { width: 100%; }
  }
`;

/* ─── Desktop Right ───────────────────────────────────────────── */
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media screen and (max-width: 768px) {
    display: none;
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

/* ─── Theme Toggle ────────────────────────────────────────────── */
const ThemeToggleBtn = styled.button`
  background: ${({ theme }) => theme.card_light};
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.primary + "20"};
    border-color: ${({ theme }) => theme.primary};
    transform: scale(1.08);
  }
  &:active { transform: scale(0.93); }
`;

const IconSpan = styled.span`
  display: inline-flex;
  ${({ $spinning }) =>
    $spinning &&
    css`animation: ${spinOnce} 0.45s ease forwards;`}
`;

/* ─── Mobile Top-Right icons ──────────────────────────────────── */
const MobileActions = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  transition: color 0.2s ease;

  &:hover { color: ${({ theme }) => theme.primary}; }
`;

/* ─── Backdrop ────────────────────────────────────────────────── */
const Backdrop = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 98;
    animation: ${fadeIn} 0.25s ease;
  }
`;

/* ─── Mobile Drawer ───────────────────────────────────────────── */
const MobileDrawer = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    z-index: 99;
    background: ${({ theme }) => theme.card_light};
    border-bottom: 1px solid ${({ theme }) => theme.primary + "30"};
    border-radius: 0 0 24px 24px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.28);
    padding: 8px 0 20px;
    animation: ${slideDown} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

const DrawerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.18s ease, color 0.18s ease;
  border-left: 3px solid transparent;

  svg { font-size: 20px; color: ${({ theme }) => theme.primary}; opacity: 0.8; }

  &:hover,
  &:active {
    background: ${({ theme }) => theme.primary + "14"};
    color: ${({ theme }) => theme.primary};
    border-left-color: ${({ theme }) => theme.primary};
    svg { opacity: 1; }
  }
`;

const DrawerDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.primary + "18"};
  margin: 8px 24px;
`;

const DrawerFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px 0;
`;

const DrawerGithubBtn = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 12px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: filter 0.2s ease, transform 0.2s ease;

  &:hover { filter: brightness(1.12); transform: scale(1.02); }
  &:active { transform: scale(0.97); }
`;

/* ─── Nav links config ────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "About", href: "#About", Icon: HomeRounded },
  { label: "Skills", href: "#Skills", Icon: BuildRounded },
  { label: "Experience", href: "#Experience", Icon: WorkRounded },
  { label: "Projects", href: "#Projects", Icon: FolderRounded },
  { label: "Education", href: "#Education", Icon: SchoolRounded },
  { label: "Blogs", href: null, Icon: ArticleRounded, external: true },
];

/* ─── Component ───────────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeToggle();

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleThemeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height / 2)
    );
    setSpinning(true);
  };

  const themeIcon = isDark
    ? <LightModeRounded sx={{ fontSize: "20px" }} />
    : <DarkModeRounded sx={{ fontSize: "20px" }} />;

  const close = () => setIsOpen(false);

  return (
    <>
      <Nav>
        <NavbarContainer>
          {/* Logo */}
          <NavLogo to="/">
            {Bio.name.split(" ")[0]}
            <span>.{Bio.name.split(" ")[1]?.[0]}</span>
          </NavLogo>

          {/* Desktop links */}
          <NavItems>
            {NAV_LINKS.map(({ label, href, external }) => (
              <NavLink
                key={label}
                href={external ? Bio.blogs : href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {label}
              </NavLink>
            ))}
          </NavItems>

          {/* Desktop right buttons */}
          <ButtonContainer>
            <ThemeToggleBtn onClick={handleThemeToggle} title="Toggle theme">
              <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
                {themeIcon}
              </IconSpan>
            </ThemeToggleBtn>
            <GithubButton href={Bio.github} target="_blank" rel="noopener noreferrer">
              <GitHub sx={{ fontSize: "17px" }} />
              Github
            </GithubButton>
          </ButtonContainer>

          {/* Mobile right icons */}
          <MobileActions>
            <ThemeToggleBtn onClick={handleThemeToggle} title="Toggle theme">
              <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
                {themeIcon}
              </IconSpan>
            </ThemeToggleBtn>
            <HamburgerBtn
              onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen
                ? <CloseRounded sx={{ fontSize: "26px" }} />
                : <MenuRounded sx={{ fontSize: "26px" }} />}
            </HamburgerBtn>
          </MobileActions>
        </NavbarContainer>
      </Nav>

      {/* Mobile drawer + backdrop */}
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <MobileDrawer>
            <DrawerNav>
              {NAV_LINKS.map(({ label, href, Icon, external }) => (
                <DrawerLink
                  key={label}
                  href={external ? Bio.blogs : href}
                  onClick={close}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon />
                  {label}
                </DrawerLink>
              ))}
            </DrawerNav>

            <DrawerDivider />

            <DrawerFooter>
              <DrawerGithubBtn href={Bio.github} target="_blank" rel="noopener noreferrer" onClick={close}>
                <GitHub sx={{ fontSize: "18px" }} />
                Github Profile
              </DrawerGithubBtn>
            </DrawerFooter>
          </MobileDrawer>
        </>
      )}
    </>
  );
};

export default Navbar;
