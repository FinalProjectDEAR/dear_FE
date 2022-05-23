import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Input, Text, TextB, Button, Modal } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as voteActions } from "../redux/modules/vote";

// import assets
import uploadImg from "../assets/upload.png";
import attach from "../assets/vote/attach.png";
import arrowBack from "../assets/arrow_back.png";
import styled from "styled-components";

function VoteWrite() {
  //모바일 사이즈
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

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
    history.push("/postList");
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
          imgVote,
          title,
          contents,
          voteLeft,
          voteRight,
          _imageLeft,
          _imageRight
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
      dispatch(
        voteActions.addVoteDB(imgVote, title, contents, voteLeft, voteRight)
      );
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <VoteWrapper>
              <LineBox>
                <ArrowBack
                  src={arrowBack}
                  onClick={() => {
                    history.goBack();
                  }}
                />
              </LineBox>
              <SubjectBox>
                <TextB subTitle>간단한 고민을 투표로 물어보세요! </TextB>
                <span style={{ color: "red", margin: "0px 4px" }}>*</span>
                <Font sub6 margin="0px 10px">
                  필수입력
                </Font>
              </SubjectBox>

              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 주제
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </Title>
                <InputBox>
                  <Input
                    margin="0px"
                    padding="14px"
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
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </Title>
                <TextAreaBox>
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
                </TextAreaBox>
              </LineBox>
              <Text sub7 textAlign="right" margin="0px">
                {textLength}/ 200자
              </Text>
              <LineBox>
                <Title>
                  <Text body4 textAlign="left">
                    투표 형식
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
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
                    <Text sub6 margin="0px" color="#333333">
                      선택지
                    </Text>
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
                    <Text sub6 margin="0px" color="#333333">
                      선택지 + 이미지
                    </Text>
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
                    padding="14px"
                    placeholder="10자 이내 입력"
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
                    padding="14px"
                    placeholder="10자 이내 입력"
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
              <BottomBox>
                <Button size="regular" cursor="pointer" _onClick={uploadVote}>
                  <Text body4 color="#fff" cursor="pointer" textAlign="center">
                    투표등록
                  </Text>
                </Button>
              </BottomBox>
            </VoteWrapper>
          </React.Fragment>
          <MobileButton onClick={uploadVote}>
            <Text body4 color="#fff" cursor="pointer" textAlign="center">
              투표등록
            </Text>
          </MobileButton>
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

  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    height: 834px;
    padding: 20px;
    border-radius: 0px;
  }
`;

const Font = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #999999;
`;

const ArrowBack = styled.img`
  display: none;
  width: 24px;
  cursor: pointer;
`;

const SubjectBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  margin: 5px 0px;
  @media ${({ theme }) => theme.device.mobile} {
    ${Font} {
      display: none;
    }
    height: 70px;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  margin: 5px 0px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    ${ArrowBack} {
      display: flex;
    }
  }
`;

const Title = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 140px;
  height: 60px;

  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 140px;
    height: 28px;
  }
`;

const TextAreaBox = styled.div`
  width: 546px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 546px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 50px;
  }
`;

const ImgInputBox = styled.div`
  margin-left: 125px;
  display: flex;
  justify-content: space-between;
  width: 490px;
  height: 250px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: 0px;
    width: 320px;
    height: 160px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 24px;
  margin-right: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 14px;
  }
`;

const ImageBox = styled.div`
  width: 210px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media ${({ theme }) => theme.device.mobile} {
    width: 130px;
    height: 130px;
  }
`;

const ImgButton = styled.label`
  border: none;
  width: 58px;
  height: 20px;
  margin-bottom: 10px;
  background-size: cover;
  background-image: url(${attach});
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    height: 25px;
  }
`;

const Image = styled.label`
  width: 100px;
  height: 90px;
  background: #f2f2f2;
  border-radius: 10px;
  box-sizing: border-box;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    width: 130px;
    height: 130px;
  }
`;

const BottomBox = styled.div`
  width: 100%;
  height: 36px;
  margin: 10px auto;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileButton = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 360px;
  height: 48px;

  background: #7a37be;
  border-radius: 0px;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    position: fixed;
    bottom: 0;
  }
`;

const FileInput = styled.input`
  display: none;
`;
