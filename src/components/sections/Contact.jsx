import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";
import {
  Send,
  Terminal,
  Language,
  AlternateEmail,
  Hub,
  SyncAlt
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 16px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

const Desc = styled.div`
  font-size: 16px;
  text-align: center;
  max-width: 520px;
  margin: 0 auto 26px auto;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const EndpointTerminal = styled(motion.div)`
  width: 100%;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
`;

const TerminalHeader = styled.div`
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const TerminalTitle = styled.div`
  flex: 1;
  text-align: center;
  font-family: monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const TerminalBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 768px) {
    padding: 18px;
    gap: 14px;
  }
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.code_bg || "#010409"};
  padding: 14px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;

  span.keyword { color: #ff7b72; }
  span.string { color: #79c0ff; }
  span.comment { color: ${({ theme }) => theme.text_secondary}; }
`;

const StatusIndicator = styled.div`
  font-family: monospace;
  font-size: 12px;
  color: #3fb950;
`;

const ConnectionRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const DirectLink = styled.a`
  flex: 1;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 14px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  gap: 8px;

  &:active {
    transform: scale(0.97);
  }
`;

const ProtocolBadge = styled.div`
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const FooterIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  opacity: 0.5;
`;

const Contact = () => {
  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Connect Endpoint</Title>

        <Desc>
          I'm currently open to new opportunities, collaborations, or just a technical chat.
          Initialize a socket connection below.
        </Desc>

        <EndpointTerminal
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <TerminalHeader>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
            <TerminalTitle>
              amaresh-pati --remote /connection
            </TerminalTitle>
            <SyncAlt style={{ color: "#8b949e", fontSize: 16 }} />
          </TerminalHeader>

          <TerminalBody>
            <StatusIndicator>
              HTTP/1.1 200 OK • Listening for Requests
            </StatusIndicator>

            <CodeBlock>
              <span className="comment">{"// Execute connection request"}</span><br />
              <span className="keyword">curl -L </span><span className="string">"https://devvloper.in/sendmail"</span>
            </CodeBlock>

            <ConnectionRow>
              <ProtocolBadge>
                <Language style={{ fontSize: 16 }} />
                SMTP_TLS
              </ProtocolBadge>

              <DirectLink href="/sendmail">
                <AlternateEmail style={{ fontSize: 18 }} />
                Initialize Email Handshake
                <Send style={{ fontSize: 16 }} />
              </DirectLink>
            </ConnectionRow>

            <FooterIcons>
              <Hub style={{ color: "#8b949e", fontSize: 18 }} />
              <Terminal style={{ color: "#8b949e", fontSize: 18 }} />
            </FooterIcons>
          </TerminalBody>
        </EndpointTerminal>
      </Wrapper>
    </Container>
  );
};

export default Contact;