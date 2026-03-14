import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
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
  DashboardRounded,
} from "@mui/icons-material";
import { useThemeToggle } from "../utils/ThemeContext";
import { useNavContext } from "../utils/NavContext";

/* ─── Animations ──────────────────────────────────────────────── */

const spinOnce = keyframes`
  from { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.2); }
  to   { transform: rotate(360deg) scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(100%); }
  to   { opacity: 1; transform: translateY(0); }
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

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (min-width: 1600px) {
    display: ${({ $navPosition }) => ($navPosition === "top" ? "flex" : "none")};
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
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
  justify-self: end;

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

const NavToggleBtn = styled(ThemeToggleBtn)`
  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

const IconSpan = styled.span`
  display: inline-flex;
  ${({ $spinning }) =>
    $spinning &&
    css`animation: ${spinOnce} 0.45s ease forwards;`}
`;

const Spacer = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FloatingActionGroup = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "none" : "flex")};
    flex-direction: column;
    gap: 15px;
    position: fixed;
    bottom: 30px;
    right: 24px;
    z-index: 1001;
    animation: ${fadeIn} 0.3s ease;
  }
`;

const FAB = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background: ${({ theme }) => theme.card_light + "ee"};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.primary + "44"};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.primary + "15"};
    border-color: ${({ theme }) => theme.primary};
  }
  &:active { transform: scale(0.9); }
`;

/* ─── Backdrop ────────────────────────────────────────────────── */
const Backdrop = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 999;
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
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: ${({ theme }) => theme.card_light};
    border-top: 1px solid ${({ theme }) => theme.primary + "30"};
    border-radius: 30px 30px 0 0;
    box-shadow: 0 -16px 48px rgba(0, 0, 0, 0.35);
    padding: 16px 0 40px;
    animation: ${slideUp} 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px 8px;
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.primary + "15"};
  border: 1px solid ${({ theme }) => theme.primary + "33"};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  
  &:active { transform: scale(0.9); }
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
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 12px;
  margin: 0 24px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
  }
  &:active { transform: scale(0.97); }
`;

/* ─── Nav links config ────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "About", href: "#About", Icon: HomeRounded },
  { label: "Skills", href: "#Skills", Icon: BuildRounded },
  { label: "Experience", href: "#Experience", Icon: WorkRounded },
  { label: "Projects", href: "#Projects", Icon: FolderRounded },
  { label: "Blogs", href: "#Blog", Icon: ArticleRounded },
  { label: "Education", href: "#Education", Icon: SchoolRounded },
];

/* ─── Component ───────────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const { isDark, toggleTheme } = useThemeToggle();
  const { navPosition, setNavPosition } = useNavContext();

  const handleNavToggle = () => {
    if (navPosition === 'top') setNavPosition('left');
    else if (navPosition === 'left') setNavPosition('right');
    else setNavPosition('top');
  };

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
      <Nav $navPosition={navPosition}>
        <NavbarContainer>
          {/* Spacer for centering */}
          <Spacer />

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
            <NavToggleBtn onClick={handleNavToggle} title={`Current Layout: ${navPosition}`}>
              <DashboardRounded sx={{ fontSize: "20px" }} />
            </NavToggleBtn>
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
        </NavbarContainer>
      </Nav>

      {/* Floating Action Buttons for Mobile */}
      <FloatingActionGroup $isOpen={isOpen}>
        <FAB onClick={handleThemeToggle} title="Toggle Theme">
          <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
            {themeIcon}
          </IconSpan>
        </FAB>
        <FAB onClick={() => setIsOpen((p) => !p)} title="Menu">
          {isOpen ? <CloseRounded sx={{ fontSize: "28px" }} /> : <MenuRounded sx={{ fontSize: "28px" }} />}
        </FAB>
      </FloatingActionGroup>

      {/* Mobile drawer + backdrop */}
      {isOpen && (
        <>
          <Backdrop onClick={close} />
          <MobileDrawer>
            <DrawerHeader>
              <CloseButton onClick={close} aria-label="Close Menu">
                <CloseRounded sx={{ fontSize: "28px" }} />
              </CloseButton>
            </DrawerHeader>
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
