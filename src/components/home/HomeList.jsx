import HomeCard from "./HomeCard.jsx";
import { Col, Row } from "antd";

function HomeList() {
  return (
    <ul className="py-6">
      <Row gutter={[24, 40]} role="list">
        {[...Array(15)].map((_, idx) => (
          <Col
            key={idx}
            role="listitem"
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="3xl:!max-w-[20%] 3xl:!basis-[20%] 4xl:!max-w-[16.6%] 4xl:!basis-[16.6%] 2xl:!max-w-[25%] 2xl:!basis-[25%]"
          >
            <HomeCard />
          </Col>
        ))}
      </Row>
    </ul>
  );
}

export default HomeList;
