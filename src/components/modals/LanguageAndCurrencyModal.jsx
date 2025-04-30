import { Col, Modal, Row, Space, Tabs, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLanguageAndCurrencyOpen } from "../../store/modalSlice.js";

function LanguageAndCurrencyModal() {
  const isModalOpen = useSelector(
    (state) => state.modal.isLanguageAndCurrencyOpen,
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  function hideModal() {
    dispatch(setIsLanguageAndCurrencyOpen());
  }

  const items = useMemo(() => {
    return [
      {
        key: "1",
        label: t("language_region"),
        children: (
          <Space direction="vertical" size={16} className="w-full">
            <Typography.Title level={2}>
              {t("choose_language_title")}
            </Typography.Title>
            <Row gutter={[12, 12]} role="list" wrap={false}>
              <Col role="listitem" className="min-w-35 flex-1">
                <button
                  className="hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg border px-4 py-1.5 text-start text-nowrap"
                  onClick={() => handleClick("en")}
                >
                  <Typography.Text className="text-text-secondary">
                    English
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    United States
                  </Typography.Text>
                </button>
              </Col>
              <Col role="listitem" className="min-w-35 flex-1">
                <button
                  className="hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg border px-4 py-1.5 text-start text-nowrap"
                  onClick={() => handleClick("tr")}
                >
                  <Typography.Text className="text-text-secondary">
                    Türkçe
                  </Typography.Text>
                  <Typography.Text type="secondary">Turkiye</Typography.Text>
                </button>
              </Col>
            </Row>
          </Space>
        ),
      },
      {
        key: "2",
        label: t("currency"),
        children: (
          <Space direction="vertical" size={16} className="w-full">
            <Typography.Title level={2}>
              {t("choose_currency")}
            </Typography.Title>
            <Row gutter={[12, 12]} role="list" wrap={false}>
              <Col role="listitem" className="min-w-35 flex-1">
                <button
                  className="hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg border px-4 py-1.5 text-start text-nowrap"
                  onClick={() => handleClick("en")}
                >
                  <Typography.Text className="text-text-secondary truncate">
                    United States Dollar
                  </Typography.Text>
                  <Typography.Text type="secondary">$ USD</Typography.Text>
                </button>
              </Col>
              <Col role="listitem" className="min-w-35 flex-1">
                <button
                  className="hover:bg-bg-secondary flex w-full cursor-pointer flex-col rounded-lg border px-4 py-1.5 text-start text-nowrap"
                  onClick={() => handleClick("tr")}
                >
                  <Typography.Text className="text-text-secondary truncate">
                    Turkish Lira
                  </Typography.Text>
                  <Typography.Text type="secondary">₺ TRY</Typography.Text>
                </button>
              </Col>
            </Row>
          </Space>
        ),
      },
    ];
  }, [t]);

  function handleClick(lang) {
    if (lang === "tr") {
      localStorage.setItem("locale", "tr");
    } else {
      localStorage.setItem("locale", "en");
    }
    i18n.changeLanguage(lang === "tr" ? "tr" : "en");
  }

  return (
    <Modal open={isModalOpen} onCancel={hideModal} width={410} footer={null}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        indicator={{
          origin: "30",
        }}
      />
    </Modal>
  );
}

export default LanguageAndCurrencyModal;
