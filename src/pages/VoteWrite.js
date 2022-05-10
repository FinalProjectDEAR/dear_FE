import React, { useRef } from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as voteActions } from "../redux/modules/vote";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";

function VoteWrite() {
  const [title, setTitle] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [imgVote, setImageVote] = React.useState(false);
  const [voteLeft, setVoteLeft] = React.useState("");
  const [voteRight, setVoteRight] = React.useState("");
  const [textLength, setTextLength] = React.useState(0);
  const [leftPreview, setLeftPreview] = React.useState(null);
  const [rightPreview, setRightPreview] = React.useState(null);

  const dispatch = useDispatch();

  const _imageLeft = useSelector((state) => state.image.imageLeft);
  const _imageRight = useSelector((state) => state.image.imageRight);

  const imageLeft = useRef();
  const imageRight = useRef();

  const selectFile = (num) => {
    const reader = new FileReader();
    console.log(num);
    if (num === 1) {
      const file = imageLeft.current.files[0];
      console.log("이미지 파일형태 확인", file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLeftPreview(reader.result);
        dispatch(imageActions.uploadImage(file, num));
      };
    } else {
      const file = imageRight.current.files[0];
      console.log("이미지 파일형태 확인", file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRightPreview(reader.result);
        dispatch(imageActions.uploadImage(file, num));
      };
    }
  };

  const imageVote = () => {
    setImageVote(!imgVote);
    setVoteLeft("");
    setVoteRight("");
    dispatch(imageActions.delData());
  };

  const checkLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength >= 200) {
      alert("200자 이상 작성할 수 없습니다.");
    }
    setTextLength(wordLength);
  };

  const uploadVote = () => {
    if (imgVote == true) {
      if (
        title === "" ||
        contents === "" ||
        _imageLeft === "" ||
        _imageRight === "" ||
        voteLeft === "" ||
        voteRight === ""
      ) {
        window.alert("이미지와 컨텐츠 모두 작성해주세요!");
        return;
      }
      dispatch(
        voteActions.addVoteDB(
          title,
          contents,
          _imageLeft,
          _imageRight,
          voteLeft,
          voteRight
        )
      );
    } else {
      if (
        title === "" ||
        contents === "" ||
        voteLeft === "" ||
        voteRight === ""
      ) {
        window.alert("컨텐츠를 모두 작성해주세요!");
        return;
      }
      dispatch(voteActions.addVoteDB(title, contents, voteLeft, voteRight));
    }
  };

  return (
    <React.Fragment>
      <div id="wrapper" width="70%" margin="10% auto">
        <div
          id="container"
          width="60%"
          margin="0px auto"
          borderLine="3px solid orange"
        >
          <div id="title" display="flex" justifyContent="flex-start">
            <div width="20%" padding="0px 10px">
              <Text textAlign="left">제목</Text>
            </div>
            <div width="80%">
              <Input
                value={title}
                _onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div id="content" display="flex" justifyContent="flex-start">
            <div width="20%" padding="0px 10px">
              <Text textAlign="left">
                투표내용 <br />
                (200자 미만)
              </Text>
            </div>
            <div width="80%">
              <Input
                multiLine
                _onKeyUp={checkLength}
                maxlength="200"
                placeholder=" 투표 내용을 입력해주세요."
                value={contents}
                rows={3}
                _onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
              <Text textAlign="right" margin="0px 5px">
                {textLength}/ 200자
              </Text>
            </div>
          </div>
          <div id="typeselect" display="flex" justifyContent="flex-start">
            <div width="20%" padding="0px 10px">
              <Text textAlign="left">투표선택지</Text>
            </div>
            <div width="15%">
              <Button
                text="이미지 포함"
                _onClick={() => {
                  imageVote();
                }}
              />
            </div>
          </div>

          {imgVote ? (
            <div width="80%" is_flex margin="20px auto">
              <div id="select1">
                <img
                  shape="rectangle"
                  src={leftPreview ? leftPreview : uploadImg}
                  alt="선택지1"
                />
                <div id="input" width="50%" margin="0px auto">
                  <FileInput
                    id="leftImage"
                    type="file"
                    ref={imageLeft}
                    onChange={() => {
                      selectFile(1);
                    }}
                  />
                  <ImgButton htmlFor="leftImage">1번 이미지 등록 </ImgButton>
                  <Input
                    placeholder=" 1번 선택지"
                    value={voteLeft}
                    _onChange={(e) => {
                      setVoteLeft(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div items="center" margin="auto">
                <Text bold size="30px">
                  VS
                </Text>
              </div>
              <div id="select2">
                <img
                  shape="rectangle"
                  src={rightPreview ? rightPreview : uploadImg}
                  alt="선택지2"
                />
                <div id="input" width="50%" margin="0px auto">
                  <FileInput
                    id="rightImage"
                    type="file"
                    ref={imageRight}
                    onChange={() => {
                      selectFile(2);
                    }}
                  />
                  <ImgButton htmlFor="rightImage">2번 이미지 등록 </ImgButton>
                  <Input
                    placeholder=" 2번 선택지"
                    value={voteRight}
                    _onChange={(e) => {
                      setVoteRight(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div width="80%" margin="20px auto">
              <div id="select1">
                <Input
                  placeholder=" 1번 선택지"
                  value={voteLeft}
                  _onChange={(e) => {
                    setVoteLeft(e.target.value);
                  }}
                />
              </div>

              <div items="center" margin="auto">
                <Text bold size="30px">
                  VS
                </Text>
              </div>
              <div id="select2">
                <Input
                  placeholder=" 2번 선택지"
                  value={voteRight}
                  _onChange={(e) => {
                    setVoteRight(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <Button
            margin="20px 0px"
            width="30%"
            text="투표등록"
            _onClick={uploadVote}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default VoteWrite;

const FileInput = styled.input`
  display: none;
`;

const ImgButton = styled.label`
  border: none;
  background-color: #0095f6;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  margin: 10px 0px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
