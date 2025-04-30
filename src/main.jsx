import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { antd } from "./styles/antd.js";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import App from "./App.jsx";

import store from "./store/store.js";
import "antd/dist/reset.css";
import "@ant-design/v5-patch-for-react-19";
import "./styles/index.css";
import "./locales/i18n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <ConfigProvider
          theme={antd}
          getPopupContainer={(trigger) =>
            trigger?.parentNode || document.querySelector("header")
          }
          message={{
            prefixCls: "custom-msg",
            top: 80,
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
