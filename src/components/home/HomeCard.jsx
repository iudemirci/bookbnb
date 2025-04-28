import { Col, Flex, Row } from "antd";
const { Title, Text } = Typography;
import { Typography } from "antd";
import { Icon } from "@iconify/react";

import HomeCardCarousel from "./HomeCardCarousel.jsx";

function HomeCard() {
  return (
    <Flex vertical={true}>
      <div className="relative aspect-14/13 w-full rounded-3xl shadow-sm">
        <span className="bg-bg-primary pointer-events-none absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 font-medium shadow-xl">
          Guest favourite
        </span>
        <span className="absolute top-4 right-4 z-10">
          <Icon
            icon="line-md:heart-twotone"
            width={28}
            className="text-primary cursor-pointer duration-200 hover:scale-105"
          />
        </span>
        <HomeCardCarousel />
      </div>
      <div className="pt-2">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={5}>Adalar, Turkey</Title>
          </Col>
          <Col>
            <Flex align="center">
              <Icon icon="material-symbols-light:star-rounded" width="24" />
              <Text className="font-normal">4.92</Text>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text type="secondary" size="24">
              321 kilometers away
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text type="secondary">May 4-6</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text type="secondary">
              <Text underline className="!font-bold">
                38,865 $
              </Text>{" "}
              for 5 nights
            </Text>
          </Col>
        </Row>
      </div>
    </Flex>
  );
}

export default HomeCard;
