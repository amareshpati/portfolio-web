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
import CoreSkills from "./components/sections/CoreSkills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import BlogPreview from "./components/sections/BlogPreview";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StarCanvas from "./components/canvas/Stars";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Bio } from "./data/constants";

const Body = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  padding-top: 60px;
  @media screen and (max-width: 768px) {
    padding-top: 0;
  }
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
  html {
    background-color: ${({ theme }) => theme.bg};
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  body {
    background-color: transparent;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    /* Clear any default browser padding/margin */
    margin: 0;
    padding: 0;
    /* Pad the very bottom so our content clears the home indicator */
    padding-bottom: env(safe-area-inset-bottom, 0px);
    overflow-x: hidden;
  }

  #root {
    background-color: transparent;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    margin: 0;
    padding: 0;
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
    // Handle /sendmail redirect
    if (window.location.pathname === "/sendmail") {
      window.location.href = `mailto:${Bio.email}?subject=Collaboration Request&body=Hi Amaresh,%0D%0A%0D%0A I saw your portfolio and would like to connect for...`;
      
      // Optionally redirect back after a short delay or just show home
      setTimeout(() => {
        window.history.replaceState({}, "", "/");
      }, 100);
    }

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
    <HelmetProvider>
      <Helmet>
        <title>{`${Bio.name} | Full-Stack Developer & DevOps Engineer`}</title>
        <meta name="title" content={`${Bio.name} | Full-Stack Developer & DevOps Engineer`} />
        <meta name="description" content={Bio.description} />
        <meta name="author" content={Bio.name} />
        
        <meta property="og:title" content={`${Bio.name} | Full-Stack Developer & DevOps Engineer`} />
        <meta property="og:description" content={Bio.brandTagline} />
        
        <meta property="twitter:title" content={`${Bio.name} | Full-Stack Developer & DevOps Engineer`} />
        <meta property="twitter:description" content={Bio.brandTagline} />
      </Helmet>
      <NavContext.Provider value={{ navPosition, setNavPosition }}>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <BrowserRouter>
              <GlobalStyle />
              <Navbar />
              <SideNav />
              <Body>
                <StarCanvas />
                <div>
                  <Hero />
                  <Wrapper>
                  <CoreSkills />
                  <Experience />
                </Wrapper>
                <Projects />
                <Wrapper>
                  <BlogPreview />
                  <Testimonials />
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
    </HelmetProvider>
  );
}

export default App;
