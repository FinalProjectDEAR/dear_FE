import styled from "styled-components";

// font size를 객체로 반환해주자.
const fontSizes = {
  title: pixelToRem(60),
  subtitle: pixelToRem(30),
  paragraph: pixelToRem(18),
};

// 자주 사용하는 색을 객체로 만들자.
const colors = {
  black: "#000000",
  grey: "#999999",
  green: "#3cb46e",
  blue: "#000080",
};

const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const fonts = {
  batang: {
    family: { batang: `KoPub Batang` },
    size: {
      title: "26",
    },
    weight: {},
  },
  family: {
    base: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`,
  },
  size: {
    sm: "1.4rem",
    base: "1.6rem",
    lg: "2rem",
    xl: "2.5rem",
    title: "6rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const size = {
  mobile: "425px",
  desktop: "1440px",
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

//테마에 따라 다른 값을 갖는 색상 값입니다
const lightThemeColors = {
  ...colors,
  primary: "#333",
  secondary: "#fff",
  tertiary: "#808080",
};

const darkThemeColors = {
  ...colors,
  primary: "#fff",
  secondary: "#333",
  tertiary: "#d4d0c4",
};

// 테마와 관련없이 공통으로 사용되는 변수들입니다
const defalutTheme = {
  margins,
  paddings,
  fonts,
  device,
};

// 각 테마는 공통 변수와 함께, 각기 다른 색상 값들을 갖습니다.
export const darkTheme = {
  ...defalutTheme,
  colors: darkThemeColors,
};

export const lightTheme = {
  ...defalutTheme,
  colors: lightThemeColors,
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
  fontSizes,
  colors,
  common,
};

export default theme;

// element에 반영 예시..

// const Title = styled.h1`
// font-size: ${({ theme }) => theme.fontSizes.title};
// color: ${({ theme }) => theme.colors.grey};
// `;

// const Subtitle = styled.h2`
// font-size: ${({ theme }) => theme.fontSizes.subtitle};
// color: ${({ theme }) => theme.colors.green};
// `;
