import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { KeyboardArrowUpRounded } from "@mui/icons-material";

const ScrollBtn = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  opacity: ${({ $visible }) => ($visible ? "1" : "0")};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")}) scale(${({ $visible }) => ($visible ? "1" : "0.8")});
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
    background-color: ${({ theme }) => theme.primary};
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Top: 0 takes us all the way back to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            // Show button if page is scrolled down more than 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ScrollBtn
            $visible={isVisible}
            onClick={scrollToTop}
            title="Go to top"
            aria-label="Scroll to top"
        >
            <KeyboardArrowUpRounded fontSize="large" />
        </ScrollBtn>
    );
};

export default ScrollToTop;
