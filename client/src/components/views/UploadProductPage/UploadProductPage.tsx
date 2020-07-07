import * as React from "react";
import { Typography, Button, Input } from "antd";
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
const { Title } = Typography;
const { TextArea } = Input;

const SelectOptions: Array<{ key: number; value: string }> = [
  {
    key: 1,
    value: "Mouse"
  },
  {
    key: 2,
    value: "Keyboard"
  },
  {
    key: 3,
    value: "Mouse Pad"
  },
  {
    key: 4,
    value: "Monitor"
  },
  {
    key: 5,
    value: "Audio"
  }
];

const UploadProductPage: React.FC<ComponentsProps> = props => {
  const [title, onChangeTitle] = useInput("");
  const [text, onChangeText] = useInput("");
  const [price, onChangePrice] = useInput(0);
  const [option, onChangeOption] = useInput(0);
  const { me } = useSelector((state: RootState) => state.user);

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
        <select onChange={onChangeOption} value={option}>
          {SelectOptions.map(item => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button>Submit</Button>
      </form>
    </Content>
  );
};

export default UploadProductPage;
