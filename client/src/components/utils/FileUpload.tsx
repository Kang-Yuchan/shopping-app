import * as React from "react";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

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
  return (
    <Content>
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
