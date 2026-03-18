import styled from "styled-components";
import { Bio } from "../../data/constants";
import { motion } from "framer-motion";
import {
  MenuBook,
  FolderOpen,
  Article,
  Launch,
  History
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px;
`;

const WikiContainer = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  background: ${({ theme }) => theme.bgLight + "80"};
  border-right: 1px solid ${({ theme }) => theme.text_secondary + 20};
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  
  @media (max-width: 960px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
    padding: 20px;
  }
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarTitle = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${({ active, theme }) => active ? theme.primary : theme.text_secondary};
  cursor: pointer;
  transition: all 0.2s;
  padding: 6px 12px;
  border-radius: 6px;
  background: ${({ active, theme }) => active ? theme.primary + 10 : "transparent"};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 5};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.card};
`;

const ContentHeader = styled.div`
  padding: 16px 32px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 640px) {
    padding: 16px 20px;
  }
`;

const Breadcrumbs = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  span { color: ${({ theme }) => theme.primary}; }
`;

const ContentBody = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '#';
    color: ${({ theme }) => theme.primary + 80};
    font-weight: 400;
  }
  
  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: -8px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const PreviewStage = styled.div`
  width: 100%;
  height: 350px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.1);
`;

const StyledIframe = styled.iframe`
  width: 200%;
  height: 200%;
  border: none;
  transform: scale(0.5);
  transform-origin: 0 0;
  opacity: 0.9;
  filter: grayscale(0.2);
  transition: all 0.3s;
  
  &:hover {
    opacity: 1;
    filter: none;
  }
`;

const FloatingAction = styled.a`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px ${({ theme }) => theme.primary + 40};
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px ${({ theme }) => theme.primary + 60};
  }
`;

const TagGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  background: ${({ theme }) => theme.primary + 10};
  color: ${({ theme }) => theme.primary};
  border-radius: 4px;
  font-weight: 600;
`;

const BlogPreview = () => {
  return (
    <Container id="Blog">
      <WikiContainer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>
              <FolderOpen style={{ fontSize: 16 }} /> Knowledge Base
            </SidebarTitle>
            <NavLink active>
              <Article style={{ fontSize: 18 }} /> Overview.md
            </NavLink>
            <NavLink>
              <History style={{ fontSize: 18 }} /> Recent_Snippets
            </NavLink>
          </SidebarSection>

          {/* <SidebarSection>
            <SidebarTitle>
              <Label style={{ fontSize: 16 }} /> TOPICS
            </SidebarTitle>
            <NavLink># React_Native</NavLink>
            <NavLink># System_Design</NavLink>
            <NavLink># DevOps_Logs</NavLink>
            <NavLink># Web_Eng</NavLink>
          </SidebarSection> */}
        </Sidebar>

        <MainContent>
          <ContentHeader>
            <Breadcrumbs>
              amareshpati / <span>technical-docs</span> / overview.md
            </Breadcrumbs>
            <MetaItem>
              <History style={{ fontSize: 16 }} /> Last updated today
            </MetaItem>
          </ContentHeader>

          <ContentBody>
            <Title>Engineering Insights</Title>

            <MetaRow>
              <MetaItem>
                <MenuBook style={{ fontSize: 18 }} /> 15+ Articles
              </MetaItem>
              <TagGrid>
                <Tag>Tutorials</Tag>
                <Tag>Architectural Patterns</Tag>
              </TagGrid>
            </MetaRow>

            <Desc>
              A curated collection of deep-dives into modern software engineering.
              From optimizing React Native bridge performance to managing scalable
              multi-cloud infrastructures. I share high-frequency updates on my latest
              technical discoverings and problem-solving strategies.
            </Desc>

            <PreviewStage>
              <StyledIframe
                src={Bio.blogs}
                title="Blog Live Discovery"
                loading="lazy"
              />
              <FloatingAction href={Bio.blogs} target="_blank">
                Explore <Launch style={{ fontSize: 18 }} />
              </FloatingAction>
            </PreviewStage>
          </ContentBody>
        </MainContent>
      </WikiContainer>
    </Container>
  );
};

export default BlogPreview;
