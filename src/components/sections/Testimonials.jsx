import React from "react";
import styled from "styled-components";
import { testimonials } from "../../data/constants";
import PeerReview from "../cards/PeerReview";
import {
  Security,
  FactCheck,
  AssignmentInd
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 34px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 30px;
  }
`;

const IntegrityHeader = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.card + "40"};
  border: 1px solid ${({ theme }) => theme.text_secondary + 25};
  border-radius: 12px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 16px;
  }
`;

const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;

  span {
    color: #27c93f;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SecondaryStatusItem = styled(StatusItem)`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
  font-weight: 400;
`;

const ReviewThread = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimelineLine = styled.div`
  width: 2px;
  height: 26px;
  background: ${({ theme }) => theme.text_secondary + 20};

  @media (max-width: 768px) {
    height: 20px;
  }
`;

const Testimonials = () => {
  return (
    <Container id="Testimonials">
      <Wrapper>
        <Title>Peer Validation</Title>
        <Desc>
          Verified technical feedback and code review approvals from
          cross-functional team members and stakeholders.
        </Desc>

        <IntegrityHeader>
          <StatusGroup>
            <StatusItem>
              <Security style={{ fontSize: 18, color: '#27c93f' }} />
              System Integrity: <span>ACTIVE</span>
            </StatusItem>

            <StatusItem>
              <FactCheck style={{ fontSize: 18, color: 'var(--primary)' }} />
              Approvals: <span>{testimonials.length} Merged</span>
            </StatusItem>
          </StatusGroup>

          <SecondaryStatusItem>
            <AssignmentInd style={{ fontSize: 18 }} />
            Signed by peers
          </SecondaryStatusItem>
        </IntegrityHeader>

        <ReviewThread>
          {testimonials.map((testimonial, index) => (
            <React.Fragment key={testimonial.id}>
              <PeerReview
                testimonial={testimonial}
                index={index}
              />
              {index !== testimonials.length - 1 && <TimelineLine />}
            </React.Fragment>
          ))}
        </ReviewThread>
      </Wrapper>
    </Container>
  );
};

export default Testimonials;