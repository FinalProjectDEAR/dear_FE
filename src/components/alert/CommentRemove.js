import React from "react";

import styled from "styled-components";
import { Text, Button, TextB } from "../../elements";

import { actionCreators } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";
import { useDispatch } from "react-redux";

function CommentRemove(props) {
  // console.log(props);
  const dispatch = useDispatch();
  const { closeModal, postId, comment_id, setPage } = props;
  const deletePost = () => {
    dispatch(actionCreators.delCommentDB({ comment_id, postId }));
  };
  const onRemove = () => {
    props.setPage(1);
    deletePost();
    closeModal();
  };
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB weight="500" size="16px" color="#2E2A32">
            댓글을 삭제할까요?
          </TextB>
        </LineBox>
        <BottomBox>
          <div className="goBack">
            <Button
              secondaryDefault
              cursor="pointer"
              size="narrow"
              _onClick={closeModal}
            >
              <Text body4 color="#7A37BE" cursor="pointer">
                돌아가기
              </Text>
            </Button>
          </div>
          <Button
            primaryDefault
            shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
            cursor="pointer"
            size="narrow"
            _onClick={onRemove}
          >
            <Text body4 color="#fff" cursor="pointer">
              삭제하기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default CommentRemove;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 35px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.isMobile} {
    padding-top: 15px;
    width: 320px;
    height: 146px;
    border-radius: 10px;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.isMobile} {
    margin: auto;
  }
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${({ theme }) => theme.device.isMobile} {
    /* border: 1px solid red; */
    justify-content: center;
    .goBack {
      display: none;
    }
  }
`;
