import { message } from "antd";

export const antd = {
  token: {
    colorPrimary: "#ff385c",
    colorTextSecondary: "#ff4d4f",
    colorInfo: "#ff385c",
    colorSuccess: "#460479",
    colorWarning: "#92174d",
    colorTextBase: "#000",
    fontSize: 15,
    fontFamily: '"Nunito", "sans-serif"',
  },

  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      marginXS: 0,
      marginXXS: 0,
      paddingSM: 0,
      lineHeight: 1.4,
      fontSizeHeading1: 22,
<<<<<<< HEAD
      fontSizeHeading2: 20,
=======
      fontSizeHeading2: 24,
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
      fontSizeHeading3: 18,
      fontSizeHeading4: 16,
      fontSizeHeading5: 15,
      fontWeightStrong: 700,
<<<<<<< HEAD
      lineHeightHeading1: 1,
      lineHeightHeading2: 1,
      lineHeightHeading3: 1,
      lineHeightHeading4: 1,
      lineHeightHeading5: 1,
=======
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    },
    Dropdown: {
      paddingBlock: 8,
      boxShadowPopoverArrow: "0 6px 20px 0 rgba(0, 0, 0, 0.1)",
<<<<<<< HEAD
    },
    Modal: {
      borderRadiusLG: 15,
    },
    Divider: {
      colorSplit: "rgba(176,176,176,0.63)",
      marginLG: 8,
    },
    Button: {
      paddingInlineLG: 15,
      borderRadiusLG: 40,
      paddingInlineSM: 5,
      controlHeightSM: 30,
      borderRadiusSM: 40,
      paddingInline: 10,
      controlHeight: 35,
      controlHeightLG: 45,
      fontSize: 15,
      fontSizeMD: 16,
      fontSizeLG: 16,
      borderRadius: 40,
      fontWeight: 700,
      colorLink: "#222222",
      colorLinkActive: ": #222222",
      colorLinkHover: ": #2221111",
      colorBgContainer: undefined,
    },
    Form: {
      labelColor: "#6A6A6A",
      marginLG: 24,
      verticalLabelPadding: "0 0 2px",
    },
    Input: {
      fontSize: 14,
    },
    Message: {
      contentPadding: "12px 12px",
=======
>>>>>>> 24748d013c382da4d2e244a5211dc51fbd97f588
    },
  },
};

message.config({
  duration: 2,
  maxCount: 2,
  rtl: true,
});
