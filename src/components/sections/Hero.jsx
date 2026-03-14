import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImg from "../../images/HeroImage.png";
import HeroBgAnimation from "../HeroBgAnimation";
import { motion } from "framer-motion";
import {
  Terminal,
  Code,
  DataObject,
  Storage,
  InsertDriveFile
} from "@mui/icons-material";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 100px 30px;
  z-index: 1;
  background-attachment: fixed;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 60px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  flex: 1.2;
  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const IDEWindow = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card + "cc"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const IDEToolbar = styled.div`
  background: ${({ theme }) => theme.bgLight + "90"};
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
`;

const IDEControls = styled.div`
  display: flex;
  gap: 6px;
  div {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27c93f; }
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  font-family: 'Space Mono', monospace;
`;

const EditorContainer = styled.div`
  display: flex;
  padding: 24px 0;
  font-family: 'Space Mono', monospace;
`;

const LineNumbers = styled.div`
  padding: 0 16px;
  text-align: right;
  color: ${({ theme }) => theme.text_secondary + 40};
  font-size: 14px;
  user-select: none;
  border-right: 1px solid ${({ theme }) => theme.text_secondary + 10};

  @media (max-width: 640px) {
    padding: 0 8px;
    font-size: 12px;
  }
`;

const CodeArea = styled.div`
  padding: 0 24px;
  flex: 1;

  @media (max-width: 640px) {
    padding: 0 12px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 48px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 8px;
  
  span.keyword { color: ${({ theme }) => theme.text_primary}; }
  
  @media (max-width: 960px) {
    font-size: 36px;
    text-align: left;
  }

  @media (max-width: 640px) {
    font-size: 28px;
    span.last-name { display: none; }
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 24px;

  span.const { color: #d2a8ff; }
  span.variable { color: #79c0ff; }
  
  .typewriter-code {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 960px) {
    font-size: 20px;
  }

  @media (max-width: 640px) {
    font-size: 16px;
    gap: 8px;
    min-height: 48px;
  }
`;

const Comment = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 20px;
  white-space: pre-line;
  
  &::before { content: '/**'; display: block; }
  &::after { content: ' */'; display: block; }

  @media (max-width: 640px) {
    font-size: 14px;
    line-height: 22px;
    word-break: break-word;
  }
`;

const ImpactStats = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight + "50"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 15};
  border-radius: 8px;
  padding: 16px 24px;
  gap: 32px;
  margin-top: 32px;
  width: fit-content;

  @media (max-width: 960px) {
    margin: 32px auto 0;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
    padding: 12px 16px;
    width: 100%;
    margin: 24px 0 0;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const ResumeButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  width: fit-content;
  padding: 14px 28px;
  background: ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  transition: all 0.3s;
  margin-top: 32px;
  box-shadow: 0 10px 20px ${({ theme }) => theme.primary + 50};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px ${({ theme }) => theme.primary + 70};
    filter: brightness(1.1);
  }

  @media (max-width: 960px) {
    margin: 32px auto 0;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  flex: 0.8;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const ViewportWindow = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 50px 100px rgba(0,0,0,0.6);

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ViewportHeader = styled.div`
  background: ${({ theme }) => theme.bgLight};
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-family: inherit;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4/5;
  position: relative;
  background: #111;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: grayscale(100%);
  opacity: 0.7;
`;

const ColorImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  mask-image: radial-gradient(
    circle 120px at var(--mouse-x, -100%) var(--mouse-y, -100%),
    black 20%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle 120px at var(--mouse-x, -100%) var(--mouse-y, -100%),
    black 20%,
    transparent 100%
  );
  pointer-events: none;
`;

const InteractiveImage = ({ src, alt }) => {
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--mouse-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--mouse-y", `${clientY - top}px`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--mouse-x", `-100%`);
    e.currentTarget.style.setProperty("--mouse-y", `-100%`);
  };

  return (
    <ViewportWindow>
      <ViewportHeader>
        <span>Preview: developer_profile.png</span>
        <Storage style={{ fontSize: 16 }} />
      </ViewportHeader>
      <ImageWrapper onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <BaseImage src={src} alt={alt} />
        <ColorImage src={src} alt={alt} />
      </ImageWrapper>
    </ViewportWindow>
  );
};

const HeroBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: 0;
  opacity: 0.4;
`;

const Hero = () => {
  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <IDEWindow>
                <IDEToolbar>
                  <IDEControls>
                    <div className="red" />
                    <div className="yellow" />
                    <div className="green" />
                  </IDEControls>
                  <FileName>
                    <InsertDriveFile style={{ fontSize: 14 }} />
                    DeveloperProfile.jsx
                  </FileName>
                </IDEToolbar>

                <EditorContainer>
                  <LineNumbers>
                    {Array.from({ length: 14 }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </LineNumbers>

                  <CodeArea>
                    <motion.div {...headTextAnimation}>
                      <Title>
                        <span className="keyword">Hi, I am</span> <br />
                        {Bio.name.split(' ')[0]} <span className="last-name">{Bio.name.split(' ').slice(1).join(' ')}</span>
                      </Title>

                      <TextLoop>
                        <span className="const">const</span>
                        <span className="variable">roles</span> = [
                        <Typewriter
                          options={{
                            strings: Bio.roles,
                            autoStart: true,
                            loop: true,
                            wrapperClassName: "typewriter-code"
                          }}
                        />
                        ];
                      </TextLoop>
                    </motion.div>

                    <motion.div {...headContentAnimation}>
                      <Comment>
                        {Bio.description}
                      </Comment>
                    </motion.div>

                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <ResumeButton href={Bio.resume} download target="_blank">
                        <Terminal style={{ fontSize: 20 }} />
                        GET_RESUME.sh
                      </ResumeButton>
                    </div>

                    <motion.div {...headContentAnimation}>
                      <ImpactStats>
                        {Bio.impactStats.map((stat, index) => (
                          <StatItem key={index}>
                            <StatHeader>
                              {index === 0 ? <DataObject style={{ fontSize: 14 }} /> : <Code style={{ fontSize: 14 }} />}
                              {stat.label}
                            </StatHeader>
                            <StatValue>{stat.value}</StatValue>
                          </StatItem>
                        ))}
                      </ImpactStats>
                    </motion.div>
                  </CodeArea>
                </EditorContainer>
              </IDEWindow>
            </HeroLeftContainer>

            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <InteractiveImage src={HeroImg} alt={Bio.name} />
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
