import * as React from "react";
import { FaCode } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../_reducer";
import { LOAD_MAIN_POSTS_REQUEST } from "../../../_reducer/post";
import { Col, Card, Row } from "antd";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const { Meta } = Card;

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state: RootState) => state.post);
  React.useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
  }, []);

  const renderCards = mainPosts?.productInfo.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={<img src={`http://localhost:8080/${product.images[0]}`} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <Main>
      <FaCode style={{ fontSize: "4rem" }} />
      <br />
      {mainPosts?.productInfo.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}>
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
    </Main>
  );
};

export default LandingPage;
