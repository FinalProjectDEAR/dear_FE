import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Input, Button } from "../elements";
import { OpenVidu } from "openvidu-browser";

import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { apis } from "../shared/apis";

import styled from "styled-components";

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

  const selectFile = (e) => {
    // const imgList = [...imgFile];
    // imgList.push(e.target.files);

    console.log(e.target.files);
    const imgList = e.target.files;

    let fileNameList = [...fileName];
    for (let i = 0; i < imgList.length; i++) {
      const fileName = imgList[i].name;
      fileNameList.push(fileName);
    }

    // let imgUrlList = [...previewImg];
    // for (let i = 0; i < imgList.length; i++) {
    //   const previewUrl = URL.createObjectURL(imgList[i]);
    //   imgUrlList.push(previewUrl);
    // }

    //이미지 용량 제한
    const imageSize = imgList.size; //이미지용량
    const maxSize = 5 * 1024 * 1024; //5MB
    if (imageSize > maxSize) {
      window.alert("첨부파일 용량은 5MB 이내로 등록 가능합니다.");
      return;
    }
    //이미지 장수 제한
    // if (imgUrlList.length > 3) {
    //   window.alert("이미지는 최대 3장까지 등록 가능합니다.");
    //   imgUrlList = imgUrlList.slice(0, 3);
    // }
    // setPreviewImg(imgUrlList);

    if (fileNameList.length > 3) {
      window.alert("이미지는 최대 3장까지 등록 가능합니다.");
      fileNameList = fileNameList.slice(0, 3);
    }
    setFileName(fileNameList);

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

  const deleteFile = (idx) => {
    const imgArr = imgFile.filter((item, i) => i !== idx);
    const imgUrlArr = previewImg.filter((item, i) => i !== idx);
    const fileNameArr = fileName.filter((item, i) => i !== idx);

    setFileName([...fileNameArr]);
    setImgFile([...imgArr]);
    setPreviewImg([...imgUrlArr]);
  };

  const submit = () => {
    if (chatTitle === "" || gender === "" || category === "") {
      window.alert("필수정보를 모두 입력해주세요!");
      return;
    }

    dispatch(chatActions.reqChatDB({ chatTitle, category, gender, fileList }));
  };

  return (
    <React.Fragment>
      <RequestContainer>
        <TitleBox>
          <Text batang weight="500" size="20px" textAlign="left">
            여러분의 고민에 대해 알려주세요!
          </Text>
          <Text margin="0px 10px" weight="300" size="14px">
            <span style={{ color: "red", marginRight: "4px" }}>*</span>필수입력
          </Text>
        </TitleBox>
        <LineBox>
          <ChatInfoBox>
            <Text weight="500" size="16px" color="#999999">
              한 줄 고민
              <span style={{ color: "red", marginLeft: "4px" }}>*</span>
            </Text>
          </ChatInfoBox>
          <InputBox>
            <Input
              padding="16px"
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
            <Text weight="500" size="16px" color="#999999">
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

        <LineBox>
          <Text
            batang
            margin="30px 0px 0px 0px "
            weight="500"
            size="20px"
            textAlign="left"
          >
            상담은 어떻게 진행할까요?
          </Text>
          <Text margin="30px 10px 0px 10px" weight="300" size="14px">
            <span style={{ color: "red", marginRight: "4px" }}> *</span>필수입력
          </Text>
        </LineBox>
        <LineBox>
          <ChatInfoBox>
            <Text weight="500" size="16px" color="#999999">
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
            <Text weight="500" size="16px" color="#999999">
              고민 상담에 필요한 자료 첨부
            </Text>
          </ChatInfoBox>
          <FileBox>
            <ImgButton htmlFor="subInfo">파일선택</ImgButton>
            <FileInput
              id="subInfo"
              type="file"
              multiple="multiple"
              onChange={(e) => {
                selectFile(e);
              }}
            />
            {fileName !== null || fileName.length !== 0
              ? fileName.map((item, idx) => {
                  return (
                    <FileTag key={idx}>
                      <Text color="#666666" weight="500" size="12px">
                        {item}
                      </Text>
                      <Deletebutton
                        onClick={() => {
                          deleteFile(idx);
                        }}
                      >
                        x
                      </Deletebutton>
                    </FileTag>
                  );
                })
              : null}
          </FileBox>
        </LineBox>
        <LineBox>
          <Button
            margin="40px auto"
            width="210px"
            bg="#7A37BE"
            text="고민 신청하기"
            cursor="pointer"
            _onClick={submit}
          />
        </LineBox>
      </RequestContainer>
    </React.Fragment>
  );
}
export default ResChatStart;

const RequestContainer = styled.div`
  width: 840px;
  height: 640px;
  margin: 80px auto;
  padding: 40px 60px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LineBox = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0px;
`;

const ChatInfoBox = styled.div`
  display: flex;
  width: 28%;
  height: 60px;
  box-sizing: border-box;
`;

const FileBox = styled.div`
  width: 70%;
  height: 60px;
  padding: 10px 0px 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  border: 1px solid #e6e6e6;
`;
const InputBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* justify-content: space-around; */
  height: 60px;
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

const ImgButton = styled.label`
  width: 58px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  margin-right: 10px;
  cursor: pointer;
  background: #e6e6e6;
  border: 1px solid #999999;

  border-radius: 5px;
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

const Deletebutton = styled.div`
  color: #cccccc;
  font-size: 20px;
  text-align: center;
  line-height: 13px;
  margin: 0px 0px 5px 10px;
  /* position: absolute;
  right: -5px;
  top: -5px; */
  cursor: pointer;
`;
