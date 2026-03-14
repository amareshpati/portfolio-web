import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import {
  Instagram,
  LinkedIn,
  GitHub,
  X,
  TerminalRounded,
  AccountTreeRounded,
  CloudDoneRounded,
  MemoryRounded,
  SecurityRounded,
  WifiRounded
} from "@mui/icons-material";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 4rem 0 2rem 0;
  display: flex;
  justify-content: center;
  position: relative;
  background: ${({ theme }) => theme.bg};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 1rem;
  font-family: 'Space Mono', monospace;
`;

const GitStatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .label {
    opacity: 0.6;
    font-size: 11px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text_secondary};
  }

  .value {
    color: ${({ theme }) => theme.text_primary};
    font-weight: 600;
  }

  .active {
    color: ${({ theme }) => theme.success};
    display: flex;
    align-items: center;
    gap: 4px;
  }

  svg {
    font-size: 16px;
    color: ${({ theme }) => theme.primary};
  }
`;

const RefsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: 10px;

  @media (max-width: 960px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const RefCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CategoryTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.border};
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &::before {
    content: "refs/tags/";
    opacity: 0.2;
    font-size: 10px;
  }

  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translateX(4px);
  }
`;

const SocialAndBuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const BuildInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BuildBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.success + "15"};
  color: ${({ theme }) => theme.success};
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.success + "30"};
  font-weight: 700;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text_secondary};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary + "40"};
    background: ${({ theme }) => theme.primary + "08"};
    transform: translateY(-2px);
  }

  svg { font-size: 20px; }
`;

const Copyright = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 0;
  opacity: 0.6;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>

        <GitStatusBar>
          <StatusGroup>
            <StatusItem>
              <AccountTreeRounded />
              <span className="label">Branch</span>
              <span className="value">master</span>
            </StatusItem>
            <StatusItem>
              <WifiRounded />
              <span className="label">Status</span>
              <span className="active">
                <CloudDoneRounded sx={{ fontSize: 14 }} /> DEPLOYED
              </span>
            </StatusItem>
          </StatusGroup>
          <StatusGroup>
            <StatusItem>
              <MemoryRounded />
              <span className="label">Environment</span>
              <span className="value">PRODUCTION</span>
            </StatusItem>
            <StatusItem>
              <SecurityRounded />
              <span className="label">Auth</span>
              <span className="value">SSL/ECC</span>
            </StatusItem>
          </StatusGroup>
        </GitStatusBar>

        <RefsGrid>
          <RefCategory>
            <CategoryTitle>Navigation</CategoryTitle>
            <NavLink href="#About">About</NavLink>
            <NavLink href="#Skills">Skills</NavLink>
          </RefCategory>
          <RefCategory>
            <CategoryTitle>Experience</CategoryTitle>
            <NavLink href="#Experience">Work</NavLink>
            <NavLink href="#Education">Education</NavLink>
          </RefCategory>
          <RefCategory>
            <CategoryTitle>Resources</CategoryTitle>
            <NavLink href="#Projects">Projects</NavLink>
            <NavLink href="#Blog">Blog</NavLink>
          </RefCategory>
          <RefCategory>
            <CategoryTitle>Community</CategoryTitle>
            <NavLink href="#Testimonials">Reviews</NavLink>
            <NavLink href={Bio.github} target="_blank">Source</NavLink>
          </RefCategory>
        </RefsGrid>

        <SocialAndBuild>
          <BuildInfo>
            <BuildBadge>BUILD: PASSING</BuildBadge>
            <span>v1.2.4-stable</span>
            <Copyright>
              &copy; {new Date().getFullYear()} {Bio.name}
            </Copyright>
          </BuildInfo>

          <SocialMediaIcons>
            <SocialMediaIcon href={Bio.github} target="_blank">
              <GitHub />
            </SocialMediaIcon>
            <SocialMediaIcon href={Bio.linkedin} target="_blank">
              <LinkedIn />
            </SocialMediaIcon>
            <SocialMediaIcon href={Bio.insta} target="_blank">
              <Instagram />
            </SocialMediaIcon>
            <SocialMediaIcon href={Bio.twitter} target="_blank">
              <X />
            </SocialMediaIcon>
          </SocialMediaIcons>
        </SocialAndBuild>

        <div style={{
          fontSize: '9px',
          color: 'inherit',
          opacity: 0.4,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <TerminalRounded sx={{ fontSize: 12 }} />
          Connection established via secure websocket. Latency: 24ms.
        </div>

      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;