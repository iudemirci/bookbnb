import ButtonLanguage from "./buttons/ButtonLanguage.jsx";
import MainWrapper from "./MainWrapper.jsx";
import { Typography } from "antd";
import ButtonGithub from "./buttons/ButtonGithub.jsx";
import Button from "./buttons/Button.jsx";
import ButtonCurrency from "./buttons/ButtonCurrency.jsx";
const { Text } = Typography;

function Footer() {
  return (
    <footer className="bg-bg-secondary w-full py-4">
      <MainWrapper as="div" className="flex flex-col items-start">
        <div className="-ml-[12px] flex items-center gap-2">
          <ButtonLanguage />
          <ButtonCurrency />
        </div>
        <div className="bg -ml-[9px] flex items-center">
          <ButtonGithub />
          <Button to="https://ihsanufukdemirci.netlify.app/">
            ihsanudemirci
          </Button>
        </div>
        <div className="mt-1.5">
          <Text>© 2025 Bookbnb, Inc.</Text>
        </div>
      </MainWrapper>
    </footer>
  );
}

export default Footer;
