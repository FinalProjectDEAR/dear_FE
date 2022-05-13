import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    _onClick,
    _style,
    children,
    margin,
    weight,
    batang,
    font,
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
    weight: weight,
    batang: batang,
    font: font,
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
  return (
    <P style={_style} onClick={_onClick} {...styles}>
      {children}
    </P>
  );
};

Text.defaultProps = {
  _onClick: () => {},
  children: null,
  margin: false,
  lineHeight: "24PX",
  batang: false,
  weight: "300",
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

const P = styled.p`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) =>
    props.batang
      ? "KoPub Batang"
      : "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif"};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")};
  ${(props) => (props.deco ? `text-decoration: ${props.deco};` : "")};
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
  ${(props) => (props.textShadow ? `text-shadow: ${props.textShadow};` : "")};
  font-style: ${(props) => props.fontStyle};
  ${(props) => (props.wordBreak ? `word-break: keep-all;` : "")};
  background-color: ${(props) => props.bg};
`;

export default Text;
