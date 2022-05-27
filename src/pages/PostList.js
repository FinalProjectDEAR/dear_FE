import React from "react";
import { Button, Text, TextB } from "../elements";
import styled from "styled-components";
import { ReactComponent as All } from "../assets/postList/board-cate1.svg";
import { ReactComponent as Vote } from "../assets/postList/board-cate2.svg";
import { ReactComponent as Some } from "../assets/postList/board-cate3.svg";
import { ReactComponent as Love } from "../assets/postList/board-cate4.svg";
import { ReactComponent as Broken } from "../assets/postList/board-cate5.svg";
import { ReactComponent as Again } from "../assets/postList/board-cate6.svg";
import { ReactComponent as Solo } from "../assets/postList/board-cate3 (1).svg";
import { ReactComponent as Etc } from "../assets/postList/board-cate8.svg";
import { ReactComponent as Blogging } from "../assets/postList/blogging 1.svg";
import Swal from "sweetalert2";

//리덕스관련
import { useHistory, useParams } from "react-router-dom";
import { actionCreators } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

//페이지관련
import VoteList from "../components/VoteList";
import MobileVoteList from "../components/MobileVoteList";
import Layout from "../components/Layout";
import Post from "../pages/Post";
import Paginations from "../elements/Pagination";

function PostList(props) {
  const params = useParams();
  const category = params.category;

  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = localStorage.getItem("isLogin");

  //페이지
  const [page, setPage] = React.useState(1);
  const postList = useSelector((state) => state.post.post.content);
  const pageList = useSelector((state) => state.post.post);
  console.log(postList);

  const gotoVote = () => {
    if (isLogin !== "true") {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/");
      return;
    }
    history.push("/voteWrite");
  };

  const gotoPost = () => {
    if (isLogin !== "true") {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/");
      return;
    }
    history.push("/postWrite");
  };
  //페이지별 게시글조회
  React.useEffect(() => {
    if (category === "전체") {
      dispatch(actionCreators.getPostDB(page));
    } else if (category === "투표") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "솔로") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "짝사랑") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "썸") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "연애") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "이별") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    } else if (category === "기타") {
      dispatch(actionCreators.getCateDetailDB(page, category));
    }
    return () => {
      dispatch(actionCreators.resetPost());
    };
  }, [page]);

  return (
    <React.Fragment>
      <Layout>
        <Background>
          <InfoWrapper id="1">
            <InfoContainer>
              <Text title textAlign="left">
                디어상담소
              </Text>
              <TextB
                color="#61586A"
                size="16px"
                lineheight="30px"
                textAlign="left"
              >
                간단한 연애 질문부터 채팅으로 말하지 못한 긴 고민까지,
                <br />
                언제든 고민을 남기면 리스너들이 답장을 남깁니다.
                <br />
                못다한 이야기를 디어상담소에 남겨보세요!
              </TextB>
            </InfoContainer>
            <InfoBox>
              <Blogging />
            </InfoBox>
          </InfoWrapper>

          <MBtnWrapper>
            <MBtnContainer>
              <Button
                size="regular"
                primaryDefault
                _onClick={gotoPost}
                cursor="pointer"
              >
                <Text body4 color="#fff">
                  상담신청하기
                </Text>
              </Button>
              <Button size="small" secondaryDefault _onClick={gotoVote}>
                <Text body4 color="#7A37BE" cursor="pointer">
                  투표만들기
                </Text>
              </Button>
            </MBtnContainer>
          </MBtnWrapper>

          <VoteWrapper>
            <VoteList />
            <MobileVoteList />
          </VoteWrapper>
          <BoardWrapper id="2">
            <CateGoryWrapper>
              <div className="mobile">
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/전체");
                    dispatch(actionCreators.getPostDB(page));
                  }}
                >
                  <AllBtn>
                    <All />
                  </AllBtn>
                  <p style={{ marginTop: "83px", position: "absolute" }}>
                    전체
                  </p>
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/투표");
                    dispatch(actionCreators.getCateDetailDB(page, "투표"));
                  }}
                >
                  <Vote />
                  투표
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/솔로");
                    dispatch(actionCreators.getCateDetailDB(page, "솔로"));
                  }}
                >
                  <Solo />
                  솔로
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/짝사랑");
                    dispatch(actionCreators.getCateDetailDB(page, "짝사랑"));
                  }}
                >
                  <Love />
                  짝사랑
                </CategoryBtn>
              </div>
              <div className="mobile">
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/썸");
                    dispatch(actionCreators.getCateDetailDB(page, "썸"));
                  }}
                >
                  <Some />썸
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/연애");
                    dispatch(actionCreators.getCateDetailDB(page, "연애"));
                  }}
                >
                  <Again />
                  연애
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/이별");
                    dispatch(actionCreators.getCateDetailDB(page, "이별"));
                  }}
                >
                  <Broken />
                  이별
                </CategoryBtn>
                <CategoryBtn
                  onClick={() => {
                    setPage(1);
                    history.push("/postList/기타");
                    dispatch(actionCreators.getCateDetailDB(page, "기타"));
                  }}
                >
                  <Etc />
                  기타
                </CategoryBtn>
              </div>
            </CateGoryWrapper>
            <TitleWrapper>
              <Text title>익명상담소</Text>
            </TitleWrapper>
            <PostTable>
              <TableInfo>
                <InfoItem style={{ marginLeft: "40px" }}>제목</InfoItem>
                <InfoItem style={{ marginRight: "40px" }}>작성일</InfoItem>
              </TableInfo>
              {postList?.slice(0, 11).map((item, idx) => {
                // slice를 이용하여 보여주고 싶은 게시물을 제어
                return <Post key={idx} item={item} />;
              })}
            </PostTable>
            <BtnWrapper>
              <BtnContainer>
                <Button
                  size="narrow"
                  secondaryDefault
                  cursor="pointer"
                  _onClick={gotoVote}
                >
                  <Text body4 color="#7A37BE" cursor="pointer">
                    투표만들기
                  </Text>
                </Button>
                <Button
                  size="narrow"
                  primaryDefault
                  _onClick={gotoPost}
                  cursor="pointer"
                >
                  <Text body4 color="#fff" cursor="pointer">
                    상담신청하기
                  </Text>
                </Button>
              </BtnContainer>
            </BtnWrapper>
            <PageBtn>
              <Paginations totalPage={pageList?.totalPages} setPage={setPage} />
            </PageBtn>
          </BoardWrapper>
        </Background>
      </Layout>
    </React.Fragment>
  );
}
const Background = styled.div`
  height: 2000px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 2500px;
  }
`;
const PageBtn = styled.div`
  padding-top: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 902.67px;
  width: 100%
  height: 150px;
  /* border: 1px solid red; */
  align-items: center;
 
`;
const InfoContainer = styled.div`
  max-width: 400px;
  width: 100%;
  height: 150px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 20px;
    margin: auto;
    /* border: 1px solid red; */
    height: 190px;
  }
`;
const InfoBox = styled.div`
  width: 416.67px;
  height: 312.5px;
  box-sizing: border-box;
  /* border: 1px solid red; */
  padding-bottom: 30px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;
const VoteWrapper = styled.div`
  max-width: 1032px;
  width: 100%;
  height: 408px;
  margin: 155px auto 200px;
  cursor: pointer;
  text-align: left;
  /* background: pink; */
`;
const MoreVote = styled.span`
  color: #948a9e;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-decoration-line: underline;
  width: 129px;
  height: 18px;
  line-height: 720px;
`;
const BoardWrapper = styled.div`
  margin: auto;
  max-width: 1032px;
  height: 547px;
  /* border: 1px solid green; */
`;
const TitleWrapper = styled.div`
  display: flex;
  max-width: 1032px;
  /* background: pink; */
  justify-content: space-between;
  padding-top: 36px;
`;
const CateGoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 818px;
  /* height: 200px; */
  /* background: yellow; */
  justify-content: space-around;
  /* border: 1px solid black; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 300px;
    height: 180px;
    /* background: yellow; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      /* border: 1px solid red; */
      display: flex;
      flex-direction: row;
      gap: 30px;
      height: 100px;
      padding-top: 20px;
    }
  }
  @media ${({ theme }) => theme.device.web} {
    .mobile {
      display: flex;
      width: 390px;
      flex-direction: row;
      /* border: 1px solid blue; */
      justify-content: space-around;
      align-items: center;
    }
  }
`;

const CategoryBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 30px;
  width: 54px;
  height: 82px;
  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
  @media ${({ theme }) => theme.device.isMobile} {
    /* border: 1px solid black; */
  }
`;
const AllBtn = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  width: 76px;
  height: 76px;
  /* border: 1px solid black; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;  */
  margin-bottom: 50px;
  padding: 18px;
  box-sizing: border-box;
`;

const PostTable = styled.div`
  margin-top: 15px;
  border-top: 1px solid #522772;
`;

const TableInfo = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #666666;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const InfoItem = styled.div`
  padding: 25px 0px 23px 0;
  color: #61586a;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  vertical-align: middle;
  box-sizing: border-box;
`;
const BtnWrapper = styled.div`
  /* border: 1px solid red; */
  justify-content: right;
  padding-top: 14px;
  display: flex;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 290px;
  height: 40px;
  /* background-color: orange; */
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const MBtnWrapper = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    /* border: 1px solid red; */
    max-width: 390px;
    width: 100%;
    margin: auto;
    justify-content: left;
    height: 80px;
    display: flex;
    padding-left: 20px;
    box-sizing: border-box;
    /* padding-left: 15px; */
    /* padding-top: 45px; */
    /* border: 1px solid red; */
  }
`;
const MBtnContainer = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 290px;
    /* height: 40px; */
    /* padding-left: 10px; */
    /* padding-bottom: 50px; */
    /* background-color: orange; */
  }
`;
export default PostList;
