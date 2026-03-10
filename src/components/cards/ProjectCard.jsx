import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
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
const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const DescriptionContainer = styled.div`
  position: relative;
  overflow-y: ${({ expanded }) => (expanded ? "auto" : "hidden")};
  max-height: ${({ expanded }) => (expanded ? "150px" : "50x")};
  transition: max-height 0.3s ease;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  flex-direction: column;
`;

const DescriptionText = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${({ expanded }) => (expanded ? "block" : "-webkit-box")};
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "auto" : "3")};
  // white-space: ${({ expanded }) => (expanded ? "normal" : "break-spaces")};
`;

const ReadMore = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;
const Button = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
`;

const ProjectCard = ({ project, pinned }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      {pinned && <PinnedBadge>📌 Pinned</PinnedBadge>}
      <Image src={project.image} />
      <Tags></Tags>
      <Details>
        <Title>{project.title}</Title>
        <DescriptionContainer expanded={expanded}>
          <DescriptionText expanded={expanded}>
            {project.overview}
          </DescriptionText>
          {!expanded && (
            <ReadMore onClick={() => setExpanded(true)}>Read More</ReadMore>
          )}
          {expanded && (
            <>
              {project.description.slice(1).map((text, index) => (
                <DescriptionText key={index} expanded={expanded}>
                  • {text}
                </DescriptionText>
              ))}
              <ReadMore onClick={() => setExpanded(false)}>Read Less</ReadMore>
            </>
          )}
        </DescriptionContainer>
      </Details>
      {/* <Members>
        {project.member?.map((member) => (
          <Avatar key={member.name} src={member.img} />
        ))}
      </Members> */}
      {project.github && <Button href={project.github} target="_blank">
        View Code
      </Button>}
    </Card>
  );
};

export default ProjectCard;
