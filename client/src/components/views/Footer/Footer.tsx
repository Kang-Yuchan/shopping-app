import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import styled from "styled-components";

const FooterBox = styled.div`
  display: flex;
  height: 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterBox>
      <p>
        {" "}
        Happy Coding <SmileOutlined />
      </p>
    </FooterBox>
  );
};

export default Footer;
