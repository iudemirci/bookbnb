import { Col, Flex, Form, Row, Space, Typography } from "antd";
import CategoryInput from "../../CategoryInput.jsx";
import { useTranslation } from "react-i18next";
import { categories } from "../../../data/categories.js";

const newCategories = categories.slice(1, categories.length);

function StepCategories({ form }) {
  const { t } = useTranslation();
  const selectedCategory = Form.useWatch("category", form);

  return (
    <Space direction="vertical" size={12}>
      <Flex vertical={true} justify="center" gap={12} className="!mb-4">
        <Typography.Title level={2} className="!font-extrabold">
          {t("bookbnb_category_title")}
        </Typography.Title>
        <Typography.Title level={4} type="secondary">
          {t("bookbnb_category_subtitle")}
        </Typography.Title>
      </Flex>

      <Row gutter={[6, 12]} role="list">
        {newCategories.map(({ key, icon }) => (
          <Col key={key} role="listitem" xs={24} sm={12}>
            <div onClick={() => form.setFieldValue("category", key)}>
              <CategoryInput
                category={key}
                icon={icon}
                isSelected={selectedCategory === key}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Space>
  );
}

export default StepCategories;
