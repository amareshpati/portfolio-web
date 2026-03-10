import React, { useState } from "react";
import PropTypes from "prop-types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import styled, { useTheme } from "styled-components";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Role = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  margin-bottom: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  margin-top: -10px;
`;
const Span = styled.div`
  display: -webkit-box;
  max-width: 100%;
`;

const Skill = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 99};
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ReadMoreButton = styled.button`
  font-size: 14px;
  color: ${({ theme }) => theme?.text_primary || "#007BFF"};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: ${({ theme }) => theme?.text_secondary || "#0056b3"};
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ExperienceCard = ({ experience }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={experience?.company}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={experience?.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: theme.card,
        color: theme.text_primary,
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: theme.card,
        border: `1px solid ${theme.primary + 80}`,
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${theme.card}`,
      }}
      date={experience?.date}
    >
      <Top>
        <Image src={experience?.img} />
        <Body>
          <Role>{experience?.role}</Role>
          <Company>{experience?.company}</Company>
          <Date>{experience?.date}</Date>
        </Body>
      </Top>
      <Description>
        {experience?.desc && (
          <>
            <Skills>
              <ItemWrapper>
                {(showMore ? experience.desc : experience.desc.slice(0, 2)).map(
                  (point, index) => (
                    <Span key={index}>• {point}</Span>
                  )
                )}
              </ItemWrapper>
            </Skills>
            {experience.desc.length > 2 && (
              <ButtonWrapper>
                <ReadMoreButton onClick={() => setShowMore(!showMore)}>
                  {showMore ? "Show Less" : "Read More"}
                </ReadMoreButton>
              </ButtonWrapper>
            )}
            <br />
          </>
        )}
        {experience?.skills && (
          <>
            <br />
            <Skills>
              <b>Skills</b>
              <ItemWrapper>
                {experience?.skills?.map((skill, index) => (
                  <Skill key={index}>• {skill}</Skill>
                ))}
              </ItemWrapper>
            </Skills>
          </>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
