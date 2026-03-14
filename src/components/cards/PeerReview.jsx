import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ChatBubbleOutline,
  ThumbUpAltOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";

const ReviewCard = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const CardHeader = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.bgLight + "80"};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 15};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.primary + 50};
  background: #000;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const UserRole = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ReviewStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #27c93f;
  background: #27c93f15;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid #27c93f40;
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const CommentQuote = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    left: -15px;
    top: -10px;
    font-size: 40px;
    color: ${({ theme }) => theme.primary + 20};
    font-family: serif;
  }
`;

const CardFooter = styled.div`
  padding: 12px 20px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + 10};
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: default;
  
  svg {
    font-size: 16px;
  }
`;

const PeerReview = ({ testimonial, index }) => {
  return (
    <ReviewCard
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <CardHeader>
        <UserInfo>
          <Avatar src={testimonial.img} alt={testimonial.name} />
          <UserText>
            <UserName>{testimonial.name}</UserName>
            <UserRole>{testimonial.role}</UserRole>
          </UserText>
        </UserInfo>
        <ReviewStatus>
          <CheckCircle style={{ fontSize: 14 }} /> Approved
        </ReviewStatus>
      </CardHeader>

      <CardBody>
        <CommentQuote>
          {testimonial.desc}
        </CommentQuote>
      </CardBody>

      <CardFooter>
        <ActionItem>
          <ThumbUpAltOutlined /> 1
        </ActionItem>
        <ActionItem>
          <ChatBubbleOutline /> 0 comments
        </ActionItem>
        <ActionItem style={{ marginLeft: 'auto' }}>
          <VerifiedUserOutlined style={{ color: '#27c93f' }} /> Verified Peer
        </ActionItem>
      </CardFooter>
    </ReviewCard>
  );
};

export default PeerReview;
