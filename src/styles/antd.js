import { message } from 'antd';

export const antd = {
  token: {
    colorPrimary: '#ff385c',
    colorTextSecondary: '#ff4d4f',
    colorInfo: '#ff385c',
    colorSuccess: '#460479',
    colorWarning: '#92174d',
    colorTextBase: '#000',
    fontSize: 16,
    fontFamily: '"Nunito", "sans-serif"',
  },

  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      paragraphMarginBottom: 0,
      paragraphMarginTop: 0,
      marginXS: 0,
      marginXXS: 0,
      paddingSM: 0,
      lineHeight: 1.4,
      fontSizeHeading1: 22,
      fontSizeHeading2: 20,
      fontSizeHeading3: 18,
      fontSizeHeading4: 16,
      fontSizeHeading5: 15,
      fontWeightStrong: 700,
      lineHeightHeading1: 1,
      lineHeightHeading2: 1,
      lineHeightHeading3: 1,
      lineHeightHeading4: 1,
      lineHeightHeading5: 1,
    },
    Carousel: {
      arrowSize: 28,
    },
    Dropdown: {
      paddingBlock: 8,
      boxShadowPopoverArrow: '0 6px 20px 0 rgba(0, 0, 0, 0.1)',
    },
    Modal: {
      borderRadiusLG: 15,
    },
    Divider: {
      colorSplit: 'rgba(176,176,176,0.63)',
      marginLG: 8,
    },
    Button: {
      paddingInlineLG: 15,
      paddingInlineSM: 5,
      controlHeightSM: 30,
      borderRadiusLG: 10,
      borderRadiusSM: 40,
      paddingInline: 10,
      controlHeight: 35,
      controlHeightLG: 45,
      fontSize: 15,
      fontSizeMD: 16,
      fontSizeLG: 16,
      borderRadius: 40,
      fontWeight: 700,
      colorLink: '#222222',
      colorLinkActive: ': #222222',
      colorLinkHover: ': #2221111',
      colorBgContainer: undefined,
    },
    Form: {
      labelColor: '#6A6A6A',
      marginLG: 24,
      verticalLabelPadding: '0 0 2px',
      controlHeight: 0,
      controlHeightLG: 0,
      controlHeightSM: 0,
    },
    Input: {
      fontSize: 14,
    },
    Message: {
      contentPadding: '12px 12px',
    },
    DatePicker: {
      colorBorder: 'rgb(0,0,0)',
    },
    Select: {
      borderRadiusLG: 0,
      colorBorder: 'rgb(0,0,0)',
      hoverBorderColor: 'rgb(0,0,0)',
    },
    Menu: {
      lineType: 'none',
    },
  },
};

message.config({
  duration: 2,
  maxCount: 2,
  rtl: true,
});
