import React, { useState } from "react";
import styled from "styled-components";
import { Apple, GitHub } from "@mui/icons-material";

/* ─── Styled Components ─────────────────────────────────────── */

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.4s ease-in-out;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 40px 4px rgba(0, 0, 0, 0.35);
    filter: brightness(1.05);
  }
`;

const PinnedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + 18};
  border: 1px solid ${({ theme }) => theme.primary + 50};
  border-radius: 20px;
  padding: 3px 10px;
  align-self: flex-start;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.card_light + "50"};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: ${({ type }) => (type === "round" ? "130px" : "100%")};
  height: ${({ type }) => (type === "round" ? "130px" : "100%")};
  object-fit: ${({ type }) => (type === "round" ? "contain" : "cover")};
  background-color: ${({ theme, type }) => (type === "round" ? "transparent" : theme.white)};
  border-radius: ${({ type }) => (type === "round" ? "50%" : "10px")};
  transition: transform 0.4s ease;
  
  &:hover {
    transform: ${({ type }) => (type === "round" ? "scale(1.05)" : "none")};
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-height: 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "800px" : "60px")};
  transition: max-height 0.5s ease-in-out;
`;

const DescriptionText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  display: ${({ expanded }) => (expanded ? "block" : "-webkit-box")};
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "unset" : "3")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: ${({ expanded }) => (expanded ? "6px" : "0")};
  
  &:first-child {
    margin-top: 0;
  }
`;

const ReadMore = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 600;
`;

/* ─── Store Buttons ─────────────────────────────────────────── */

const StoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 25};
  flex-wrap: wrap;
`;

const IconBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.primary + 55};
  background: ${({ theme }) => theme.primary + 12};
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.22s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.primary};
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const GithubIconBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  transition: color 0.22s ease, transform 0.22s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: scale(1.15);
  }

  svg {
    width: 22px;
    height: 22px;
  }
`;

/* Inline Google Play SVG icon */
const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M3.18 23.76a2 2 0 01-.67-1.5V1.74c0-.6.24-1.13.67-1.5l.08-.07 12.37 12.37v.29L3.26 23.83l-.08-.07zM16.54 15.9l-3.13-3.13 3.13-3.13 3.53 2.01c1.01.57 1.01 1.51 0 2.08l-3.53 2.17zm-13.36 7.23l-.13.11L16.18 16.9l-3.13-3.13L3.18 23.13zm0-22.26L13.05 10.23l-3.13-3.13L3.05 1.01l-.13.11L3.18.87z" />
  </svg>
);

/* ─── Component ─────────────────────────────────────────────── */

const ProjectCard = ({ project, pinned }) => {
  const [expanded, setExpanded] = useState(false);

  const hasLinks =
    project.github || project.playStore || project.appStore || project.webapp;

  return (
    <Card>
      {pinned && <PinnedBadge>📌 Pinned</PinnedBadge>}
      <ImageContainer>
        <Image src={project.image} alt={project.title} type={project.imageType} />
      </ImageContainer>
      <Details>
        <Title>{project.title}</Title>
        <DescriptionContainer expanded={expanded}>
          <DescriptionText expanded={expanded}>{project.overview}</DescriptionText>
          {expanded &&
            project.description.slice(1).map((text, i) => (
              <DescriptionText key={i} expanded={expanded}>
                • {text}
              </DescriptionText>
            ))}
        </DescriptionContainer>
        {!expanded ? (
          <ReadMore onClick={() => setExpanded(true)}>Read More ›</ReadMore>
        ) : (
          <ReadMore onClick={() => setExpanded(false)}>‹ Read Less</ReadMore>
        )}
      </Details>

      {hasLinks && (
        <StoreRow>
          {project.playStore && (
            <IconBtn href={project.playStore} target="_blank" rel="noopener noreferrer" title="Get it on Google Play">
              <GooglePlayIcon />
              Google Play
            </IconBtn>
          )}
          {project.appStore && (
            <IconBtn href={project.appStore} target="_blank" rel="noopener noreferrer" title="Download on App Store">
              <Apple fontSize="small" />
              App Store
            </IconBtn>
          )}
          {project.webapp && !project.playStore && !project.appStore && (
            <IconBtn href={project.webapp} target="_blank" rel="noopener noreferrer" title="View App">
              🔗 View App
            </IconBtn>
          )}
          {project.github && (
            <GithubIconBtn href={project.github} target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <GitHub />
            </GithubIconBtn>
          )}
        </StoreRow>
      )}
    </Card>
  );
};

export default ProjectCard;
