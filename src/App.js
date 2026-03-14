import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Themes";
import { ThemeContext } from "./utils/ThemeContext";
import { NavContext } from "./utils/NavContext";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import BlogPreview from "./components/sections/BlogPreview";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const GlobalStyle = createGlobalStyle`
  /* Let the old snapshot sit still underneath */
  ::view-transition-old(root) {
    animation: none;
    z-index: 0;
  }

  /* New theme expands as a pure circle — GPU-compositable, no shape morphing */
  ::view-transition-new(root) {
    z-index: 1;
    will-change: clip-path;
    transform: translateZ(0);
    animation: theme-ripple 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes theme-ripple {
    from { clip-path: circle(0px    at var(--ripple-x, 50%) var(--ripple-y, 50%)); }
    to   { clip-path: circle(200vmax at var(--ripple-x, 50%) var(--ripple-y, 50%)); }
  }

  /* ── iOS Safari safe-area fixes ──────────────────────────────── */
  html, body {
    /* Fills the full viewport including the notch & home indicator area */
    min-height: 100vh;
    min-height: -webkit-fill-available;
    /* Pad the very bottom so our content clears the home indicator */
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background-color: ${({ theme }) => theme.bg};
  }

  #root {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    background-color: ${({ theme }) => theme.bg};
  }
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function getInitialDark() {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved !== null) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialNavPosition() {
  const saved = localStorage.getItem("portfolio-nav-position");
  if (saved !== null) return saved;
  // If undefined/server-side, default to top. Otherwise check if side nav is visible based on breakpoint.
  if (typeof window !== "undefined" && window.innerWidth > 1600) {
    return "left";
  }
  return "top";
}

function App() {
  const [isDark, setIsDark] = useState(getInitialDark);
  const [navPosition, setNavPosition] = useState(getInitialNavPosition);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    localStorage.setItem("portfolio-nav-position", navPosition);

    // Sync browser status bar / address bar color with our theme
    const color = isDark ? darkTheme.bg : lightTheme.bg;
    let meta = document.getElementById("theme-color-meta");
    if (!meta) {
      // Fallback: create it if somehow missing
      meta = document.createElement("meta");
      meta.id = "theme-color-meta";
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [isDark, navPosition]);

  const toggleTheme = (x, y) => {
    // Set the CSS vars for the ripple origin (default: screen centre)
    const rx = x ?? window.innerWidth / 2;
    const ry = y ?? window.innerHeight / 2;
    document.documentElement.style.setProperty("--ripple-x", `${rx}px`);
    document.documentElement.style.setProperty("--ripple-y", `${ry}px`);

    if (!document.startViewTransition) {
      // Fallback for browsers without View Transitions API
      setIsDark((prev) => !prev);
      return;
    }

    document.startViewTransition(() => {
      // flushSync forces React to commit the state update synchronously
      // so the View Transition API can snapshot the new DOM correctly
      flushSync(() => setIsDark((prev) => !prev));
    });
  };

  return (
    <NavContext.Provider value={{ navPosition, setNavPosition }}>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <BrowserRouter>
            <GlobalStyle />
            <Navbar />
            <SideNav />
            <Body>
              <div>
                <Hero />
                <Wrapper>
                  <Skills />
                  <Experience />
                </Wrapper>
                <Projects />
                <Wrapper>
                  <BlogPreview />
                  <Education />
                  <Contact />
                </Wrapper>
                <Footer />
                <ScrollToTop />
              </div>
            </Body>
          </BrowserRouter>
        </ThemeProvider>
      </ThemeContext.Provider>
    </NavContext.Provider>
  );
}

export default App;
