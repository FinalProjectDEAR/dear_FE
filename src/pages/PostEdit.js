import React, { useEffect, useState } from "react";
//라우터
import { useHistory, useParams } from "react-router-dom";
//리덕스
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/post";
import { imgActions } from "../redux/modules/imagePost";
//스타일
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { Text, Button, Input } from "../elements/index";
import { BiX } from "react-icons/bi";
import { ReactComponent as ImageUPload } from "../assets/postList/파일첨부.svg";

import Layout from "../components/Layout";

function PostEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = parseInt(params.postId);

  // //상세페이지에 있는 정보 가져오기
  React.useEffect(() => {
    if (postId) dispatch(actionCreators.getDetailDB(postId));
  }, []);
  const post = useSelector((state) => state.post.detailPost);

  const [imgPreview, setImgPreview] = useState([]);
  const [title, setTitle] = React.useState(post?.title);
  const [contents, setContent] = React.useState(post?.contents);
  const [category, setCategory] = React.useState(post?.category);
  const [textLength, setTextLength] = React.useState(0);

  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    setTitle(post?.title);
    setContent(post?.contents);
    setCategory(post?.category);
  }, [post]);

  //글자 수 제한
  const checkMaxLength = (e) => {
    let wordLength = e.target.value.length;
    if (wordLength >= 1000) {
      Swal.fire("1,000자 이상 작성할 수 없습니다.");
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
      Swal.fire("첨부 파일은 최대 3개까지 가능합니다.");
      return;
    }
    if (files.length + imageList.length > 3) {
      Swal.fire("첨부 파일은 최대 3개까지 가능합니다.");
      return;
    } else {
      let file = [];
      const imageSize = imageList.size; //이미지용량
      const maxSize = 5 * 1024 * 1024; //5MB
      if (imageSize > maxSize) {
        Swal.fire("첨부파일 용량은 5MB 이내로 등록 가능합니다.");
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

  //새로 올린 파일과 기존 사진 url을 분리
  let newFiles = [];
  let editUrl = [];
  files.map((e, i) => {
    if (newFiles > 4) {
      //리듀서에 3장 넘게 들어간 경우
      return;
    }
    if (e) {
      newFiles.push(e); // 새로운 사진: newFiles
    }
    if (!e) {
      editUrl.push(e); //기존url: editUrl)
    }
  });

  useEffect(() => {
    let editPreview = [];
    //서버에서 받은 url을 preview에 넣어줌
    imgUrl &&
      imgUrl.map((e, i) => {
        if (e !== null) {
          return editPreview.push(imgUrl[i]);
        }
      });
    setImgPreview(editPreview);
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
      <Layout>
        <BackGround>
          <WriteWrapper>
            <TitleContainer>
              <Text title textAlign="left">
                수정하기
              </Text>
            </TitleContainer>
            <CategoryWrapper>
              <Title>카테고리</Title>
              <Select
                name="category"
                form="myForm"
                onChange={SelectCategory}
                value={category || ""}
              >
                <option value="null">카테고리 선택</option>
                <option value="솔로">솔로</option>
                <option value="짝사랑">짝사랑</option>
                <option value="썸">썸</option>
                <option value="연애">연애</option>
                <option value="이별">이별</option>
                <option value="기타">기타</option>
              </Select>
            </CategoryWrapper>
            <TitleWrapper>
              <Title>제목</Title>
              <InputMobile>
                <Input
                  multiLine
                  rows={2}
                  placeholder="제목을 입력해주세요."
                  _onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title || ""}
                />
              </InputMobile>
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
                  value={contents || ""}
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
                  {imgPreview &&
                    imgPreview.map((image, id) => {
                      return (
                        <PhotoWrap>
                          <Img key={id} src={image} alt={`${image}-${id}`} />
                          <BiX
                            type="button"
                            onClick={() => {
                              CancelImage(image, id);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </PhotoWrap>
                      );
                    })}
                </PhotoDiv>
              </div>
            </ImageWrapper>
            <BtnWrap>
              <div className="goback">
                <Button
                  _onClick={() => {
                    history.goBack();
                  }}
                  secondaryDefault
                  cursor="pointer"
                  size="narrow"
                >
                  <Text body4 color="#7A37BE">
                    뒤로 가기
                  </Text>
                </Button>
              </div>
              <Button
                _onClick={editPost}
                primaryDefault
                shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
                cursor="pointer"
                size="narrow"
              >
                <Text body4 color="#fff" cursor="pointer">
                  수정하기
                </Text>
              </Button>
            </BtnWrap>
          </WriteWrapper>
        </BackGround>
      </Layout>
    </React.Fragment>
  );
}

const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1032px;
  height: 861px;
  margin: auto;
  margin-top: 30px;
  padding: 40px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 328px;
    margin: auto;
    box-sizing: border-box;
  }
`;

const BackGround = styled.div`
  padding: 80px 0px 200px;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 30px 0px 80px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 952px;
  margin: auto;
  padding: 0px 0px 10px 22px;
  flex: none;
  order: 0;
  flex-grow: 0;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 952px;
  height: 60px;
  margin: auto;
  padding: 10px 0px;
  gap: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    padding: 0px;
    border: none;
    box-sizing: border-box;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 952px;
  height: 60px;
  margin: auto;
  padding: 10px 0px;
  gap: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  border-top: 1px solid #948a9e;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    border: none;
    box-sizing: border-box;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  height: 28px;
  padding: 5px 0px 5px 40px;
  flex: none;
  order: 0;
  flex-grow: 0;
  gap: 10px;
  border-right: 1px solid #cccccc;
  color: #666666;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const InputMobile = styled.div`
  width: 860px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    box-sizing: border-box;
  }
`;

const Select = styled.select`
  ${({ theme }) => theme.common.flexCenter};
  width: 302px;
  height: 40px;
  margin: 6px 0px 0px 10px;
  padding: 10px 0px 10px 15px;
  border: 1px solid #e6e6e6;
  background: #ffffff;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 952px;
  height: 303px;
  margin: auto;
  padding: 10px 0px;
  gap: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    border: none;
    box-sizing: border-box;
  }
`;

const TextWrapper = styled.div`
  width: 860px;
  height: 295px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 350px;
    box-sizing: border-box;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 952px;
  height: 182px;
  padding: 10px 0px;
  margin: auto;
  gap: 20px;
  flex: none;
  order: 1;
  flex-grow: 0;
  border-bottom: 1px solid #e6e6e6;
  @media ${({ theme }) => theme.device.mobile} {
    width: 220px;
    border: 1px solid red;
    border: none;
    box-sizing: border-box;
    padding: 5px 0px;
  }
`;

const PhotoWrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 8px;
  padding-top: 10px;
  padding-right: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    padding-right: 0px;
  }
`;

const PhotoDesc = styled.div`
  display: flex;
  width: 220px;
  height: 18px;
  padding: 4px;
  color: #666;
  font-size: 12px;
  text-align: center;
  outline: none;
`;

const PhotoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const PhotoUpload = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
  cursor: pointer;
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
  width: 80px;
  height: 80px;
  margin: 1px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    margin: -3px;
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
  justify-content: space-between;
  width: 952px;
  height: 60px;
  margin: auto;
  flex: none;
  order: 1;
  flex-grow: 0;
  gap: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 250px;
    .goback {
      display: none;
    }
    justify-content: center;
  }
`;

export default PostEdit;
