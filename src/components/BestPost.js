import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

//max8개
function BestPost() {
  const data = useSelector((state) => state);

  return (
    <React.Fragment>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
      <Box>
        <h3>게시글의 제목</h3>
        <h5>공감100개</h5>
      </Box>
    </React.Fragment>
  );
}

const Box = styled.div`
  margin: 0px 20px 0px 20px;
  height: 100px;
  width: 100px;
  padding: 20px;
  border-radius: 5px;
  background-color: pink;
`;
export default BestPost;
