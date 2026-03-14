import React from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
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
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmailContainer = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.primary + 80};
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const EmailLink = styled.a`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Contact = () => {
  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact Me</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to me directly by emailing me below!
        </Desc>
        <EmailContainer>
          <ContactTitle>My Email Address:</ContactTitle>
          <EmailLink href={`mailto:${Bio.email}`}>
            {Bio.email}
          </EmailLink>
        </EmailContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;
