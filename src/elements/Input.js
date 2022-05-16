import React from "react";
import styled from "styled-components";
import theme from "../styles/theme";

import Text from "./Text";

const Input = (props) => {
  const {
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    margin,
    padding,
    height,
    rows,
    cols,
    _ref,
    width,
    size,
    bg,
    border,
    _style,
    color,
    placeholder_st,
    maxlength,
    _onKeyUp,
    borderRadius,
    shadow,
  } = props;

  const style = {
    width,
    size,
    bg,
    margin,
    padding,
    height,
    border,
    color,
    placeholder_st,
    borderRadius,
    shadow,
  };

  if (multiLine) {
    return (
      <div>
        <ElTextArea
          {...style}
          ref={_ref}
          rows={rows}
          cols={cols}
          value={value ? value : ""}
          placeholder={placeholder}
          onChange={_onChange}
          maxLength={maxlength}
          onKeyUp={_onKeyUp}
        />
      </div>
    );
  }

  //width 추가
  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        {is_submit ? (
          <ElInput
            {...style}
            ref={_ref}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value ? value : ""}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
            onKeyUp={_onKeyUp}
            style={_style}
          />
        ) : (
          <ElInput
            value={value ? value : ""}
            {...style}
            ref={_ref}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            style={_style}
          />
        )}
      </div>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  placeholder_st: "",
  type: "text",
  value: "",
  is_submit: false,
  width: "100%",
  margin: "10px",
  padding: "5px 10px 5px 15px",
  onSubmit: () => {},
  _onChange: () => {},
  bg: "#fff",
  size: "14px",
  border: "1px solid #E6E6E6",
  color: "",
  maxlength: "",
  _onKeyUp: () => {},
  borderRadius: false,
};

const ElTextArea = styled.textarea`
  width: 100%;
  min-height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  outline: none;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  resize: none;
  word-break: keep-all;
  word-wrap: break-word;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale[300]};
  }
  ${(props) => (props.maxlength ? `maxlength: ${props.maxLength}` : "")};
`;

const ElInput = styled.input`
  color: ${({ theme }) => theme.colors.grayScale["700"]};
  border: 1px solid ${({ theme }) => theme.colors.grayScale["50"]};
  &:focus {
    box-shadow: 0px 0px 5px rgba(230, 230, 230, 0.75);
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale[300]};
  }
  width: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  -webkit-appearance: none;
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.shadow};
`;

export default Input;
