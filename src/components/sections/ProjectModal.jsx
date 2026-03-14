import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitHub,
  Apple,
  Launch,
  MergeType,
  Storage,
  AccountTree,
  Terminal as TerminalIcon,
  CheckCircle,
  AccountCircle,
  FolderOpen,
  Description,
  Settings,
} from "@mui/icons-material";

// ─── Responsive hook ───────────────────────────────────────────────────────────
const useMediaQuery = (maxWidth) => {
  const [matches, setMatches] = useState(() => window.innerWidth <= maxWidth);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [maxWidth]);
  return matches;
};

// ─── Styled Components ─────────────────────────────────────────────────────────
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 11, 13, 0.9);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 640px) {
    padding: 0;
    align-items: flex-end;
  }
`;

const IDEWindow = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  height: 85vh;
  background: #0d1117;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(48, 54, 61, 0.8);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  color: #c9d1d9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;

  @media (max-width: 640px) {
    height: 92vh;
    border-radius: 16px 16px 0 0;
    border-bottom: none;
  }
`;

const TitleBar = styled.div`
  height: 38px;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  user-select: none;
  flex-shrink: 0;

  @media (max-width: 640px) {
    height: 44px;
    padding: 0 12px;
  }
`;

const WindowControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Red close dot — shows x on hover (desktop) / always (mobile) */
  .dot.close {
    background: #ff5f56;
    svg {
      opacity: 0;
      transition: opacity 0.15s;
      pointer-events: none;
      display: block;
    }
    &:hover svg {
      opacity: 1;
    }
  }

  .dot.min { background: #ffbd2e; }
  .dot.max { background: #27c93f; }

  @media (max-width: 850px) {
    .dot.close svg { opacity: 1; }
    .dot.min,
    .dot.max { display: none; }
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${(p) => (p.active ? "#58a6ff" : "#8b949e")};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  transition: color 0.2s;

  @media (max-width: 850px) {
    display: flex;
  }
`;

const CurrentFile = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #8b949e;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 50%;

  .separator { color: #484f58; }

  @media (max-width: 640px) {
    font-size: 12px;
    .separator,
    .category { display: none; }
  }
`;

const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
`;

const SidebarBackdrop = styled(motion.div)`
  display: none;
  @media (max-width: 850px) {
    display: block;
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;

const Sidebar = styled(motion.aside)`
  width: 220px;
  background: #0d1117;
  border-right: 1px solid #30363d;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 850px) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    z-index: 100;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
  }
`;

const SidebarHeader = styled.div`
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 1px;
  flex-shrink: 0;
`;

const FileTree = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 13px;
  cursor: pointer;
  background: ${(p) => (p.active ? "#1f242c" : "transparent")};
  border: none;
  border-left: 2px solid ${(p) => (p.active ? "#58a6ff" : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "#8b949e")};
  transition: background 0.15s, color 0.15s;
  text-align: left;
  width: 100%;
  min-height: 40px;

  &:hover {
    background: #161b22;
    color: #fff;
  }

  svg { font-size: 16px; flex-shrink: 0; }
`;

const MainEditor = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0d1117;
  overflow: hidden;
  min-width: 0;
`;

const EditorTabs = styled.div`
  height: 36px;
  background: #161b22;
  display: flex;
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Tab = styled.button`
  padding: 0 14px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  background: ${(p) => (p.active ? "#0d1117" : "transparent")};
  border: none;
  border-right: 1px solid #30363d;
  border-top: 2px solid ${(p) => (p.active ? "#58a6ff" : "transparent")};
  color: ${(p) => (p.active ? "#fff" : "#8b949e")};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 36px;
  transition: background 0.15s, color 0.15s;

  svg { font-size: 14px; flex-shrink: 0; }
`;

const EditorContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 32px 40px;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 900px) { padding: 24px; }
  @media (max-width: 640px) { padding: 16px; }
`;

const MarkdownHeader = styled.div`
  margin-bottom: 28px;
  border-bottom: 1px solid #30363d;
  padding-bottom: 20px;
`;

const PRInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const PRBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: #238636;
  color: #fff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  &.merged { background: #8957e5; }
`;

const PRTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin: 8px 0;
  line-height: 1.3;
  word-break: break-word;

  span.number {
    color: #8b949e;
    font-weight: 300;
  }

  @media (max-width: 640px) { font-size: 20px; }
`;

const PRMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #8b949e;
  flex-wrap: wrap;

  .user-badge {
    color: #fff;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 640px) { font-size: 12px; }
`;

/* Hero image — fixed height so it never swamps the content */
const ImageHero = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 28px;
  border: 1px solid #30363d;
  position: relative;
  max-height: 260px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 900px) { max-height: 200px; }
  @media (max-width: 640px) { max-height: 150px; }
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.5s;
  &:hover { transform: scale(1.03); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 28px;
`;

const MDTitle = styled.h2`
  font-size: 18px;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "##";
    color: #58a6ff;
    font-family: "Space Mono", monospace;
    font-size: 14px;
    flex-shrink: 0;
  }

  @media (max-width: 640px) { font-size: 16px; }
`;

const MDBody = styled.div`
  color: #8b949e;
  line-height: 1.7;
  font-size: 14px;

  ul {
    padding-left: 20px;
    margin: 0;
    li { margin-bottom: 8px; }
  }

  p { margin: 0; }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

const SideWidget = styled.div`
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 14px;
`;

const WidgetTitle = styled.h4`
  font-size: 11px;
  text-transform: uppercase;
  color: #8b949e;
  margin: 0 0 10px 0;
  letter-spacing: 0.5px;
`;

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-family: "Space Mono", monospace;
  font-size: 11px;
  background: #111418;
  color: #58a6ff;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid #30363d;
`;

const ActionGrid = styled.div`
  display: grid;
  gap: 8px;
`;

const VSButton = styled.a`
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  -webkit-tap-highlight-color: transparent;
  min-height: 38px;

  ${(p) =>
    p.primary
      ? `background:#238636; color:#fff; &:hover{background:#2ea043;} &:active{transform:scale(0.97);}`
      : `background:#30363d; color:#c9d1d9; border:1px solid #484f58; &:hover{background:#484f58;} &:active{transform:scale(0.97);}`}
`;

const StatusBar = styled.div`
  height: 22px;
  background: ${(p) => p.theme?.primary ?? "#1f6feb"};
  display: flex;
  align-items: center;
  padding: 0 12px;
  justify-content: space-between;
  font-size: 11px;
  color: #fff;
  user-select: none;
  flex-shrink: 0;
  gap: 8px;

  @media (max-width: 640px) {
    height: 26px;
    .hide-mobile { display: none; }
  }
`;

const StatusGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  overflow: hidden;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

const GooglePlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 01-.67-1.5V1.74c0-.6.24-1.13.67-1.5l.08-.07 12.37 12.37v.29L3.26 23.83l-.08-.07zM16.54 15.9l-3.13-3.13 3.13-3.13 3.53 2.01c1.01.57 1.01 1.51 0 2.08l-3.53 2.17zm-13.36 7.23l-.13.11L16.18 16.9l-3.13-3.13L3.18 23.13zm0-22.26L13.05 10.23l-3.13-3.13L3.05 1.01l-.13.11L3.18.87z" />
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, open, onClose }) => {
  const [activeTab, setActiveTab] = useState("readme");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(850);

  useEffect(() => {
    if (!isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <IDEWindow
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Title Bar ── */}
            <TitleBar>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <WindowControls>
                  {/* Red dot with embedded × glyph */}
                  <div className="dot close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 8 8" width="7" height="7" fill="none">
                      <path
                        d="M1 1l6 6M7 1L1 7"
                        stroke="#7a0000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="dot min" />
                  <div className="dot max" />
                </WindowControls>

                {isMobile && (
                  <MobileToggle
                    active={isSidebarOpen}
                    onClick={() => setIsSidebarOpen((v) => !v)}
                    aria-label="Toggle file explorer"
                  >
                    <FolderOpen style={{ fontSize: 20 }} />
                  </MobileToggle>
                )}
              </div>

              <CurrentFile>
                <span className="category">{project.category}</span>
                <span className="separator">/</span>
                {project.title.toLowerCase().replace(/\s+/g, "_")}.js
              </CurrentFile>

              <div style={{ width: isMobile ? 32 : 40 }} />
            </TitleBar>

            {/* ── Layout ── */}
            <LayoutContainer>
              <AnimatePresence>
                {isMobile && isSidebarOpen && (
                  <SidebarBackdrop
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(!isMobile || isSidebarOpen) && (
                  <Sidebar
                    key="sidebar"
                    initial={isMobile ? { x: -260 } : false}
                    animate={{ x: 0 }}
                    exit={{ x: -260 }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  >
                    <SidebarHeader>Explorer</SidebarHeader>
                    <FileTree>
                      <FileItem
                        active={activeTab === "readme"}
                        onClick={() => handleTabChange("readme")}
                      >
                        <Description style={{ color: "#58a6ff" }} />
                        README.md
                      </FileItem>
                      <FileItem
                        active={activeTab === "stack"}
                        onClick={() => handleTabChange("stack")}
                      >
                        <AccountTree style={{ color: "#7ee787" }} />
                        architecture.json
                      </FileItem>
                      <FileItem
                        active={activeTab === "deployment"}
                        onClick={() => handleTabChange("deployment")}
                      >
                        <Storage style={{ color: "#d29922" }} />
                        deployment.yaml
                      </FileItem>
                      <FileItem style={{ opacity: 0.4, cursor: "default" }} disabled>
                        <Settings style={{ fontSize: 16 }} />
                        package.lock
                      </FileItem>
                    </FileTree>

                    <div style={{ marginTop: "auto", padding: 14 }}>
                      <WidgetTitle>Local Changes</WidgetTitle>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#484f58",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <MergeType style={{ fontSize: 14 }} />
                        0 uncommitted changes
                      </div>
                    </div>
                  </Sidebar>
                )}
              </AnimatePresence>

              <MainEditor>
                <EditorTabs role="tablist">
                  <Tab
                    active={activeTab === "readme"}
                    onClick={() => setActiveTab("readme")}
                    role="tab"
                  >
                    <Description style={{ fontSize: 14, color: "#58a6ff" }} />
                    README.md
                  </Tab>
                  {activeTab !== "readme" && (
                    <Tab active role="tab">
                      {activeTab === "stack" ? (
                        <AccountTree style={{ fontSize: 14, color: "#7ee787" }} />
                      ) : (
                        <Storage style={{ fontSize: 14, color: "#d29922" }} />
                      )}
                      {activeTab === "stack" ? "architecture.json" : "deployment.yaml"}
                    </Tab>
                  )}
                </EditorTabs>

                <EditorContent>
                  <AnimatePresence mode="wait">
                    {activeTab === "readme" ? (
                      <motion.div
                        key="readme"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MarkdownHeader>
                          <PRInfo>
                            <PRBadge className="merged">
                              <MergeType fontSize="small" /> Merged
                            </PRBadge>
                            <PRMeta>
                              <b>amareshpati</b> merged into{" "}
                              <span>master</span> from{" "}
                              <span>feature/project-v{project.id}</span>
                            </PRMeta>
                          </PRInfo>

                          <PRTitle>
                            {project.title}{" "}
                            <span className="number">#{project.id}</span>
                          </PRTitle>

                          <PRMeta>
                            <span className="user-badge">
                              <AccountCircle style={{ fontSize: 16 }} />{" "}
                              amareshpati
                            </span>
                            completed •{" "}
                            {Array.isArray(project.category)
                              ? project.category.join(", ")
                              : project.category}
                          </PRMeta>
                        </MarkdownHeader>

                        <ImageHero>
                          <HeroImg src={project.image} alt={project.title} />
                        </ImageHero>

                        <Grid>
                          <div>
                            <SectionContainer>
                              <MDTitle>Overview & Objectives</MDTitle>
                              <MDBody>
                                <p>{project.overview}</p>
                              </MDBody>
                            </SectionContainer>

                            <SectionContainer>
                              <MDTitle>Implementation Details</MDTitle>
                              <MDBody>
                                <ul>
                                  {project.description.map((line, i) => (
                                    <li key={i}>{line}</li>
                                  ))}
                                </ul>
                              </MDBody>
                            </SectionContainer>
                          </div>

                          <RightSection>
                            <SideWidget>
                              <WidgetTitle>Tech Stack</WidgetTitle>
                              <TagGrid>
                                {project.tags.map((tag, i) => (
                                  <Tag key={i}>{tag}</Tag>
                                ))}
                              </TagGrid>
                            </SideWidget>

                            <SideWidget>
                              <WidgetTitle>Environments</WidgetTitle>
                              <ActionGrid>
                                {project.github && (
                                  <VSButton href={project.github} target="_blank" rel="noreferrer">
                                    <GitHub style={{ fontSize: 16 }} /> View Source
                                  </VSButton>
                                )}
                                {project.webapp && (
                                  <VSButton href={project.webapp} target="_blank" rel="noreferrer" primary>
                                    <Launch style={{ fontSize: 16 }} /> Open Live App
                                  </VSButton>
                                )}
                                {project.playStore && (
                                  <VSButton href={project.playStore} target="_blank" rel="noreferrer">
                                    <GooglePlayIcon /> Google Play
                                  </VSButton>
                                )}
                                {project.appStore && (
                                  <VSButton href={project.appStore} target="_blank" rel="noreferrer">
                                    <Apple style={{ fontSize: 16 }} /> Apple Store
                                  </VSButton>
                                )}
                              </ActionGrid>
                            </SideWidget>

                            <SideWidget>
                              <WidgetTitle>Pipeline</WidgetTitle>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  fontSize: 12,
                                  color: "#8b949e",
                                }}
                              >
                                <CheckCircle style={{ color: "#238636", fontSize: 16 }} />
                                CI/CD Pipeline Succeeded
                              </div>
                            </SideWidget>
                          </RightSection>
                        </Grid>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="config"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            color: "#fff",
                            marginBottom: 20,
                            flexWrap: "wrap",
                          }}
                        >
                          <TerminalIcon />
                          <span
                            style={{
                              fontFamily: "Space Mono, monospace",
                              fontWeight: 600,
                              fontSize: 13,
                              wordBreak: "break-all",
                            }}
                          >
                            system_diagnostic --project="{project.title}"
                          </span>
                        </div>
                        <MDBody
                          style={{
                            fontFamily: "Space Mono, monospace",
                            background: "#010409",
                            padding: 20,
                            borderRadius: 8,
                            border: "1px solid #30363d",
                            overflowX: "auto",
                            fontSize: 12,
                          }}
                        >
                          <div style={{ color: "#7ee787" }}>
                            [INFO] Loading{" "}
                            {activeTab === "stack" ? "stack" : "deployment"}{" "}
                            configuration...
                          </div>
                          <div style={{ color: "#c9d1d9", marginTop: 10 }}>
                            {activeTab === "stack" ? (
                              <>
                                <div>"core": "React Native",</div>
                                <div>"platform": ["iOS", "Android"],</div>
                                <div>"state_management": "Redux Toolkit",</div>
                                <div>"ui_framework": "Styled Components",</div>
                                <div>"dependencies": [</div>
                                {project.tags.map((tag, i) => (
                                  <div key={i} style={{ paddingLeft: 20 }}>
                                    "{tag}"{i === project.tags.length - 1 ? "" : ","}
                                  </div>
                                ))}
                                <div>]</div>
                              </>
                            ) : (
                              <>
                                <div>apiVersion: v1</div>
                                <div>kind: ProjectDeployment</div>
                                <div>metadata:</div>
                                <div style={{ paddingLeft: 20 }}>
                                  name:{" "}
                                  {project.title.toLowerCase().replace(/\s+/g, "-")}
                                </div>
                                <div>spec:</div>
                                <div style={{ paddingLeft: 20 }}>replicas: 1</div>
                                <div style={{ paddingLeft: 20 }}>status: stable</div>
                                <div style={{ paddingLeft: 20 }}>
                                  lastDeployed: "{new Date().toDateString()}"
                                </div>
                              </>
                            )}
                          </div>
                          <div style={{ color: "#58a6ff", marginTop: 10 }}>
                            [OK] Configuration loaded successfully.
                          </div>
                        </MDBody>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </EditorContent>
              </MainEditor>
            </LayoutContainer>

            {/* ── Status Bar ── */}
            <StatusBar>
              <StatusGroup>
                <StatusItem>
                  <MergeType style={{ fontSize: 13 }} /> main*
                </StatusItem>
                <StatusItem>
                  <CheckCircle style={{ fontSize: 13 }} /> 0 Errors
                </StatusItem>
              </StatusGroup>
              <StatusGroup>
                <StatusItem>UTF-8</StatusItem>
                <StatusItem className="hide-mobile">JavaScript</StatusItem>
              </StatusGroup>
            </StatusBar>
          </IDEWindow>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;