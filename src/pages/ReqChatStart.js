import React, { useRef } from "react";
//리덕스
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as chatActions } from "../redux/modules/chat";
//스타일
import styled from "styled-components";
import { Text, TextB, Input, Button, Modal } from "../elements";
import { ReactComponent as Arrow } from "../assets/main/arrow.svg";
import { ReactComponent as ImageUPload } from "../assets/postList/파일첨부.svg";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

function ResChatStart() {
  const dispatch = useDispatch();

  const [chatTitle, setChatTitle] = React.useState("");
  const [category, setCategory] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [previewImg, setPreviewImg] = React.useState([]);
  const [imgFile, setImgFile] = React.useState([]);
  const [audioPermit, setAudioPermit] = React.useState("");

  const fileList = useSelector((state) => state.image.fileList);
  const chatFile = fileList.slice(0, 3);

  // //오디오 액세스 요청
  // React.useEffect(() => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then((stream) => {
  //       setAudioPermit(true);
  //       return;
  //     })
  //     .catch((err) => {
  //       Swal.fire("오디오 접근이 거절되었습니다. 설정에서 승인해주세요.");
  //       setAudioPermit(false);
  //       return;
  //     });
  // }, [audioPermit]);

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    dispatch(imageActions.delData());
    setModalOpen(false);
    history.push("/");
  };

  const selectFile = (e) => {
    const imgList = e.target.files;

    let imgUrlList = [...previewImg];
    for (let i = 0; i < imgList.length; i++) {
      const previewUrl = URL.createObjectURL(imgList[i]);
      imgUrlList.push(previewUrl);
    }

    //이미지 용량 제한
    const imageSize = imgList.size; //이미지용량
    const maxSize = 5 * 1024 * 1024; //5MB
    if (imageSize > maxSize) {
      Swal.fire("첨부파일 용량은 5MB 이내로 등록 가능합니다.");
      return;
    }

    // 이미지 장수 제한
    if (imgUrlList.length > 3) {
      Swal.fire("이미지는 최대 3장까지 등록 가능합니다.");
      imgUrlList = imgUrlList.slice(0, 3);
    }
    setPreviewImg(imgUrlList);

    let imageFiles = [];
    for (const key in imgList) {
      if (Object.hasOwnProperty.call(imgList, key)) {
        imageFiles.push(imgList[key]);
      }
    }

    setImgFile(imageFiles);

    dispatch(imageActions.uploadImage(imageFiles));
  };

  //삭제
  const deleteFile = (idx) => {
    dispatch(imageActions.delImage(idx));
    const imgUrlArr = previewImg.filter((item, i) => i !== idx);
    setPreviewImg([...imgUrlArr]);
  };

  //매칭신청
  const submit = () => {
    // if (audioPermit === false) {
    //   Swal.fire("오디오와 비디오 권한을 허용해주세요.");
    //   return;
    // }

    if (chatTitle === "" || gender === "" || category === "") {
      Swal.fire("필수정보를 모두 입력해주세요.");
      return;
    }
    dispatch(chatActions.reqChatDB({ chatTitle, category, gender, chatFile }));
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            <RequestContainer>
              <ArrowLine>
                <Arrow
                  onClick={() => {
                    history.goBack();
                  }}
                />
              </ArrowLine>
              <TitleBox>
                <TextB subTitle textAlign="left">
                  여러분의 고민에 대해 알려주세요!
                </TextB>
                <span style={{ color: "red", marginLeft: "10px" }}>*</span>
                <Text sub7 margin="0px 4px">
                  필수입력
                </Text>
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
                    margin="0px"
                    padding="15px 15px"
                    value={chatTitle}
                    maxlength="30"
                    placeholder="오늘의 고민을 30자 이내로 입력해주세요."
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
                      value="솔로"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      솔로
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="짝사랑"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      짝사랑
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="썸"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      썸
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="category"
                      value="연애"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    />
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      연애
                    </Text>
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
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      이별
                    </Text>
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
                    <Text
                      sub6
                      textAlign="center"
                      color="#333"
                      margin="0px 10px"
                    >
                      기타
                    </Text>
                  </CheckBox>
                </InputBox>
              </LineBox>
              <SecondBox>
                <TitleBox>
                  <TextB subTitle textAlign="left">
                    상담은 어떻게 진행할까요?
                  </TextB>
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
                      <Text
                        sub6
                        textAlign="center"
                        color="#333"
                        margin="0px 10px"
                      >
                        상관없음
                      </Text>
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
                      <Text
                        sub6
                        textAlign="center"
                        color="#333"
                        margin="0px 10px"
                      >
                        남성
                      </Text>
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
                      <Text
                        sub6
                        textAlign="center"
                        color="#333"
                        margin="0px 10px"
                      >
                        여성
                      </Text>
                    </CheckBox>
                  </InputBox>
                </LineBox>
                <LineBox>
                  <ChatInfoBox>
                    <Text body4>고민 상담에 필요한 자료 첨부</Text>
                  </ChatInfoBox>
                  <FileBox>
                    <ImgButtonLine>
                      <ImgButton htmlFor="subInfo">
                        <ImageUPload />
                      </ImgButton>
                      <Text sub7 margin="0px 10px">
                        이미지는 최대 3장까지 업로드 가능합니다.
                      </Text>
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
                    previewImg.map((image, idx) => {
                      return (
                        <Picture src={image} key={idx}>
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
                <Button margin="40px auto" size="regular" _onClick={submit}>
                  <Text body4 color="#fff" cursor="pointer">
                    리스너 매칭하기
                  </Text>
                </Button>
              </BottomBox>
            </RequestContainer>
          </React.Fragment>
          <MobileButton onClick={submit}>
            <Text body4 color="#fff" cursor="pointer" textAlign="center">
              리스너 매칭하기
            </Text>
          </MobileButton>
        </Modal>
      )}
    </>
  );
}
export default ResChatStart;

const RequestContainer = styled.div`
  width: 840px;
  height: 575px;
  box-sizing: border-box;
  padding: 40px 40px;
  background: #ffffff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    min-height: 100%;
    padding: 44px 20px;
    border-radius: 0px;
    overflow: scroll;
  }
`;

const ArrowBack = styled.img`
  display: none;
  width: 24px;
  cursor: pointer;
`;

const ArrowLine = styled.div`
  display: none;
  width: 320px;
  height: 24px;
  margin-bottom: 24px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    ${ArrowBack} {
      display: flex;
      justify-content: flex-start;
    }
  }
`;

const SecondBox = styled.div`
  margin-top: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 40px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 15px;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 320px;
  }
`;

const ChatInfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 240px;
  height: 54px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 26px;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 54px;
  width: 70%;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 40px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  margin: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: flex-start;
    margin: 5px 0px;
    margin-right: 20px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 560px;
  height: 54px;
  box-sizing: border-box;
  padding-top: 15px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 40px;
  }
`;

const ImgButtonLine = styled.div`
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 30px;
  }
`;

const ImgButton = styled.label`
  width: 58px;
  height: 20px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  @media ${({ theme }) => theme.device.mobile} {
    width: 63px;
    height: 22px;
  }
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 523px;
  height: 110px;
  margin-left: 235px;
  border: 1px solid #e6e6e6;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 320px;
    height: auto;
    margin-left: 0px;
    border: none;
  }
`;

const Picture = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: 10px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  @media ${({ theme }) => theme.device.mobile} {
    width: 304px;
    height: 180px;
  }
`;
const ImgDelbtn = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 18px;
  height: 18px;
  color: #333;
  font-size: 15px;
  text-align: center;
  line-height: 18px;
  cursor: pointer;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 36px;
  margin: auto;
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
