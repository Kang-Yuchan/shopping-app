import * as React from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LandingPage: React.FC = () => {
  return (
    <Main>
      <div className='app'>
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
      </div>
      <div style={{ float: "right" }}>
        Thanks For Using This Boiler Plate by Kang yuchan
      </div>
    </Main>
  );
};

export default LandingPage;
