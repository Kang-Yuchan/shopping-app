import * as React from "react";
import { Typography, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../_reducer";
import { ComponentsProps } from "../../../hoc/auth";
import { useInput } from "../LoginPage/LoginPage";
import FileUpload from "../../utils/FileUpload";
import { ADD_POST_REQUEST, ImageType } from "../../../_reducer/post";

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
  const [description, onChangeDescription] = useInput("");
  const [price, onChangePrice] = useInput(0);
  const [option, onChangeOption] = useInput("Mouse");
  const [user, setUser] = React.useState<any | string>("");
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const { imagePaths } = useSelector((state: RootState) => state.post);

  React.useEffect(() => {
    setUser(me?._id);
    if (me?.isAuth === false) {
      props.history.push("/");
    }
  }, [me && me.isAuth]);

  const onSubmit = React.useCallback(
    async e => {
      e.preventDefault();
      try {
        dispatch({
          type: ADD_POST_REQUEST,
          data: {
            writer: user,
            images: imagePaths,
            title,
            description,
            price,
            option
          }
        });
        alert("상품 업로드에 성공했습니다.");
        props.history.push("/");
      } catch (err) {
        console.log(err);
        alert("상품 업로드에 실패했습니다.");
      }
    },
    [title, me, imagePaths, description, price, option]
  );

  return (
    <Content>
      <TitleContainer>
        <Title level={2}> Upload Gaming Gear </Title>
      </TitleContainer>

      <form onSubmit={onSubmit}>
        <FileUpload />
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onChangeDescription} value={description} />
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

        <Button htmlType='submit'>Submit</Button>
      </form>
    </Content>
  );
};

export default UploadProductPage;
