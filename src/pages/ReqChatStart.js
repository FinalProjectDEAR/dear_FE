import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { Text, TextB, Input, Button, Modal } from "../elements";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as chatActions } from "../redux/modules/chat";

import styled from "styled-components";
import attach from "../assets/vote/attach.png";

function ResChatStart() {
  const dispatch = useDispatch();

  const [chatTitle, setChatTitle] = React.useState("");
  const [category, setCategory] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [previewImg, setPreviewImg] = React.useState([]);
  const [fileName, setFileName] = React.useState([]);
  const [imgFile, setImgFile] = React.useState([]);

  const token = useSelector((state) => state.chat.token);
  const sessionId = useSelector((state) => state.chat.sessionId);
  const memberId = localStorage.getItem("memberId");
  const ninckname = localStorage.getItem("ninckname");
  const fileList = useSelector((state) => state.image.fileList);

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    history.push("/");
  };

  const selectFile = (e) => {
    console.log(e.target.files);
    const imgList = e.target.files;

    let imgUrlList = [...previewImg];
    for (let i = 0; i < imgList.length; i++) {
      const previewUrl = URL.createObjectURL(imgList[i]);
      imgUrlList.push(previewUrl);
    }

    console.log(imgUrlList);

    //이미지 용량 제한
    const imageSize = imgList.size; //이미지용량
    const maxSize = 5 * 1024 * 1024; //5MB
    if (imageSize > maxSize) {
      window.alert("첨부파일 용량은 5MB 이내로 등록 가능합니다.");
      return;
    }

    // 이미지 장수 제한
    if (imgUrlList.length > 3) {
      window.alert("이미지는 최대 3장까지 등록 가능합니다.");
      imgUrlList = imgUrlList.slice(0, 3);
    }
    setPreviewImg(imgUrlList);

    let imageFiles = [];
    for (const key in imgList) {
      if (Object.hasOwnProperty.call(imgList, key)) {
        imageFiles.push(imgList[key]);
      }
    }
    console.log(imageFiles);
    setImgFile(imageFiles);

    dispatch(imageActions.uploadImage(imageFiles));
  };

  //삭제
  const deleteFile = (idx) => {
    const imgArr = imgFile.filter((item, i) => i !== idx);
    const imgUrlArr = previewImg.filter((item, i) => i !== idx);
    const fileNameArr = fileName.filter((item, i) => i !== idx);

    setFileName([...fileNameArr]);
    setImgFile([...imgArr]);
    setPreviewImg([...imgUrlArr]);
  };

  //매칭신청
  const submit = () => {
    if (chatTitle === "" || gender === "" || category === "") {
      window.alert("필수정보를 모두 입력해주세요!");
      return;
    }

    dispatch(chatActions.reqChatDB({ chatTitle, category, gender, fileList }));
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <RequestContainer>
              <TitleBox>
                <TextB subTitle textAlign="left">
                  여러분의 고민에 대해 알려주세요!
                </TextB>
                <span style={{ color: "red", margin: "4px" }}>*</span>
                <Text sub7>필수입력</Text>
              </TitleBox>
              <LineBox>
                <ChatInfoBox>
                  <Text body4>
                    한 줄 고민
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </ChatInfoBox>
                <InputBox>
                  <Input
                    padding="10px 15px"
                    value={chatTitle}
                    placeholder="오늘의 고민을 한줄로 나타내주세요.(20자 이내)"
                    _onChange={(e) => {
                      setChatTitle(e.target.value);
                    }}
                  />
                </InputBox>
              </LineBox>
              <LineBox>
                <ChatInfoBox>
                  <Text body4>
                    상담 카테고리
                    <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                  </Text>
                </ChatInfoBox>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="썸"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    썸
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="고백"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    고백
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="연애중"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    연애중
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="이별"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    이별
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="재회"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    재회
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="기타"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    기타
                  </CheckBox>
                </InputBox>
              </LineBox>
              <SecondBox>
                <TitleBox>
                  <TextB subTitle textAlign="left">
                    상담은 어떻게 진행할까요?
                  </TextB>
                  <span style={{ color: "red", margin: "4px" }}>*</span>
                  <Text sub7>필수입력</Text>
                </TitleBox>
                <LineBox>
                  <ChatInfoBox>
                    <Text body4>
                      고민을 들어줄 리스너의 성별
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                  </ChatInfoBox>
                  <InputBox>
                    <CheckBox>
                      <input
                        type="radio"
                        name="gender"
                        value="none"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      상관없음
                    </CheckBox>
                    <CheckBox>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      남성
                    </CheckBox>
                    <CheckBox>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      여성
                    </CheckBox>
                  </InputBox>
                </LineBox>
                <LineBox>
                  <ChatInfoBox>
                    <Text body4>고민 상담에 필요한 자료 첨부</Text>
                  </ChatInfoBox>
                  <FileBox>
                    <ImgButtonLine>
                      <ImgButton htmlFor="subInfo" />
                      <Text sub7>이미지는 최대 3장까지 업로드 가능합니다.</Text>
                    </ImgButtonLine>
                  </FileBox>
                </LineBox>
                <ImageBox>
                  <FileInput
                    id="subInfo"
                    type="file"
                    multiple="multiple"
                    onChange={(e) => {
                      selectFile(e);
                    }}
                  />

                  {previewImg !== null || previewImg.length !== 0 ? (
                    previewImg.map((item, idx) => {
                      return (
                        <Picture src={previewImg[idx]} key={idx}>
                          <ImgDelbtn
                            onClick={() => {
                              deleteFile(idx);
                            }}
                          >
                            x
                          </ImgDelbtn>
                        </Picture>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </ImageBox>
              </SecondBox>

              <BottomBox>
                <Button
                  margin="40px auto"
                  size="regular"
                  cursor="pointer"
                  _onClick={submit}
                >
                  <Text body4 color="#fff">
                    리스너 매칭하기
                  </Text>
                </Button>
              </BottomBox>
            </RequestContainer>
          </React.Fragment>
        </Modal>
      )}
    </>
  );
}
export default ResChatStart;

const RequestContainer = styled.div`
  width: 840px;
  height: 680px;
  padding: 40px 40px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const SecondBox = styled.div`
  margin-top: 40px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
`;

const ChatInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  height: 54px;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 54px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  margin: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileBox = styled.div`
  width: 560px;
  height: 54px;
  padding: 15px 0px 0px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ImgButtonLine = styled.div`
  display: flex;
  align-items: center;
`;

const ImgButton = styled.label`
  border: none;
  width: 58px;
  height: 20px;
  margin-right: 8px;
  background-size: cover;
  background-image: url(${attach});
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    height: 25px;
  }
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-left: 240px;
  width: 530px;
  height: 176px;

  border: 1px solid #e6e6e6;
`;

const FileTag = styled.div`
  width: auto;
  height: 30px;
  padding: 4px 8px;
  margin: 0px 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 4px;
`;

const Picture = styled.div`
  width: 140px;
  height: 140px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  margin: 10px;
  border-radius: 4px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  position: relative;
`;
const ImgDelbtn = styled.div`
  color: #333;
  font-size: 15px;
  text-align: center;
  line-height: 18px;
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
`;

// const Deletebutton = styled.div`
//   color: #cccccc;
//   font-size: 20px;
//   text-align: center;
//   line-height: 13px;
//   margin: 0px 0px 5px 10px;
//   /* position: absolute;
//   right: -5px;
//   top: -5px; */
//   cursor: pointer;
// `;

const BottomBox = styled.div`
  width: 100%;
  height: 36px;
  margin: auto;

  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;
