import styled from "styled-components";

// 자주 사용하는 색을 객체로 만들자.
const colors = {
  primary: {
    700: "#6422A7",
    default: "#7A37BE",
    300: "#BB9ED8",
    200: "#E1D6ED",
    100: "#EEE7F5",
  },
  secondary: {
    700: "#2E2A32",
    500: "#61586A",
    300: "#948A9E",
  },
  accent: {
    red: "#D53253",
    green: "#50BA94",
  },
  grayScale: {
    700: "#333333",
    500: "#666666",
    300: "#999999",
    200: "#B3B3B3",
    100: "#CCCCCC",
    50: "#E6E6E6",
    30: "#F1F1F1",
    10: "#F8F8F8",
    5: "#FAFAFA",
    0: "#FFFFFF",
  },
};

const fonts = {
  family: {
    base: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
    batang: `'KoPub Batang'`,
  },

  weight: {
    bold: 700,
    medium: 500,
    light: 300,
  },
};

const size = {
  mobile: "425px",
  desktop: "1440px",
  web: "426px",
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `only screen and (max-width: ${size.mobile})`,
  desktopL: `only screen and (max-width: ${size.desktop})`,
  web: `only screen and (min-width: ${size.web})`,
};

// 자주 사용하는 스타일 속성을 theme으로 만들어보자.
const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

// theme 객체에 감싸서 반환한다.
const theme = {
  fonts,
  colors,
  common,
  device,
};

export default theme;
