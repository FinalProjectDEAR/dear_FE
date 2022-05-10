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

  const selectFile = (where) => {
    const reader = new FileReader();
    console.log(where);
    if (where === "left") {
      const file = imageLeft.current.files[0];
      console.log("이미지 파일형태 확인", file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLeftPreview(reader.result);
        dispatch(imageActions.uploadImage(file, where));
      };
    } else {
      const file = imageRight.current.files[0];
      console.log("이미지 파일형태 확인", file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRightPreview(reader.result);
        dispatch(imageActions.uploadImage(file, where));
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
      <VoteWrapper>
        <LineBox>
          <Text margin="0px" batang weight="500" size="16px">
            간단한 고민을 투표로 물어보세요!{" "}
          </Text>
          <Text margin="0px 10px" weight="300" size="14px">
            <span style={{ color: "red", marginRight: "4px" }}>*</span>필수입력
          </Text>
        </LineBox>
        <InputBox>
          <Text textAlign="left" weight="400" size="16px" color="#999999">
            투표 질문
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
          </Text>
          <Input
            margin="0px"
            padding="16px"
            placeholder="질문할 내용을 20자 이내로 입력해주세요."
            value={title}
            _onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <Text
            textAlign="left"
            margin="0px"
            weight="400"
            size="16px"
            color="#999999"
          >
            투표 내용
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
          </Text>
          <Text textAlign="right" margin="0px" weight="300" size="14px">
            {textLength}/ 200자
          </Text>
          <Input
            margin="0px"
            padding="16px"
            multiLine
            _onKeyUp={checkLength}
            maxlength="200"
            placeholder=" 구체적인 내용을 200자 이내로 입력해주세요."
            value={contents}
            rows={4}
            _onChange={(e) => {
              setContents(e.target.value);
            }}
          />
        </InputBox>
        <LineBox>
          <Text textAlign="left" weight="400" size="16px" color="#999999">
            투표 유형
            <span style={{ color: "red", marginRight: "4px" }}>*</span>
          </Text>
          <CheckBox>
            <input
              type="radio"
              name="type"
              value="letter"
              onChange={() => {
                setImageVote(false);
              }}
            />
            글
          </CheckBox>
          <CheckBox>
            <input
              type="radio"
              name="type"
              value="image"
              onChange={() => {
                setImageVote(true);
              }}
            />
            이미지
          </CheckBox>
        </LineBox>

        {imgVote ? (
          <ImageBox>
            <FileBox>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ImgButton htmlFor="leftImage">이미지 등록</ImgButton>
                <Image src={leftPreview ? leftPreview : uploadImg} />
                <FileInput
                  id="leftImage"
                  type="file"
                  ref={imageLeft}
                  onChange={() => {
                    selectFile("left");
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ImgButton htmlFor="rightImage">이미지 등록</ImgButton>
                <Image src={rightPreview ? rightPreview : uploadImg} />
                <FileInput
                  id="rightImage"
                  type="file"
                  ref={imageRight}
                  onChange={() => {
                    selectFile("right");
                  }}
                />
              </div>
            </FileBox>
            <LineBox>
              <Input
                margin="0px"
                padding="16px"
                placeholder="첫번째 답변을 5자 이내로 입력해주세요."
                value={voteLeft}
                _onChange={(e) => {
                  setVoteLeft(e.target.value);
                }}
              />

              <Text weight="500" size="18px" margin="0px 46px">
                VS
              </Text>
              <Input
                margin="0px"
                padding="16px"
                placeholder="두번째 답변을 5자 이내로 입력해주세요."
                value={voteRight}
                _onChange={(e) => {
                  setVoteRight(e.target.value);
                }}
              />
            </LineBox>
          </ImageBox>
        ) : (
          <VoteBox>
            <Input
              margin="0px"
              padding="16px"
              placeholder="첫번째 답변을 5자 이내로 입력해주세요."
              value={voteLeft}
              _onChange={(e) => {
                setVoteLeft(e.target.value);
              }}
            />

            <Text weight="500" size="18px" margin="0px 46px">
              VS
            </Text>
            <Input
              margin="0px"
              padding="16px"
              placeholder="두번째 답변을 5자 이내로 입력해주세요."
              value={voteRight}
              _onChange={(e) => {
                setVoteRight(e.target.value);
              }}
            />
          </VoteBox>
        )}
        <LineBox>
          <Button
            bg="#7A37BE"
            margin="60px auto"
            width="212px"
            text="투표등록"
            _onClick={uploadVote}
          />
        </LineBox>
      </VoteWrapper>
    </React.Fragment>
  );
}

export default VoteWrite;

const VoteWrapper = styled.div`
  width: 994px;
  height: px;
  background: #ffffff;
  border-radius: 20px;
  padding: 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0px;
`;

const Title = styled.div`
  display: flex;
  width: 20%;
  height: 60px;
  box-sizing: border-box;
  padding: 18px 0px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  margin: 10px;
`;

const VoteBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 664px;
  margin: 0px auto;
  box-sizing: border-box;
`;

const ImageBox = styled.div`
  width: 664px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Image = styled.label`
  width: 264px;
  box-sizing: border-box;
  height: 144px;
  background: #f2f2f2;
  border-radius: 10px;
  margin: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  position: relative;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* justify-content: space-around; */
  margin: 20px 0px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileBox = styled.div`
  margin: "5px";
  display: flex;
  justify-content: space-between;
`;

const ImgButton = styled.label`
  border: none;
  background-color: #999;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  width: 30%;
  margin: 0px 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
