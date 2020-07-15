import * as React from "react";
import styled from "styled-components";
import { Carousel } from "antd";
import { ImageType } from "../../_reducer/post";

const CardImage = styled.img`
  width: 200px;
  max-height: 150px;
`;

type ImageSliderProps = {
  images: Array<ImageType>;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index}>
            <CardImage src={`http://localhost:8080/${image.fileName}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
