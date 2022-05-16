import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const TextB = (props) => {
  const {
    title,
    subtitle,
    sub,
    sub2,
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

  if (subtitle) {
    return (
      <SubTitle style={_style} onClick={_onClick} {...styles}>
        {children}
      </SubTitle>
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

  return (
    <Body style={_style} onClick={_onClick} {...styles}>
      {children}
    </Body>
  );
};

Text.defaultProps = {
  _onClick: () => {},
  children: null,
  margin: false,
  color: "#61586A",
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
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  font-size: 26px;
  line-height: 42px;
  background-color: ${(props) => props.bg};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
`;

const SubTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  font-size: 16px;
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

const Sub = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["300"]};
  font-size: 14px;
  line-height: 24px;
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
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["300"]};
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

const Body = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.batang};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.secondary["700"]};
  font-size: 16px;
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

export default TextB;
