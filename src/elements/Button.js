import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    _onClick,
    _style,
    text,
    isFloat,
    children,
    margin,
    width,
    padding,
    font,
    border,
    borderRadius,
    cursor,
    img,
    disabled,
    className,
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

  return (
    <React.Fragment>
      <RoundButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </RoundButton>
    </React.Fragment>
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

const RoundButton = styled.button`
  width: ${(props) => props.width};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  line-height: ${(props) => props.lineHeight};
  font-family: ${(props) => props.fontFamily};
  font-style: ${(props) => props.fontStyle};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  box-sizing: border-box;
  box-shadow: ${(props) => props.shadow};
`;

export default Button;
