import * as React from "react";
import { Typography, Button, Input } from "antd";
import { FaCode } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../_reducer";
import { ComponentsProps } from "../../../hoc/auth";
import { useInput } from "../LoginPage/LoginPage";

const Content = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const UploadProductPage: React.FC<ComponentsProps> = props => {
  const [title, onChangeTitle] = useInput("");
  const [text, onChangeText] = useInput("");
  const [price, onChangePrice] = useInput(0);
  const { me } = useSelector((state: RootState) => state.user);
  const { Title } = Typography;
  const { TextArea } = Input;

  React.useEffect(() => {
    if (me?.isAuth === false) {
      props.history.push("/");
    }
  }, [me && me.isAuth]);

  return (
    <Content>
      <TitleContainer>
        <Title level={2}> Upload Travel Product</Title>
      </TitleContainer>

      <form>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onChangeText} value={text} />
        <br />
        <br />
        <label>Price($)</label>
        <Input type='number' onChange={onChangePrice} value={price} />
        <br />
        <br />
        <select></select>
        <br />
        <br />

        <Button>Submit</Button>
      </form>
    </Content>
  );
};

export default UploadProductPage;
