import React from "react";
import { Button } from "../elements";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import Post from "../pages/Post";

function PostList(props) {
  const mytoken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = React.useState([
    "전체",
    "썸",
    "고백",
    "연애중",
    "19금",
    "재회",
    "이별",
    "기타",
  ]);
  //게시글 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getPostDB());
  }, []);
  const _postList = useSelector((state) => state.post.post);
  //작성,수정페이지로 가는 버튼
  const write = () => {
    if (!mytoken) {
      window.alert("로그인 한 회원만 작성이 가능합니다!");
      return;
    } else {
      history.push("/postWrite");
    }
  };
  return (
    <>
      <PostListWrap id="1">
        <BtnInfo>
          <Button _onClick={write} bg="#2E2A32" color="white" width="151px">
            상담 신청하기
          </Button>
          <div>
            {category.map((item, idx) => (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                }}
                // 카테고리 클릭 시 각 카테고리 페이지로 이동
                onClick={() => {
                  history.push(`/${item}`);
                }}
                key={idx}
              >
                {item}
              </button>
            ))}
          </div>
        </BtnInfo>
        <PostTable>
          <TableInfo>
            <InfoItem style={{ marginLeft: "10%" }}>제목</InfoItem>
            <InfoItem style={{ marginRight: "10%" }}>작성일</InfoItem>
          </TableInfo>
          {_postList &&
            _postList.map((item, idx) => {
              // PostDetail 페이지에 item값을 props로 넘겨준다.
              return <Post key={idx} item={item} />;
            })}
        </PostTable>
      </PostListWrap>
    </>
  );
}

const PostListWrap = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 80px;
  padding-right: 40px;
  max-width: 1050px;
`;

const BtnInfo = styled.div`
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
`;

const PostTable = styled.div`
  margin-top: 15px;
  border-top: 1px solid #522772;
  border-bottom: 1px solid #522772;
`;

const TableInfo = styled.div`
  width: 100%;
  height: 65.8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
`;

const InfoItem = styled.div`
  padding: 25px 0px 23px 0;
  color: #353535;
  font-size: 12px;
  line-height: 140%;
  font-weight: 300;
  vertical-align: middle;
`;

export default PostList;
