import styled, { keyframes } from "styled-components";
import { skills, Bio } from "../../data/constants";
import { Tilt } from "react-tilt";

/* ─── Animations ──────────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Layout ──────────────────────────────────────────────────── */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 0 16px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

/* ─── Header ──────────────────────────────────────────────────── */
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 48px;
  max-width: 560px;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 32px;
  }
`;

/* ─── Grid ────────────────────────────────────────────────────── */
const SkillsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
  align-items: stretch;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

/* ─── Card ────────────────────────────────────────────────────── */
const CardOuter = styled.div`
  animation: ${fadeUp} 0.5s ease both;
  animation-delay: ${({ delay }) => delay}ms;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + "33"};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(133, 76, 230, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(133, 76, 230, 0.22);
    border-color: ${({ theme }) => theme.primary + "88"};
  }
`;

/* Coloured gradient banner at the top of each card */
const CardHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary + "22"} 0%,
    ${({ theme }) => theme.primary + "08"} 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.primary + "22"};
  padding: 20px 24px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CategoryIcon = styled.span`
  font-size: 24px;
  line-height: 1;
  flex-shrink: 0;
`;

const SkillTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: 0.2px;
`;

/* ─── Skill Badges ────────────────────────────────────────────── */
const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px 20px 22px;
`;

const SkillItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme }) => theme.primary + "12"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  border-radius: 50px;
  padding: 6px 14px 6px 8px;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.primary + "28"};
    border-color: ${({ theme }) => theme.primary + "70"};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 5px 12px 5px 7px;
  }
`;

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
`;

/* Map category titles → emoji icons */
const CATEGORY_ICONS = {
  "Application Development": "📱",
  "Backend & Database": "🗄️",
  "DevOps & Cloud": "☁️",
  "Web Development": "🌐",
  "Operating Systems": "🖥️",
  "Tools & Others": "🛠️",
};

const Skills = () => {
  return (
    <Container id="Skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working on for the
          past {Bio.experienceYears} years.
        </Desc>

        <SkillsGrid>
          {skills.map((skill, index) => (
            <Tilt key={`skill-${index}`} options={{ max: 8, scale: 1.01, speed: 400 }} style={{ height: "100%" }}>
              <CardOuter delay={index * 60}>
                <Card>
                  <CardHeader>
                    <CategoryIcon>
                      {CATEGORY_ICONS[skill.title] ?? "⚙️"}
                    </CategoryIcon>
                    <SkillTitle>{skill.title}</SkillTitle>
                  </CardHeader>

                  <SkillList>
                    {skill.skills.map((item, idx) => (
                      <SkillItem key={`skill-x-${idx}`}>
                        <SkillImage src={item.image} alt={item.name} />
                        {item.name}
                      </SkillItem>
                    ))}
                  </SkillList>
                </Card>
              </CardOuter>
            </Tilt>
          ))}
        </SkillsGrid>
      </Wrapper>
    </Container>
  );
};

export default Skills;
