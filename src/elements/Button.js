import React from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const Button = (props) => {
  const {
    primaryDefault,
    primaryHover,
    primaryDisabled,
    secondaryDefault,
    secondaryHover,
    secondaryDisabled,
    small,
    small2,
    narrow,
    regular,
    wide,
    _onClick,
    _style,
    text,
    children,
    margin,
    width,
    padding,
    font,
    border,
    borderRadius,
    cursor,
    img,
    bg,
    color,
    size,
    fontFamily,
    fontStyle,
    lineHeight,
    //추가
    shadow,
  } = props;

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    font: font,
    border: border,
    borderRadius: borderRadius,
    cursor: cursor,
    img: img,
    bg: bg,
    color: color,
    size: size,
    fontFamily: fontFamily,
    fontStyle: fontStyle,
    lineHeight: lineHeight,
    //추가
    shadow: shadow,
  };
  if (primaryDefault) {
    return (
      <PrimaryDefaultButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </PrimaryDefaultButton>
    );
  }
  if (primaryHover) {
    return (
      <PrimaryHoverButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </PrimaryHoverButton>
    );
  }
  if (primaryDisabled) {
    return (
      <PrimaryDisabledButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </PrimaryDisabledButton>
    );
  }
  if (secondaryDefault) {
    return (
      <SecondaryDefaultButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </SecondaryDefaultButton>
    );
  }
  if (secondaryHover) {
    return (
      <SecondaryHoverButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </SecondaryHoverButton>
    );
  }
  if (secondaryDisabled) {
    return (
      <SecondaryDisabledButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </SecondaryDisabledButton>
    );
  }
  if (small) {
    return (
      <SmallButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </SmallButton>
    );
  }
  if (small2) {
    return (
      <Small2Button {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </Small2Button>
    );
  }
  if (narrow) {
    return (
      <NarrowButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </NarrowButton>
    );
  }
  if (regular) {
    return (
      <RegularButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </RegularButton>
    );
  }
  if (wide) {
    return (
      <WideButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </WideButton>
    );
  }
  return (
    <PrimaryDefaultButton {...styles} style={_style} onClick={_onClick}>
      {text ? text : children}
    </PrimaryDefaultButton>
  );
};

Button.defaultProps = {
  className: "",
  children: null,
  text: false,
  width: "100%",
  margin: false,
  padding: "10px 0px",
  bg: false,
  img: false,
  border: "none",
  borderRadius: "30px",
  font: "inherit",
  lineHeight: "24PX",
  fontFamily:
    "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;",
  fontStyle: "normal",
  color: "#ffffff",
  size: "16px",
  _onClick: () => {},
  cursor: "pointer",
  disabled: false,
  shadow: false,
};

const PrimaryDefaultButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default};
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const PrimaryHoverButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary["700"]};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary["700"]};
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const PrimaryDisabledButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid  ${({ theme }) => theme.colors.grayScale["100"]};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.grayScale["100"]};
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const SecondaryDefaultButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const SecondaryHoverButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary["200"]}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary["200"]}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const SecondaryDisabledButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.grayScale["50"]}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.grayScale["50"]}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const SmallButton = styled.button`
  width: 110px;
  height: 36px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const Small2Button = styled.button`
  width: 110px;
  height: 40px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const NarrowButton = styled.button`
  width: 140px;
  height: 36px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const RegularButton = styled.button`
  width: 160px;
  height: 36px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
const WideButton = styled.button`
  width: 300px;
  height: 40px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: 1px solid ${({ theme }) => theme.colors.primary.default}
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${({ theme }) => theme.colors.primary.default}
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;
export default Button;
