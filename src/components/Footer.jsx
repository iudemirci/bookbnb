import ButtonLanguage from "./buttons/ButtonLanguage.jsx";
import Container from "./Container.jsx";
<<<<<<< HEAD
import { Flex, Button, Typography } from "antd";
import ButtonCurrency from "./buttons/ButtonCurrency.jsx";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
=======
import { Flex, Typography } from "antd";
import Button from "./buttons/Button.jsx";
import ButtonCurrency from "./buttons/ButtonCurrency.jsx";
import { Icon } from "@iconify/react";
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
const { Text, Title } = Typography;

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-bg-secondary w-full py-8 md:pt-12">
      <Container as="div" className="divide-border-grey flex flex-col divide-y">
<<<<<<< HEAD
        <Title className="pb-2">{t("footer_title")}</Title>
=======
        <Title className="pb-2">
          Book unique homes and experiences around the world.
        </Title>
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588

        <Flex className="flex-col items-start !pt-4 md:flex-row md:items-center md:justify-between">
          <div className="-ml-[11px] flex items-center gap-2 md:order-2 md:mr-6 md:ml-auto">
            <ButtonLanguage />
            <ButtonCurrency />
          </div>
<<<<<<< HEAD
          <div className="-ml-[5px] flex items-center md:order-3">
            <Button
              type="text"
              size="small"
              href="https://github.com/iudemirci/"
            >
              <Icon icon="mdi:github" width={20} />
            </Button>
            <Button
              type="text"
              size="small"
              href="https://ihsanufukdemirci.netlify.app/"
            >
=======
          <div className="-ml-[10.5px] flex items-center md:order-3">
            <Button type="secondary" to="https://github.com/iudemirci/">
              <Icon icon="mdi:github" width={20} />
            </Button>
            <Button type="secondary" to="https://ihsanufukdemirci.netlify.app/">
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
              <Icon icon="mdi:instagram" width={20} />
            </Button>
          </div>
          <div className="mt-1.5 flex flex-col md:order-1">
            <Text className="!font-medium">
<<<<<<< HEAD
              {t("footer_text_one")}{" "}
              <span className="text-black">&middot;</span>{" "}
              {t("footer_text_two")}
=======
              © 2025 Bookbnb, Inc. <span className="text-black">&middot;</span>{" "}
              All rights reserved.
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
            </Text>
          </div>
        </Flex>
      </Container>
    </footer>
  );
}

export default Footer;
