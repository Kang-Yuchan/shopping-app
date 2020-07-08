import * as React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from "../../_reducer/post";
import { RootState } from "../../_reducer";
import { ImageType } from "../../_reducer/post";

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DropContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
`;

const PlusIcon = styled(PlusOutlined)`
  font-size: 3rem;
`;

const ImagesContent = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Image = styled.img`
  width: 300px;
  height: 240px;
  min-width: 300px;
`;

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state: RootState) => state.post);

  const onDropFiles = React.useCallback((files: Array<any>) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: formData
    });
  }, []);

  const deleteImage = (image: ImageType) => {
    const index = imagePaths.indexOf(image);
    dispatch({
      type: REMOVE_IMAGE,
      index
    });
  };

  return (
    <Content>
      <Dropzone onDrop={onDropFiles}>
        {({ getRootProps, getInputProps }) => (
          <DropContent {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusIcon />
          </DropContent>
        )}
      </Dropzone>
      <ImagesContent>
        {imagePaths.map((image, index) => (
          <div onClick={() => deleteImage(image)} key={index}>
            <Image src={`http://localhost:8080/${image.fileName}`} />
          </div>
        ))}
      </ImagesContent>
    </Content>
  );
};

export default FileUpload;
