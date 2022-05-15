import React, { useState } from "react";
import { ReactComponent as ImageUPload } from "../assets/파일첨부.svg";
import { Input, Button, Text } from "../elements";
import styled from "styled-components";

import { BiX } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { imgActions } from "../redux/modules/imagePost";

function PostWrite() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  // //상세페이지에 있는 정보 가져오기
  React.useEffect(() => {
    if (postId) dispatch(actionCreators.getDetailDB(postId));
  }, []);

  const [imgPreview, setImgPreview] = useState([]);
  const [title, setTitle] = React.useState("");
  const [contents, setContent] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [textLength, setTextLength] = React.useState(0);
  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    // if (wordLength <= 20) {
    //   window.alert("20자 이상 작성 부탁드립니다");
    //   return;
    // }
    if (wordLength >= 1000) {
      window.alert("1,000자 이상 작성할 수 없습니다.");
      return;
    }
    setTextLength(wordLength);
  };
  const SelectCategory = (e) => {
    setCategory(e.target.value);
  };
  // 이미지 관련
  const fileInput = React.useRef();
  //리듀서로 보낸 사진파일들 불러오기
  const files = useSelector((state) => state.imagePost.files);
  //이미지 선택하기 및 미리보기
  const selectFile = (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...imgPreview];
    const maxImageCnt = 3;
    if (imageList.length > maxImageCnt) {
      window.alert("첨부 파일은 최대 3개까지 가능합니다.");
      console.log("한번에 3장 이상 인풋한 경우");
      return;
    }
    if (files.length + imageList.length > 3) {
      window.alert("첨부 파일은 최대 3개까지 가능합니다.");
      console.log("이미 3장이 입력 되어있는데 1장 더 추가 한 경우");
      return;
    } else {
      let file = [];
      const imageSize = imageList.size; //이미지용량
      const maxSize = 5 * 1024 * 1024; //5MB
      if (imageSize > maxSize) {
        window.alert("첨부파일 용량은 5MB 이내로 등록 가능합니다.");
        return;
      }
      //파일들을 꺼내 배열 안에 넣어주기
      for (const key in imageList) {
        if (Object.hasOwnProperty.call(imageList, key)) {
          file.push(imageList[key]);
        }
      }
      for (let i = 0; i < Math.min(imageList.length, maxImageCnt); i++) {
        const currentImageUrl = URL.createObjectURL(imageList[i]);
        imageUrlList.push(currentImageUrl);
      }
      //프리뷰 최대 3장 제한
      if (imageUrlList.length > 3) {
        imageUrlList = imageUrlList.slice(0, 3);
      }
      setImgPreview(imageUrlList);
      dispatch(imgActions.setPre(file));
    }
  };
  //이미지 미리보기 삭제하기
  const CancelImage = (image, id) => {
    //리덕스에 있는 files 삭제
    dispatch(imgActions.deletePre(id));
    //프리뷰 삭제
    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };
  //추가하기 액션
  const addPost = () => {
    if (title === "" || category === "" || contents === "") {
      window.alert("내용을 모두 작성해주세요!");
      return;
    }
    dispatch(
      actionCreators.addPostDB({
        title,
        category,
        contents,
        files,
        postId,
      })
    );
  };
  //optionalChaining: ?. (useEffect는 리턴 후 실행)
  return (
    <React.Fragment>
      <WriteWrapper>
        <TitleContainer>
          <TitleBox>상담신청하기</TitleBox>
          <SubTitleBox>해당 글은 익명으로만 작성됩니다.</SubTitleBox>
        </TitleContainer>
        <CategoryWrapper>
          <Title>카테고리</Title>
          <Select name="category" form="myForm" onChange={SelectCategory}>
            <option value="카테고리">카테고리 선택</option>
            <option value="썸">썸</option>
            <option value="고백">고백</option>
            <option value="연애중">연애중</option>
            <option value="19금">19금</option>
            <option value="재회">재회</option>
            <option value="이별">이별</option>
            <option value="기타">기타</option>
          </Select>
        </CategoryWrapper>
        <TitleWrapper>
          <Title>제목</Title>
          <Input
            placeholder="제목을 입력해주세요."
            _onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </TitleWrapper>
        <ContentWrapper>
          <Title>내용</Title>
          <TextWrapper>
            <Input
              placeholder="내용을 입력해주세요. (최소 20자 이상)"
              _onChange={(e) => {
                setContent(e.target.value);
              }}
              _onKeyUp={checkMaxLength}
              value={contents}
              multiLine
              maxlength="1000"
              rows={16}
            />
          </TextWrapper>
        </ContentWrapper>
        <ImageWrapper>
          <Title>첨부파일</Title>
          <div>
            <PhotoContainer>
              <PhotoUpload>
                <label>
                  {/* <img
                    src="https://res.kurly.com/pc/ico/1806/img_add_thumb_x2.png"
                    style={{
                      width: "20px",
                      marginTop: "33px",
                    }}
                    alt="이미지플러스"
                  /> */}
                  <ImageUPload />
                  <input
                    type="file"
                    onChange={selectFile}
                    ref={fileInput}
                    multiple="multiple"
                    accept=".jpg,.png"
                  />
                </label>
                <PhotoDesc>사진은 최대 3장 업로드 가능합니다.</PhotoDesc>
              </PhotoUpload>
            </PhotoContainer>
            <PhotoDiv>
              {imgPreview.map((image, id) => {
                return (
                  <PhotoWrap>
                    <Img
                      key={id}
                      style={{
                        width: "80px",
                        marginTop: "5px",
                      }}
                      src={`${image}` ? `${image}` : null}
                      alt={`${image}-${id}`}
                    />
                    <BiX
                      type="button"
                      onClick={() => {
                        CancelImage(image, id);
                      }}
                    />
                  </PhotoWrap>
                );
              })}
            </PhotoDiv>
          </div>
        </ImageWrapper>
        <BtnWrap>
          <Button
            _onClick={() => {
              history.push("/postList");
            }}
            width="120px"
            height="42px"
            bg="#948A9E"
            border="1px solid #948A9E;"
            cursor="pointer"
          >
            <Text margin="1px 0 0 0" color="white">
              목록
            </Text>
          </Button>

          <Button
            _onClick={addPost}
            width="120px"
            height="42px"
            bg="#61586A"
            cursor="pointer"
          >
            <Text margin="1px 0 0 0" color="white">
              상담신청
            </Text>
          </Button>
        </BtnWrap>
      </WriteWrapper>
    </React.Fragment>
  );
}

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  max-width: 1032px;
  width: 100%;
  height: 861px;
  margin: auto;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 0px 0px 10px 40px;
  gap: 660px;
  width: 952px;
  height: 60px;
  flex: none;
  order: 0;
  flex-grow: 0;
  /* background: orange; */
`;
const TitleBox = styled.div`
  width: 98px;
  height: 30px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  color: #2e2a32;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const SubTitleBox = styled.div`
  width: 158px;
  height: 14px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #999999;
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  gap: 20px;
  width: 952px;
  height: 60px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  /* background: pink; */
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  gap: 20px;
  width: 952px;
  height: 60px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #948a9e;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 5px 40px;
  gap: 10px;
  width: 160px;
  height: 28px;
  flex: none;
  order: 0;
  flex-grow: 0;
  border-right: 1px solid #cccccc;
  color: #666666;
`;
const Select = styled.select`
  width: 181px;
  height: 42px;
  background: #f5f4f5;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  margin-left: 10px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  gap: 20px;
  width: 952px;
  height: 303px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
`;
const TextWrapper = styled.div`
  width: 860px;
  height: 295px;
`;
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 952px;
  height: 182px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
`;
const PhotoWrap = styled.div`
  display: flex;
  height: 8px;
  padding-top: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
`;
const PhotoDesc = styled.div`
  display: flex;
  padding: 4px;
  width: 220px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  color: #666;
  outline: none;
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const PhotoUpload = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 4px;
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const Img = styled.img`
  width: 100%;
  margin-right: -10px;
  width: 80px;
  height: 80px;
  &:hover {
    transition: 0.4s;
    transform: scale(4.9);
    -webkit-transform: scale(4.9);
    -moz-transform: scale(4.9);
    -ms-transform: scale(4.9);
    -o-transform: scale(4.9);
  }
`;
const PhotoContainer = styled.div`
  display: flex;
  height: 40px;
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  /* padding: 20px 0px 0px; */
  gap: 20px;
  width: 952px;
  height: 60px;
  flex: none;
  order: 1;
  flex-grow: 0;
  justify-content: space-between;
  /* background: pink; */
`;
export default PostWrite;
