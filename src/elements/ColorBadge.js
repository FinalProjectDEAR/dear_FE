import React from "react";
import styled from "styled-components";

const ColorBadge = (props) => {
  const { _onClick, margin, bg, size, cursor, shadow, value, border } = props;

  const styles = {
    margin: margin,
    bg: bg,
    size: size,
    cursor: cursor,
    shadow: shadow,
    border: border,
  };
  return <Circle onClick={_onClick} {...styles} value={value}></Circle>;
};

Text.defaultProps = {
  _onClick: () => {},
  margin: "8px",
  size: "18px",
  cursor: "default",
  shadow: false,
  bg: "",
  value: "",
  border: "",
};

const Circle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  margin: ${(props) => props.margin};
  border-radius: var(--size);
  box-shadow: ${(props) => props.shadow};
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  cursor: ${(props) => props.cursor};
`;

export default ColorBadge;
