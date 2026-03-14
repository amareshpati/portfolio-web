import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import BlogImg from "../../images/blog_preview.png";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { headContentAnimation, headTextAnimation } from "../../utils/motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  margin-top: 50px;
  padding: 40px 16px;
  @media (max-width: 960px) {
    padding: 30px 16px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  max-width: 1100px;
  gap: 40px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid ${({ theme }) => theme.primary};
  border-radius: 16px;
  padding: 40px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 32px;
    gap: 24px;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;

  @media (max-width: 960px) {
    align-items: center;
    text-align: center;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 960px) {
    justify-content: center;
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: left;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text_primary};
  
  @media (max-width: 768px) {
    text-align: center;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: left;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 32px;
  line-height: 1.5;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 16px;
    margin-bottom: 24px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.primary + 50};

  @media (max-width: 960px) {
    max-width: 100%;
  }
`;

const VisitButton = styled.a`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  padding: 14px 34px;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  border-radius: 50px;
  font-weight: 600;
  font-size: 18px;
  color: white;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 15px ${({ theme }) => theme.primary + 40};

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0px 8px 25px ${({ theme }) => theme.primary + 60};
    filter: brightness(1.1);
  }

  @media (max-width: 640px) {
    padding: 12px 28px;
    font-size: 16px;
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const BlogPreview = () => {
  return (
    <Container id="Blog">
      <motion.div style={{ width: "100%", display: "flex", justifyContent: "center" }} {...headTextAnimation}>
        <Wrapper>
          <ContentSection>
            <Title>
              Explore My <Highlight>Blog</Highlight>
            </Title>
            <Desc>
              I regularly write articles on modern mobile app development, software engineering patterns,
              web development, and my experiences solving real-world challenges. Check out
              my latest insights and tutorials!
            </Desc>
            <VisitButton href={Bio.blogs} target="_blank" rel="noopener noreferrer">
              Visit Blogs Site
            </VisitButton>
          </ContentSection>

          <ImageSection>
            <Tilt
              options={{
                max: 15,
                scale: 1.02,
                speed: 400,
                glare: true,
                "max-glare": 0.2
              }}
            >
              <StyledImage src={BlogImg} alt="Blog Preview" />
            </Tilt>
          </ImageSection>
        </Wrapper>
      </motion.div>
    </Container>
  );
};

export default BlogPreview;
