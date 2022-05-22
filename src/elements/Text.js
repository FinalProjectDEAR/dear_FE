import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const Text = (props) => {
  const {
    title,
    headLine,
    body2,
    body3,
    body4,
    body5,
    body6,
    sub,
    sub2,
    sub3,
    sub4,
    sub5,
    sub6,
    sub7,
    sub8,
    _onClick,
    _style,
    children,
    margin,
    color,
    size,
    cursor,
    deco,
    textAlign,
    textShadow,
    lineHeight,
    wordBreak,
    bg,
  } = props;

  const styles = {
    margin: margin,
    color: color,
    size: size,
    cursor: cursor,
    deco: deco,
    textAlign: textAlign,
    textShadow: textShadow,
    lineHeight: lineHeight,
    wordBreak: wordBreak,
    bg: bg,
  };

  if (title) {
    return (
      <Title style={_style} onClick={_onClick} {...styles}>
        {children}
      </Title>
    );
  }

  if (headLine) {
    return (
      <HeadLine style={_style} onClick={_onClick} {...styles}>
        {children}
      </HeadLine>
    );
  }

  if (body2) {
    return (
      <Body2 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Body2>
    );
  }

  if (body3) {
    return (
      <Body3 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Body3>
    );
  }

  if (body4) {
    return (
      <Body4 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Body4>
    );
  }

  if (body5) {
    return (
      <Body5 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Body5>
    );
  }

  if (body6) {
    return (
      <Body6 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Body6>
    );
  }

  if (sub) {
    return (
      <Sub style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub>
    );
  }

  if (sub2) {
    return (
      <Sub2 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub2>
    );
  }

  if (sub3) {
    return (
      <Sub3 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub3>
    );
  }

  if (sub4) {
    return (
      <Sub4 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub4>
    );
  }

  if (sub5) {
    return (
      <Sub5 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub5>
    );
  }

  if (sub6) {
    return (
      <Sub6 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub6>
    );
  }

  if (sub7) {
    return (
      <Sub7 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub7>
    );
  }

  if (sub8) {
    return (
      <Sub8 style={_style} onClick={_onClick} {...styles}>
        {children}
      </Sub8>
    );
  }

  return (
    <Body style={_style} onClick={_onClick} {...styles}>
      {children}
    </Body>
  );
};

Text.defaultProps = {
  _onClick: () => {},
  children: null,
  margin: "0px",
  color: "#61586A", // 수정 boolean 값이 안된다고 오류뜸
  size: "18px",
  cursor: "default",
  deco: "none",
  textAlign: "center",
  textShadow: "none",
  lineHeight: "24px",
  wordBreak: false,
  bg: "",
};

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 18px;
  line-height: 30px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const HeadLine = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 16px;
  line-height: 16px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 12px;
  }
`;

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 14px;
  line-height: 18 px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Body2 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 18px;
  line-height: 20px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Body3 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 16px;
  line-height: 24px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 14px;
  }
`;

const Body4 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 14px;
  line-height: 18px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Body5 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 16px;
  line-height: 27px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Body6 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 14px;
  line-height: 22px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 12px;
  line-height: 14px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub2 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 14px;
  line-height: 18px;
  text-decoration-line: underline;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub3 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 12px;
  line-height: 14px;
  text-decoration-line: underline;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub4 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 12px;
  line-height: 14px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub5 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 10px;
  line-height: 14px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub6 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 14px;
  line-height: 18px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub7 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 12px;
  line-height: 14px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const Sub8 = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  ${(props) => (props.color ? `color: ${props.color}` : "")};
  font-size: 10px;
  line-height: 14px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

export default Text;
