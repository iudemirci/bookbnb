import { Col, Flex, Row } from "antd";
import { Typography } from "antd";
import { Icon } from "@iconify/react";
const { Title, Text } = Typography;

function HomeCard() {
  return (
    <Flex vertical={true} className="!py-6">
      <div className="relative aspect-14/13 w-full rounded-3xl bg-purple-200 shadow-sm">
        <span className="absolute top-3 right-3">
          <Icon icon="stash:heart-duotone" width={30} />
        </span>
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
              <Text strong underline>
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
