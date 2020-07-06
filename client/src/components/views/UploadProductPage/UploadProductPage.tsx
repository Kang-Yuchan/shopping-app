import * as React from "react";
import { FaCode } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../_reducer";
import { ComponentsProps } from "../../../hoc/auth";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const UploadProductPage: React.FC<ComponentsProps> = props => {
  const { me } = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (me?.isAuth === false) {
      props.history.push("/");
    }
  }, [me && me.isAuth]);

  return (
    <Main>
      <FaCode style={{ fontSize: "4rem" }} />
      <br />
      <span style={{ fontSize: "2rem" }}>Let's Start Coding!</span>
    </Main>
  );
};

export default UploadProductPage;
