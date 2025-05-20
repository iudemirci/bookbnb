import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import trTR from 'antd/es/locale/tr_TR';
import 'leaflet/dist/leaflet.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './config/leafletConfig.js';
import { antd } from './styles/antd.js';

import App from './App.jsx';

import '@ant-design/v5-patch-for-react-19';
import 'antd/dist/reset.css';
import i18n from 'i18next';
import './locales/i18n';
import store from './store/store.js';
import './styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <ConfigProvider
          locale={i18n.language === 'tr' ? trTR : enUS}
          theme={antd}
          getPopupContainer={() => document.body}
          message={{
            prefixCls: 'custom-msg',
            top: 80,
          }}
        >
          <App />
        </ConfigProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
);
