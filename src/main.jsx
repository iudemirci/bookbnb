import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { antd } from "./styles/antd.js";
import { ConfigProvider } from "antd";

import App from "./App.jsx";

import "antd/dist/reset.css";
import "./styles/index.css";
import "./locales/i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={antd}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);
