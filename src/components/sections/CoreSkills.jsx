import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import styled from "styled-components";
import { coreSkills } from "../../data/constants";
import { motion } from "framer-motion";

// ─── Styled Components (unchanged) ───────────────────────────────────────────

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 20px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
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
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 80px;
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const TreeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 960px) {
    align-items: flex-start;
  }
`;

const TrunkSVG = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  overflow: visible;
  @media (max-width: 960px) {
    left: 20px;
    transform: none;
    width: 40px;
  }
`;

const BranchGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 50px 0;
  @media (max-width: 960px) {
    padding-left: 0;
    gap: 40px;
  }
`;

const BranchRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ $side }) => ($side === "left" ? "flex-end" : "flex-start")};
  padding-${({ $side }) => ($side === "left" ? "right" : "left")}: 50%;
  position: relative;
  @media (max-width: 960px) {
    justify-content: flex-start;
    padding: 0;
    margin-left: 23px;
    width: calc(100% - 23px);
    margin-bottom: 40px;
  }
`;

const BranchCurve = styled.svg`
  position: absolute;
  top: 0;
  ${({ $side }) => ($side === "left" ? "right: 50%" : "left: 50%")};
  width: 150px;
  height: 80px;
  z-index: 1;
  overflow: visible;
  ${({ $side, $idx }) => {
    const isSegment1 = $idx < 2;
    const offset = 12;
    const currentOffset = isSegment1 ? offset : -offset;
    if ($side === "right") return `margin-left: ${currentOffset}px;`;
    return `margin-right: ${-currentOffset}px;`;
  }}
  @media (max-width: 960px) {
    left: 0;
    width: 65px;
    height: 60px;
    top: 5px;
    ${({ $idx }) => {
    const isSegment1 = $idx < 2;
    const offset = isSegment1 ? 11 : -1;
    return `margin-left: ${offset}px;`;
  }}
  }
`;

const SkillCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: ${({ $side }) => ($side === "left" ? "flex-end" : "flex-start")};
  gap: 20px;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  padding: 0 60px;
  @media (max-width: 960px) {
    align-items: flex-start;
    padding: 0 0 0 60px;
    max-width: 100%;
  }
`;

const BranchLabel = styled(motion.div)`
  font-family: 'Space Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color + "15"};
  border: 1px solid ${({ $color }) => $color + "40"};
  padding: 8px 18px;
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 16px;
  }
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    box-shadow: 0 0 10px ${({ $color }) => $color};
    display: block;
  }
`;

const NodesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: ${({ $side }) => ($side === "left" ? "flex-end" : "flex-start")};
  @media (max-width: 960px) {
    justify-content: flex-start;
  }
`;

// FIX 4: Removed conflicting inline transform from &:hover.
// Framer Motion owns the transform property; CSS &:hover fighting it
// causes jank. Use whileHover on the motion component instead.
const CommitNode = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => (theme.bg === "#090917" ? "rgba(23, 23, 33, 0.9)" : "#fff")};
  border: 1px solid ${({ $color }) => $color + "40"};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &:hover {
    border-color: ${({ $color }) => $color};
    box-shadow: 0 0 25px ${({ $color }) => $color + "50"};
  }
  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    border-radius: 10px;
  }
`;

const SkillLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// ─── Static data outside component (FIX 2 partial) ───────────────────────────
// Category metadata never changes — define it once at module level.
const CATEGORY_META = [
  { name: "feature/mobile-frameworks", color: "#61DAFB", side: "right" },
  { name: "hotfix/backend-ecosystem", color: "#4CAF50", side: "left" },
  { name: "release/cloud-native", color: "#FF9800", side: "right" },
  { name: "feat/developer-toolkit", color: "#E91E63", side: "left" },
];

// ─── Static animation variant objects (FIX 3) ────────────────────────────────
// Defined outside the component so they're never recreated on re-render.
const TRUNK_ANIM = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.5, ease: "easeInOut" },
};

const buildCardAnim = (side, isMobile) => ({
  initial: { opacity: 0, x: isMobile ? 20 : side === "right" ? 40 : -40, y: 10 },
  whileInView: { opacity: 1, x: 0, y: 0 },
});

const buildNodeAnim = (side, isMobile) => ({
  initial: { opacity: 0, scale: 0, x: isMobile ? -15 : side === "left" ? 20 : -20, y: 10 },
  whileInView: { opacity: 1, scale: 1, x: 0, y: 0 },
});

// ─── Memoised sub-component (FIX 5) ──────────────────────────────────────────
// Wrapping the nodes list prevents it re-rendering when only the parent
// isMobile state flips (e.g. on resize) if skills/side/color haven't changed.
const SkillNodes = memo(({ skills, side, color, catIdx, isMobile }) => {
  const nodeAnim = buildNodeAnim(side, isMobile);
  return (
    <NodesContainer $side={side}>
      {skills.map((skill, sIdx) => {
        const totalSkills = skills.length;
        const outwardIndex =
          side === "left" && !isMobile ? totalSkills - 1 - sIdx : sIdx;

        return (
          <CommitNode
            key={skill.name}
            $color={color}
            // FIX 4: whileHover handled by Framer Motion, no CSS transform conflict
            whileHover={{ y: -8, scale: 1.1 }}
            initial={nodeAnim.initial}
            whileInView={nodeAnim.whileInView}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: catIdx * 0.15 + 0.4 + outwardIndex * 0.05,
            }}
            title={skill.name}
          >
            <SkillLogo src={skill.img} alt={skill.name} loading="lazy" />
          </CommitNode>
        );
      })}
    </NodesContainer>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
const CoreSkills = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 960);

  // FIX 1: Debounced resize handler — avoids setState on every pixel of drag.
  useEffect(() => {
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth <= 960);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // FIX 2: Merge static meta with dynamic coreSkills data once, not every render.
  const categories = useMemo(
    () => CATEGORY_META.map((meta, i) => ({ ...meta, skills: coreSkills[i] })),
    [] // coreSkills is a module-level constant — safe empty dep array
  );

  const trunkPath = isMobile
    ? "M 20 0 Q 35 200, 20 400 T 20 800"
    : "M 50 0 Q 80 200, 50 400 T 50 800";

  const getBranchPath = useCallback(
    (side) =>
      isMobile
        ? "M 0 20 C 30 20, 60 40, 150 40"
        : side === "right"
          ? "M 0 20 C 40 20, 60 60, 150 60"
          : "M 150 20 C 110 20, 90 60, 0 60",
    [isMobile]
  );

  return (
    <Container id="Skills">
      <Wrapper>
        <Title>Technical Ecosystem</Title>
        <Desc>
          An organic, version-controlled hierarchy of technologies branched from
          the core of my expertise.
        </Desc>

        <TreeContainer>
          <TrunkSVG viewBox="0 0 100 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-color, #854CE6)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--primary-color, #854CE6)" stopOpacity="1" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d={trunkPath}
              fill="none"
              stroke="url(#trunkGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow)"
              viewport={{ once: true }}
              {...TRUNK_ANIM}
            />
          </TrunkSVG>

          <BranchGroup>
            {categories.map((cat, idx) => {
              const cardAnim = buildCardAnim(cat.side, isMobile);
              const circleX = isMobile ? 0 : cat.side === "right" ? 0 : 150;

              return (
                <BranchRow key={cat.name} $side={cat.side}>
                  <BranchCurve $side={cat.side} $idx={idx} viewBox="0 0 150 80">
                    <motion.path
                      d={getBranchPath(cat.side)}
                      fill="none"
                      stroke={cat.color}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="300"
                      strokeDashoffset="300"
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                    />
                    <motion.circle
                      cx={circleX}
                      cy="20"
                      r="6"
                      fill={cat.color}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                    />
                  </BranchCurve>

                  <SkillCard
                    $side={cat.side}
                    initial={cardAnim.initial}
                    whileInView={cardAnim.whileInView}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 + 0.3 }}
                  >
                    <BranchLabel $color={cat.color}>{cat.name}</BranchLabel>

                    <SkillNodes
                      skills={cat.skills}
                      side={cat.side}
                      color={cat.color}
                      catIdx={idx}
                      isMobile={isMobile}
                    />
                  </SkillCard>
                </BranchRow>
              );
            })}
          </BranchGroup>
        </TreeContainer>
      </Wrapper>
    </Container>
  );
};

export default CoreSkills;