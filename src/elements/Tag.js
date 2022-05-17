import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const Tag = (props) => {
  const {
    primary,
    sub,
    counselRes,
    counselReq,
    small,
    regular,
    _style,
    text,
    children,
    margin,
    width,
    padding,
    font,
    border,
    borderRadius,
    img,
    bg,
    color,
    size,
    fontFamily,
    fontStyle,
    lineHeight,
    textAlign,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    font: font,
    border: border,
    borderRadius: borderRadius,
    img: img,
    bg: bg,
    color: color,
    size: size,
    fontFamily: fontFamily,
    fontStyle: fontStyle,
    lineHeight: lineHeight,
    textAlign: textAlign,
  };

  if (primary) {
    return (
      <Primary {...styles} style={_style}>
        {text ? text : children}
      </Primary>
    );
  }

  if (sub) {
    return (
      <Sub {...styles} style={_style}>
        {text ? text : children}
      </Sub>
    );
  }
  if (counselRes) {
    return (
      <CounselRes {...styles} style={_style}>
        {text ? text : children}
      </CounselRes>
    );
  }
  if (counselReq) {
    return (
      <CounselReq {...styles} style={_style}>
        {text ? text : children}
      </CounselReq>
    );
  }
  if (small) {
    return (
      <Small {...styles} style={_style}>
        {text ? text : children}
      </Small>
    );
  }
  if (regular) {
    return (
      <Regular {...styles} style={_style}>
        {text ? text : children}
      </Regular>
    );
  }
  return (
    <Sub {...styles} style={_style}>
      {text ? text : children}
    </Sub>
  );
};

Tag.defaultProps = {
  className: "",
  children: null,
  text: false,
  width: "100%",
  margin: false,
  padding: "0px 10px",
  bg: false,
  img: false,
  border: "none",
  borderRadius: "4px",
  font: "inherit",
  lineHeight: "14PX",
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;",
  fontStyle: "normal",
  color: "#7A37BE",
  size: "12px",
  textAlign: "center",
};

const Primary = styled.div`
  width: 120px;
  height: 24px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")};
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

const Sub = styled.div`
  width: 120px;
  height: 24px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")};
  border: 1px solid theme.colors.primary[ "100" ];
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

const CounselRes = styled.div`
  width: 70px;
  height: 24px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.primary["100"]};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")};
  border: 1px solid ${({ theme }) => theme.colors.primary["100"]};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

const CounselReq = styled.div`
  width: 70px;
  height: 24px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.primary.default};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.grayScale["0"]};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

const Small = styled.div`
  width: 40px;
  height: 26px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.grayScale["30"]};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["30"]};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.grayScale["700"]};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

const Regular = styled.div`
  width: 74px;
  height: 26px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${({ theme }) => theme.colors.grayScale["30"]};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.grayScale["30"]};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.grayScale["700"]};
  font-size: ${(props) => props.size};
  box-sizing: border-box;
  ${(props) => (props.textAlign ? `text-align: ${props.textAlign};` : "")};
`;

export default Tag;
