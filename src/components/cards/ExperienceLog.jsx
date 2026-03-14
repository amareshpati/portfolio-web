import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Terminal,
  Code,
  IntegrationInstructions,
  Schedule,
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";

const LogEntry = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 24px;
  width: 100%;
  padding-bottom: 40px;
  
  @media (max-width: 640px) {
    gap: 12px;
    padding-bottom: 32px;
  }
  
  &:last-child {
    padding-bottom: 0;
  }
`;

const TimelineRail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 40px;

  @media (max-width: 640px) {
    width: 24px;
  }
`;

const Node = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ isRecent, theme }) => isRecent ? theme.primary : theme.text_secondary + "40"};
  border: 4px solid ${({ theme }) => theme.card};
  box-shadow: 0 0 15px ${({ isRecent, theme }) => isRecent ? theme.primary + "60" : "transparent"};
  z-index: 2;
  position: relative;

  @media (max-width: 640px) {
    width: 16px;
    height: 16px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ isRecent }) => isRecent ? "40px" : "0px"};
    height: ${({ isRecent }) => isRecent ? "40px" : "0px"};
    background: ${({ theme }) => theme.primary + "20"};
    border-radius: 50%;
    z-index: -1;
    animation: ripple 2s infinite;
  }

  @keyframes ripple {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
  }
`;

const Connector = styled.div`
  flex: 1;
  width: 2px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.text_secondary + "30"},
    ${({ theme }) => theme.text_secondary + "10"}
  );
  margin-top: 4px;
`;

const TerminalCard = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const TerminalHeader = styled.div`
  background: ${({ theme }) => theme.bgLight + "90"};
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
`;

const WindowControls = styled.div`
  display: flex;
  gap: 6px;
  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }
`;

const TerminalStatus = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ isRecent, theme }) => isRecent ? "#27c93f" : theme.text_secondary};
`;

const TerminalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 640px) {
    padding: 16px;
    gap: 12px;
  }
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Role = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const Company = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateRange = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
`;

const LogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LogLine = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text_secondary};
  
  &::before {
    content: '>';
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    font-family: 'Space Mono', monospace;
  }

  @media (max-width: 640px) {
    font-size: 13px;
    gap: 8px;
  }
`;

const TechStripe = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px dashed ${({ theme }) => theme.text_secondary + 25};
`;

const SkillTag = styled.span`
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.card_light};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary + 15};
  border-radius: 4px;

  @media (max-width: 640px) {
    padding: 3px 8px;
  }
`;

const ReadMoreButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  margin-top: 8px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    filter: brightness(1.2);
  }
`;

const ExperienceLog = ({ experience, index, total }) => {
  const [expanded, setExpanded] = React.useState(index === 0);
  const isRecent = index === 0;
  
  const descriptionLines = experience.desc || [];
  const showReadMore = descriptionLines.length > 2;
  const displayedLines = expanded ? descriptionLines : descriptionLines.slice(0, 2);

  return (
    <LogEntry
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TimelineRail>
        <Node isRecent={isRecent} />
        {index !== total - 1 && <Connector />}
      </TimelineRail>

      <TerminalCard>
        <TerminalHeader>
          <WindowControls>
            <div className="red" />
            <div className="yellow" />
            <div className="green" />
          </WindowControls>
          <TerminalStatus isRecent={isRecent}>
            {isRecent ? <CheckCircle style={{ fontSize: 14 }} /> : <Schedule style={{ fontSize: 14 }} />}
            {isRecent ? "RUNNING_INSTANCE" : "STABLE_BUILD"}
          </TerminalStatus>
        </TerminalHeader>

        <TerminalBody>
          <RoleInfo>
            <DateRange>
              <Terminal style={{ fontSize: 14 }} />
              v{total - index}.0.0 • {experience.date}
            </DateRange>
            <Role>{experience.role}</Role>
            <Company>
              <IntegrationInstructions style={{ fontSize: 18 }} />
              {experience.company}
            </Company>
          </RoleInfo>

          <LogGrid>
            <AnimatePresence mode="wait">
              <motion.div
                key={expanded ? "full" : "collapsed"}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden", display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {displayedLines.map((line, i) => (
                  <LogLine key={i}>{line}</LogLine>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {showReadMore && (
              <ReadMoreButton onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <>LESS_INFO <KeyboardArrowUp style={{ fontSize: 16 }} /></>
                ) : (
                  <>MORE_INFO <KeyboardArrowDown style={{ fontSize: 16 }} /></>
                )}
              </ReadMoreButton>
            )}
          </LogGrid>

          {experience.skills && (
            <TechStripe>
              <Code style={{ fontSize: 16, color: 'var(--primary)' }} />
              {experience.skills.map((skill, i) => (
                <SkillTag key={i}>{skill}</SkillTag>
              ))}
            </TechStripe>
          )}
        </TerminalBody>
      </TerminalCard>
    </LogEntry>
  );
};

export default ExperienceLog;
