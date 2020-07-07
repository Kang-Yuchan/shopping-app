import * as React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UPLOAD_IMAGES_REQUEST } from "../../_reducer/post";

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

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();

  const onDropFiles = React.useCallback((files: Array<any>) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: formData
    });
  }, []);

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
    </Content>
  );
};

export default FileUpload;
