import * as React from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../_reducer";
import { LOAD_MAIN_POSTS_REQUEST } from "../../../_reducer/post";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state: RootState) => state.post);
  React.useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
  }, []);

  return (
    <Main>
      <FaCode style={{ fontSize: "4rem" }} />
      <br />
      <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
    </Main>
  );
};

export default LandingPage;
