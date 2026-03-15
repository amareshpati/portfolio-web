import React, { useState, useEffect, useRef } from "react";
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
  StarRounded,
  AccountTreeRounded,
  TerminalRounded,
  FiberManualRecordRounded,
  MoreHorizRounded
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
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  border-bottom: 2px solid ${({ theme }) => theme.primary + "15"};
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
  max-width: 1400px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 12px;
`;

/* ─── IDE Left Side ───────────────────────────────────────────── */
const ShellPath = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  white-space: nowrap;
  flex-shrink: 0;

  @media screen and (max-width: 1100px) {
    span.user { display: none; }
  }
`;

const BranchTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.primary + "10"};
  color: ${({ theme }) => theme.primary};
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.primary + "20"};
  font-size: 12px;
`;

/* ─── IDE Tabs Layout ─────────────────────────────────────────── */
const TabBar = styled.ul`
  display: flex;
  align-items: stretch;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Tab = styled.li`
  height: 100%;
`;

const TabLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 14px;
  color: ${({ theme, active }) => active ? theme.text_primary : theme.text_secondary};
  font-size: 13px;
  font-family: 'Space Mono', monospace;
  text-decoration: none;
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.primary : "transparent"};
  background: ${({ active, theme }) => active ? theme.card_light + "40" : "transparent"};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.card_light + "60"};
    color: ${({ theme }) => theme.text_primary};
  }

  svg {
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
    opacity: 0.8;
  }
  
  .ext {
    opacity: 0.4;
    font-size: 11px;
    @media screen and (max-width: 1200px) { display: none; }
  }

  @media screen and (max-width: 1000px) {
    padding: 0 10px;
    span.label { display: none; }
  }
`;

/* ─── More Menu ──────────────────────────────────────────────── */
const MoreContainer = styled.div`
  position: relative;
  height: 100%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 4px;
  min-width: 180px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  display: ${({ show }) => (show ? "block" : "none")};
  animation: ${fadeIn} 0.1s ease;
  z-index: 10000;
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  color: #c9d1d9;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  text-decoration: none;
  border-radius: 4px;

  svg { font-size: 18px; color: ${({ theme }) => theme.primary}; opacity: 0.8; }

  &:hover {
    background: #161b22;
    color: white;
  }
`;

/* ─── IDE Right Status ────────────────────────────────────────── */
const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  flex-shrink: 0;
`;

const StatusButton = styled.button`
  background: transparent;
  border: none;
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Space Mono', monospace;
  font-size: 11px;

  &:hover {
    background: ${({ theme }) => theme.text_secondary + "15"};
    color: ${({ theme }) => theme.text_primary};
  }

  svg { font-size: 18px; }

  @media screen and (max-width: 1200px) {
    span.lncol { display: none; }
  }
`;

const LayoutToggleButton = styled(StatusButton)`
  @media screen and (max-width: 1600px) {
    display: none;
  }
`;

const GithubStatus = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 10px ${({ theme }) => theme.primary + "30"};
  margin-left: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px ${({ theme }) => theme.primary + "50"};
  }

  @media screen and (max-width: 1100px) {
    span.push { display: none; }
    padding: 6px 10px;
  }
`;

/* ─── Mobile FAB Styles ───────────────────────────────────────── */
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
  border-radius: 12px;
  background: #0d1117;
  border: 1px solid #30363d;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;

  &:active { transform: scale(0.9); }
`;

/* ─── Backdrop & Drawer ───────────────────────────────────────── */
const Backdrop = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 999;
  }
`;

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
    background: #0d1117;
    border-top: 1px solid #30363d;
    border-radius: 20px 20px 0 0;
    padding: 20px 0 40px;
    animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px 16px;
  gap: 12px;
  border-bottom: 1px solid #30363d;
  margin-bottom: 12px;
`;

const ShellUser = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: #3fb950;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DrawerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  color: #c9d1d9;
  font-family: 'Space Mono', monospace;
  font-size: 15px;
  text-decoration: none;
  
  svg { color: ${({ theme }) => theme.primary}; font-size: 20px; }
  
  &:active {
    background: #161b22;
    color: white;
  }
`;

/* ─── Git Graph Components ───────────────────────────────────── */
const GitGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 24px;
  position: relative;
  overflow-y: auto;
  max-height: 60vh;
`;

const GraphLine = styled.div`
  position: absolute;
  left: 36px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${({ theme }) => theme.primary + "30"};
  z-index: 0;
`;

const CommitItem = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 0;
  text-decoration: none;
  position: relative;
  z-index: 1;
  transition: all 0.2s;

  &:active {
    background: ${({ theme }) => theme.primary + "08"};
  }
`;

const Node = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ $active, theme }) => $active ? theme.primary : "#30363d"};
  border: 3px solid #0d1117;
  box-shadow: ${({ $active, theme }) => $active ? `0 0 15px ${theme.primary}80` : "none"};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  flex-shrink: 0;
  margin-left: 2px;
  transform: ${({ $active }) => $active ? "scale(1.2)" : "scale(1)"};
`;

const CommitMeta = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Space Mono', monospace;
  flex: 1;
`;

const CommitHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ $active, theme }) => $active ? "#3fb950" : "#c9d1d9"};
  font-weight: ${({ $active }) => $active ? "700" : "400"};
`;

const Hash = styled.span`
  color: #3fb950;
  opacity: 0.7;
  font-size: 10px;
  background: #3fb95015;
  padding: 1px 4px;
  border-radius: 3px;
`;

const CommitMessage = styled.div`
  font-size: 11px;
  color: #8b949e;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RepoPath = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: 'Space Mono', monospace;
`;

const RepoName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const BranchInfo = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const IconSpan = styled.span`
  display: inline-flex;
  ${({ $spinning }) =>
    $spinning &&
    css`animation: ${spinOnce} 0.45s ease forwards;`}
`;

/* ─── Nav links config ────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "About", href: "#About", Icon: HomeRounded, ext: ".jsx", hash: "8f3a21", msg: "chore: init profile" },
  { label: "Skills", href: "#Skills", Icon: BuildRounded, ext: ".ts", hash: "k9d1e4", msg: "feat: tech-stack.md" },
  { label: "Experience", href: "#Experience", Icon: WorkRounded, ext: ".log", hash: "a4b2c9", msg: "feat: work-history" },
  { label: "Projects", href: "#Projects", Icon: FolderRounded, ext: ".git", hash: "f7e8a9", msg: "feat: build-portfolio" },
  { label: "Blogs", href: "#Blog", Icon: ArticleRounded, ext: ".md", hash: "c1d2e3", msg: "docs: update-logs" },
  { label: "Testimonials", href: "#Testimonials", Icon: StarRounded, ext: ".json", hash: "b2c3d4", msg: "feat: add-reviews" },
  { label: "Education", href: "#Education", Icon: SchoolRounded, ext: ".init", hash: "e5f6g7", msg: "chore: academics" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState("#About");
  const [showMore, setShowMore] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const moreRef = useRef(null);

  const { isDark, toggleTheme } = useThemeToggle();
  const { navPosition, setNavPosition } = useNavContext();

  const handleNavToggle = () => {
    if (navPosition === 'top') setNavPosition('left');
    else if (navPosition === 'left') setNavPosition('right');
    else setNavPosition('top');
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < 150) {
          setActiveTab(`#${section}`);
          break;
        }
      }
    };

    const handleResize = () => setWindowWidth(window.innerWidth);

    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleThemeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(
      Math.round(rect.left + rect.width / 2),
      Math.round(rect.top + rect.height / 2)
    );
    setSpinning(true);
  };

  const themeIcon = isDark ? <LightModeRounded /> : <DarkModeRounded />;

  // Determine which links to show in main tabs vs "More"
  const visibleLinks = windowWidth < 1250 ? NAV_LINKS.slice(0, 4) : NAV_LINKS;
  const moreLinks = windowWidth < 1250 ? NAV_LINKS.slice(4) : [];

  return (
    <>
      <Nav $navPosition={navPosition}>
        <NavbarContainer>
          <ShellPath>
            <TerminalRounded sx={{ fontSize: 18 }} />
            <span className="user">portfolio-app</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <BranchTag>
              <AccountTreeRounded sx={{ fontSize: 14 }} />
              main*
            </BranchTag>
          </ShellPath>

          <TabBar>
            {visibleLinks.map(({ label, href, Icon, ext, external }) => (
              <Tab key={label}>
                <TabLink
                  href={external ? Bio.blogs : href}
                  active={activeTab === href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon />
                  <span className="label">{label}</span>
                  <span className="ext">{ext}</span>
                </TabLink>
              </Tab>
            ))}

            {moreLinks.length > 0 && (
              <Tab>
                <MoreContainer ref={moreRef}>
                  <StatusButton
                    style={{ height: '100%', padding: '0 16px' }}
                    onClick={() => setShowMore(!showMore)}
                  >
                    <MoreHorizRounded />
                  </StatusButton>
                  <DropdownMenu show={showMore}>
                    {moreLinks.map((link) => (
                      <DropdownItem
                        key={link.label}
                        href={link.href}
                        onClick={() => setShowMore(false)}
                      >
                        <link.Icon />
                        {link.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </MoreContainer>
              </Tab>
            )}
          </TabBar>

          <StatusGroup>
            <LayoutToggleButton onClick={handleNavToggle} title="Switch Layout">
              <DashboardRounded />
              <span className="lncol" style={{ fontSize: 10 }}>LN 1, COL 1</span>
            </LayoutToggleButton>

            <StatusButton onClick={handleThemeToggle} title="Toggle Theme">
              <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
                {themeIcon}
              </IconSpan>
            </StatusButton>

            <GithubStatus href={Bio.github} target="_blank" rel="noopener noreferrer">
              <GitHub sx={{ fontSize: 18 }} />
              <span className="push">Github</span>
            </GithubStatus>
          </StatusGroup>
        </NavbarContainer>
      </Nav>

      <FloatingActionGroup $isOpen={isOpen}>
        <FAB onClick={handleThemeToggle}>
          <IconSpan $spinning={spinning} onAnimationEnd={() => setSpinning(false)}>
            {themeIcon}
          </IconSpan>
        </FAB>
        <FAB onClick={() => setIsOpen(true)}>
          <MenuRounded sx={{ fontSize: 24 }} />
        </FAB>
      </FloatingActionGroup>

      {isOpen && (
        <>
          <Backdrop onClick={() => setIsOpen(false)} />
          <MobileDrawer>
            <DrawerHeader>
              <RepoPath>
                <RepoName>amareshpati / portfolio</RepoName>
                <BranchInfo>
                  <AccountTreeRounded sx={{ fontSize: 12 }} />
                  main
                  <FiberManualRecordRounded sx={{ fontSize: 8, ml: 1, color: '#3fb950' }} />
                  <span style={{ color: '#8b949e', marginLeft: '4px' }}>Active</span>
                </BranchInfo>
              </RepoPath>
              <StatusButton style={{ marginLeft: 'auto', background: '#30363d50', borderRadius: '50%', width: '32px', height: '32px', padding: 0, justifyContent: 'center', minWidth: '32px' }} onClick={() => setIsOpen(false)}>
                <CloseRounded sx={{ fontSize: 20 }} />
              </StatusButton>
            </DrawerHeader>

            <GitGraphContainer>
              <GraphLine />
              {NAV_LINKS.map(({ label, href, hash, msg, external }) => (
                <CommitItem
                  key={label}
                  href={external ? Bio.blogs : href}
                  onClick={() => setIsOpen(false)}
                >
                  <Node $active={activeTab === href} />
                  <CommitMeta>
                    <CommitHeader $active={activeTab === href}>
                      <Hash>{hash}</Hash>
                      {label}
                    </CommitHeader>
                    <CommitMessage>{msg}</CommitMessage>
                  </CommitMeta>
                  <div style={{ color: '#8b949e', fontSize: '10px', fontFamily: 'Space Mono' }}>
                    {Math.floor(Math.random() * 60)}m ago
                  </div>
                </CommitItem>
              ))}
            </GitGraphContainer>

            <div style={{ padding: '16px 24px 0' }}>
              <GithubStatus
                href={Bio.github}
                target="_blank"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginLeft: 0,
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <GitHub sx={{ mr: 1, fontSize: 18 }} /> GitHub
              </GithubStatus>
            </div>
          </MobileDrawer>
        </>
      )}
    </>
  );
};

export default Navbar;
