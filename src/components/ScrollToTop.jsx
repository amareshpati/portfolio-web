import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { KeyboardDoubleArrowUpRounded } from "@mui/icons-material";

const blink = keyframes`
  50% { opacity: 0; }
`;

const TerminalScrollBtn = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #0d1117;
  border: 1px solid ${({ theme }) => theme.primary + "40"};
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #c9d1d9;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  opacity: ${({ $visible }) => ($visible ? "1" : "0")};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${({ theme }) => theme.primary + "20"};
    
    .cmd-text {
      color: ${({ theme }) => theme.text_primary};
    }
  }

  .prompt {
    color: #3fb950;
    font-weight: 700;
  }

  .cmd-text {
    color: #8b949e;
    transition: color 0.2s;
  }

  .cursor {
    width: 7px;
    height: 15px;
    background: ${({ theme }) => theme.primary};
    animation: ${blink} 1s step-end infinite;
    display: inline-block;
    vertical-align: middle;
    margin-left: 2px;
  }

  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 20px;
  }

  @media (max-width: 768px) {
    bottom: 164px;
    right: 24px;
    width: 52px;
    height: 52px;
    padding: 0;
    justify-content: center;
    border-radius: 12px;
    
    .terminal-content {
      display: none;
    }
    
    svg {
      font-size: 26px;
    }
  }
`;

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TerminalScrollBtn
      $visible={isVisible}
      onClick={scrollToTop}
      title="git reset --hard"
      aria-label="Scroll to top"
    >
      <KeyboardDoubleArrowUpRounded />
      <div className="terminal-content">
        <span className="prompt">amaresh:~$</span>
        <span className="cmd-text"> git reset --hard</span>
        <span className="cursor" />
      </div>
    </TerminalScrollBtn>
  );
};

export default ScrollToTop;
