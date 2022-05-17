import React, { useRef } from "react";
import { Input, Text, TextB, Button, Modal } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as voteActions } from "../redux/modules/vote";

// import assets
import uploadImg from "../assets/upload.png";
import attach from "../assets/vote/attach.png";
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

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    history.push("/board");
  };

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
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <VoteWrapper>
              <LineBox>
                <TextB subTitle>간단한 고민을 투표로 물어보세요! </TextB>
                <Text sub6 margin="0px 10px">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  필수입력
                </Text>
              </LineBox>

              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 주제
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  </Text>
                </Title>
                <InputBox>
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
              </LineBox>
              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 내용
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  </Text>
                </Title>
                <div style={{ width: "546px" }}>
                  <Input
                    margin="0px"
                    padding="14px"
                    multiLine
                    _onKeyUp={checkLength}
                    maxlength="200"
                    placeholder=" 구체적인 내용을 200자 이내로 입력해주세요."
                    value={contents}
                    rows={3}
                    _onChange={(e) => {
                      setContents(e.target.value);
                    }}
                  />
                </div>
              </LineBox>
              <Text sub7 textAlign="right" margin="0px">
                {textLength}/ 200자
              </Text>
              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 형식
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  </Text>
                </Title>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="type"
                      value="letter"
                      onChange={() => {
                        setImageVote(false);
                      }}
                    />
                    선택지
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
                    선택지 + 이미지
                  </CheckBox>
                </InputBox>
              </LineBox>

              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 항목
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  </Text>
                </Title>
                <InputBox>
                  <Input
                    margin="0px"
                    padding="16px"
                    placeholder="5자 이내로 입력해주세요."
                    value={voteLeft}
                    _onChange={(e) => {
                      setVoteLeft(e.target.value);
                    }}
                  />

                  <Text body4 margin="0px 24px">
                    VS
                  </Text>
                  <Input
                    margin="0px"
                    padding="16px"
                    placeholder="5자 이내로 입력해주세요."
                    value={voteRight}
                    _onChange={(e) => {
                      setVoteRight(e.target.value);
                    }}
                  />
                </InputBox>
              </LineBox>

              <ImgInputBox>
                {imgVote && (
                  <>
                    <ImageBox>
                      <ImgButton htmlFor="leftImage"></ImgButton>
                      <Image src={leftPreview ? leftPreview : uploadImg} />
                      <FileInput
                        id="leftImage"
                        type="file"
                        ref={imageLeft}
                        onChange={() => {
                          selectFile("left");
                        }}
                      />
                    </ImageBox>
                    <ImageBox>
                      <ImgButton htmlFor="rightImage"></ImgButton>
                      <Image src={rightPreview ? rightPreview : uploadImg} />
                      <FileInput
                        id="rightImage"
                        type="file"
                        ref={imageRight}
                        onChange={() => {
                          selectFile("right");
                        }}
                      />
                    </ImageBox>
                  </>
                )}
              </ImgInputBox>

              <div>
                <Button size="regular" margin="10px auto" _onClick={uploadVote}>
                  <Text body4 color="#fff" margin="0">
                    투표등록
                  </Text>
                </Button>
              </div>
            </VoteWrapper>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
}

export default VoteWrite;

const VoteWrapper = styled.div`
  width: 736px;
  height: 680px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin: 5px 0px;
`;

const Title = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 140px;
  height: 60px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 546px;
`;

const ImgInputBox = styled.div`
  margin-left: 125px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 490px;
  height: 250px;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 24px;
  margin-right: 40px;
`;

const ImageBox = styled.div`
  width: 210px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ImgButton = styled.label`
  border: none;
  width: 58px;
  height: 20px;
  margin-bottom: 10px;
  background-size: cover;
  background-image: url(${attach});
  cursor: pointer;
`;

const Image = styled.label`
  width: 100px;
  height: 90px;
  background: #f2f2f2;
  border-radius: 10px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const FileInput = styled.input`
  display: none;
`;
