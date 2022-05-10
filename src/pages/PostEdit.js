import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Button, Input } from "../elements/index";

import { BiX } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { imgActions } from "../redux/modules/imagePost";

function PostEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.postId;
  // //상세페이지에 있는 정보 가져오기
  React.useEffect(() => {
    if (postId) dispatch(actionCreators.getDetailDB(postId));
  }, []);
  const post = useSelector((state) => state.post.detailPost);
  console.log(post);

  const [imgPreview, setImgPreview] = useState([]);
  const [title, setTitle] = React.useState(post?.title);
  const [contents, setContent] = React.useState(post?.contents);
  const [category, setCategory] = React.useState(post?.category);
  const [textLength, setTextLength] = React.useState(0);
  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    console.log("유즈이펙트 시작한다~~");
    setTitle(post?.title);
    setContent(post?.contents);
    setCategory(post?.category);
  }, [post]);
  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength <= 20) {
      window.alert("20자 이상 작성 부탁드립니다");
      return;
    }
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
  console.log("리듀서로 보낸 사진파일들 불러오기", files);
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
    //프리뷰 삭제 (글작성)
    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };
  //기존 이미지 url
  const imgUrl = post?.imgUrl;
  console.log("기존 이미지 url", imgUrl);
  //새로 올린 파일과 기존 사진 url을 분리
  let newFiles = [];
  let editUrl = [];
  files.map((e, i) => {
    if (e) {
      newFiles.push(e);
      console.log("새로운 사진", newFiles);
    }
    if (!e) {
      editUrl.push(e);
      console.log("기존url", editUrl);
    }
  });
  useEffect(() => {
    let editPreview = [];
    //서버에서 받은 url을 preview에 넣어줌
    imgUrl &&
      imgUrl.map((e, i) => {
        if (e !== null) {
          console.log(e);
          return editPreview.push(imgUrl[i]);
        }
      });
    setImgPreview(editPreview);
    console.log(editPreview);
    //리덕스 files 인덱스를 맞추기 위해 url도 같이 넣어줌
    dispatch(imgActions.setPre(editPreview));
  }, []);

  //수정하기 액션
  const editPost = () => {
    dispatch(
      actionCreators.editPostDB({
        title,
        category,
        contents,
        newFiles,
        editUrl,
        postId,
      })
    );
    dispatch(imgActions.resetFile());
  };
  return (
    <React.Fragment>
      <PostWrap>
        <TitleWrap>
          <TitleContainer>상담 수정하기</TitleContainer>
        </TitleWrap>

        <WriteWrap>
          <CategoryWrap>
            <Title>카테고리</Title>

            <Select
              name="category"
              form="myForm"
              onChange={SelectCategory}
              value={category || ""}
            >
              <option value="null">카테고리 선택</option>
              <option value="썸">썸</option>
              <option value="고백">고백</option>
              <option value="연애중">연애중</option>
              <option value="19금">19금</option>
              <option value="재회">재회</option>
              <option value="이별">이별</option>
              <option value="기타">기타</option>
            </Select>
          </CategoryWrap>
          <TitleInputWrap>
            <Title>제목</Title>
            <InputWrap>
              <Input
                placeholder="제목을 입력해주세요."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title || ""}
              />
            </InputWrap>
          </TitleInputWrap>
          <ContentWrap>
            <Title>내용</Title>
            <TextWrap>
              <Input
                placeholder="내용을 입력해주세요. (최소 20자 이상)"
                _onChange={(e) => {
                  setContent(e.target.value);
                }}
                _onKeyUp={checkMaxLength}
                value={contents || ""}
                multiLine
                maxlength="1000"
                rows={16}
              />
            </TextWrap>
          </ContentWrap>
          <PhotoWrap>
            <Title>첨부파일</Title>
            <PhotoContainer>
              <PhotoDesc>사진은 최대 3장 업로드 가능합니다.</PhotoDesc>
              <PhotoUpload>
                <label>
                  <img
                    src="https://res.kurly.com/pc/ico/1806/img_add_thumb_x2.png"
                    style={{
                      width: "20px",
                      marginTop: "33px",
                    }}
                    alt="이미지플러스"
                  />
                  <input
                    type="file"
                    onChange={selectFile}
                    ref={fileInput}
                    multiple="multiple"
                    accept=".jpg,.png"
                  />
                </label>
              </PhotoUpload>
              <PhotoDiv>
                {imgPreview.map((image, id) => {
                  return (
                    <PhotoDiv>
                      <Img
                        key={id}
                        style={{
                          width: "80px",
                          marginTop: "5px",
                        }}
                        src={image}
                        alt={`${image}-${id}`}
                      />
                      <BiX
                        type="button"
                        onClick={() => {
                          CancelImage(image, id);
                        }}
                      />
                    </PhotoDiv>
                  );
                })}
              </PhotoDiv>
            </PhotoContainer>
          </PhotoWrap>
          <BtnWrap>
            <Button
              _onClick={() => {
                history.goBack();
              }}
              width="120px"
              height="42px"
              bg="#FFFFFF;"
              border="1px solid #948A9E;"
              cursor="pointer"
            >
              <Text margin="1px 0 0 0" color="#333333;">
                뒤로 가기
              </Text>
            </Button>
            <Button
              _onClick={editPost}
              width="120px"
              height="42px"
              bg="#61586A"
              cursor="pointer"
            >
              <Text size="16.5px" margin="1px 0 0 0" color="white">
                수정하기
              </Text>
            </Button>
          </BtnWrap>
        </WriteWrap>
      </PostWrap>
    </React.Fragment>
  );
}
const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  position: absolute;
  max-width: 1200px;
  height: 847px;
  left: 360px;
  top: 245px;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  box-sizing: border-box;
`;
const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 0px 14px 40px;
  position: static;
  width: 1087px;
  height: 80px;
  left: 40px;
  top: 40px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  /* background-color: yellow; */
`;
const TitleContainer = styled.div`
  position: static;
  width: 130px;
  height: 30px;
  left: 40px;
  top: 36px;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 14px;
  color: #2e2a32;
  /* background-color: red; */
`;
const WriteWrap = styled.div`
  position: static;
  width: 1120px;
  height: 687px;
  left: 40px;
  top: 120px;
  /* background-color: violet; */
  box-sizing: border-box;
`;
const CategoryWrap = styled.div`
  position: absolute;
  width: 1120px;
  height: 62px;
  left: 40px;
  top: 120px;
  /* background-color: orange; */
  display: flex;
  /* border-top: 1px solid #666666; */
`;
const Title = styled.div`
  width: 200px;
  height: 24px;
`;
const Select = styled.select`
  width: 181px;
  height: 42px;
  /* background: #f5f4f5; */
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  margin-left: 40px;
`;
const TitleInputWrap = styled.div`
  position: absolute;
  width: 1120px;
  height: 60px;
  left: 40px;
  top: 180px;
  display: flex;
  /* background-color: green; */
`;
const InputWrap = styled.div`
  position: static;
  width: 860px;
  height: 40px;
  left: 240px;
  top: 10px;
`;
const ContentWrap = styled.div`
  position: absolute;
  width: 1120px;
  height: 305px;
  left: 40px;
  top: 240px;
  display: flex;
  /* background-color: #8ecae6; */
`;
const TextWrap = styled.div`
  /* box-sizing: border-box; */
  width: 860px;
  height: 295px;
`;
const PhotoWrap = styled.div`
  display: flex;
  position: absolute;
  width: 1120px;
  height: 182px;
  left: 40px;
  top: 563px;
  /* background-color: #ffddd2; */
`;
const PhotoDesc = styled.div`
  display: flex;
  position: static;
  width: 220px;
  height: 18px;
  left: 0px;
  top: 5px;
  padding: 10 10px;
  font-size: 12px;
  text-align: center;
  color: #666;
  line-height: 18px;
  outline: none;
`;
const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const PhotoUpload = styled.div`
  text-align: center;
  width: 80px;
  height: 80px;
  border: 1px solid #dddfe1;
  margin: 10px;
  padding-bottom: 10px;
  display: block;
  /* background-color: #f5f4f5; */
  border-radius: 13px;
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
  margin-top: 10px;
  margin-left: 10px;
  width: 80px;
  height: 80px;
  &:hover {
    transform: scale(4.9);
    -webkit-transform: scale(4.9);
    -moz-transform: scale(4.9);
    -ms-transform: scale(4.9);
    -o-transform: scale(4.9);
  }
`;
const PhotoContainer = styled.div`
  /* div로 묶어줘야 모양이 나옴.. */
`;
const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px 0px;
  margin-left: 10px;
  position: absolute;
  width: 1120px;
  height: 62px;
  left: 40px;
  top: 745px;
`;
export default PostEdit;
