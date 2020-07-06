import * as React from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LandingPage: React.FC = () => {
  return (
    <Main>
      <FaCode style={{ fontSize: "4rem" }} />
      <br />
      <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
    </Main>
  );
};

export default LandingPage;
