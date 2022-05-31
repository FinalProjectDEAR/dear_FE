import React from "react";

import { useHistory, useParams } from "react-router-dom";

import { actionCreators } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { Link } from "react-scroll";
import { Button, Text, TextB } from "../elements";
import { ReactComponent as All } from "../assets/postList/board-cate1.svg";
import { ReactComponent as Vote } from "../assets/postList/board-cate2.svg";
import { ReactComponent as Some } from "../assets/postList/board-cate3.svg";
import { ReactComponent as Love } from "../assets/postList/board-cate4.svg";
import { ReactComponent as Broken } from "../assets/postList/board-cate5.svg";
import { ReactComponent as Again } from "../assets/postList/board-cate6.svg";
import { ReactComponent as Solo } from "../assets/postList/board-cate3 (1).svg";
import { ReactComponent as Etc } from "../assets/postList/board-cate8.svg";
import { ReactComponent as Blogging } from "../assets/postList/Group 573.svg";

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

  //페이지
  const [page, setPage] = React.useState(1);
  const postList = useSelector((state) => state.post.post.content);
  const pageList = useSelector((state) => state.post.post);

  const isUser = useSelector((state) => state.user.isLogin);

  const gotoVote = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.push("/voteWrite");
    }
  };

  const gotoPost = () => {
    if (!isUser) {
      Swal.fire("로그인 후 이용해주세요.");
      history.push("/login");
    } else {
      history.push("/postWrite");
    }
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
            <Link to="2" smooth={true}>
              <CateGoryWrapper>
                <div className="mobile">
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/전체");
                      dispatch(actionCreators.getPostDB(page));
                    }}
                  >
                    {params.category === "전체" ? (
                      <>
                        <AllBtn>
                          <All />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          전체
                        </p>
                      </>
                    ) : (
                      <>
                        <All />
                        전체
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/투표");
                      dispatch(actionCreators.getCateDetailDB(page, "투표"));
                    }}
                  >
                    {params.category === "투표" ? (
                      <>
                        <AllBtn>
                          <Vote />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          투표
                        </p>
                      </>
                    ) : (
                      <>
                        <Vote /> 투표
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/솔로");
                      dispatch(actionCreators.getCateDetailDB(page, "솔로"));
                    }}
                  >
                    {params.category === "솔로" ? (
                      <>
                        <AllBtn>
                          <Solo />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          솔로
                        </p>
                      </>
                    ) : (
                      <>
                        <Solo />
                        솔로
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/짝사랑");
                      dispatch(actionCreators.getCateDetailDB(page, "짝사랑"));
                    }}
                  >
                    {params.category === "짝사랑" ? (
                      <>
                        <AllBtn>
                          <Love />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          짝사랑
                        </p>
                      </>
                    ) : (
                      <>
                        <Love />
                        짝사랑
                      </>
                    )}
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
                    {params.category === "썸" ? (
                      <>
                        <AllBtn>
                          <Some />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          썸
                        </p>
                      </>
                    ) : (
                      <>
                        <Some />썸
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/연애");
                      dispatch(actionCreators.getCateDetailDB(page, "연애"));
                    }}
                  >
                    {params.category === "연애" ? (
                      <>
                        <AllBtn>
                          <Again />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          연애
                        </p>
                      </>
                    ) : (
                      <>
                        <Again />
                        연애
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/이별");
                      dispatch(actionCreators.getCateDetailDB(page, "이별"));
                    }}
                  >
                    {params.category === "이별" ? (
                      <>
                        <AllBtn>
                          <Broken />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          이별
                        </p>
                      </>
                    ) : (
                      <>
                        <Broken />
                        이별
                      </>
                    )}
                  </CategoryBtn>
                  <CategoryBtn
                    onClick={() => {
                      setPage(1);
                      history.push("/postList/기타");
                      dispatch(actionCreators.getCateDetailDB(page, "기타"));
                    }}
                  >
                    {params.category === "기타" ? (
                      <>
                        <AllBtn>
                          <Etc />
                        </AllBtn>
                        <p style={{ marginTop: "83px", position: "absolute" }}>
                          기타
                        </p>
                      </>
                    ) : (
                      <>
                        <Etc />
                        기타
                      </>
                    )}
                  </CategoryBtn>
                </div>
              </CateGoryWrapper>
            </Link>
            <div style={{ paddingTop: "100px" }}>
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
            </div>
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
  height: 2500px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 2800px;
  }
`;

const PageBtn = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  padding-top: 33px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 1030px;
  width: 100%
  height: 150px;
  align-items: center;
  padding-top: 145px;
`;

const InfoContainer = styled.div`
  max-width: 400px;
  width: 100%;
  height: 150px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 190px;
    padding: 20px 0px 0px 20px;
    margin: auto;
    box-sizing: border-box;
  }
`;

const InfoBox = styled.div`
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const VoteWrapper = styled.div`
  max-width: 1032px;
  width: 100%;
  margin: 155px auto 200px;
  cursor: pointer;
  text-align: left;
  padding-top: 151px;
  @media ${({ theme }) => theme.device.isMobile} {
    padding-top: 100px;
  }
`;

const BoardWrapper = styled.div`
  margin: 30px auto;
  max-width: 1032px;
  padding-top: 150px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    padding-top: 100px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1032px;
  padding-top: 36px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 360px;
  }
`;

const CateGoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: 818px;
  margin: auto;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 180px;
    .mobile {
      display: flex;
      flex-direction: row;
      height: 100px;
      padding-top: 25px;
      gap: 30px;
    }
  }
  @media ${({ theme }) => theme.device.web} {
    .mobile {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 390px;
    }
  }
`;

const CategoryBtn = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 54px;
  height: 82px;
  padding: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  gap: 30px;
  cursor: pointer;
`;

const AllBtn = styled.div`
  width: 76px;
  height: 76px;
  margin-bottom: 50px;
  padding: 18px;
  box-sizing: border-box;
  background-color: #fafafa;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
`;

const PostTable = styled.div`
  margin-top: 15px;
  border-top: 1px solid #522772;
`;

const TableInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #666666;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const InfoItem = styled.div`
  vertical-align: middle;
  box-sizing: border-box;
  padding: 25px 0px 23px 0;
  color: #61586a;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding-top: 14px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 290px;
  height: 40px;
  gap: 10px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;

const MBtnWrapper = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    justify-content: left;
    max-width: 390px;
    width: 100%;
    height: 80px;
    margin: auto;
    padding-left: 20px;
    box-sizing: border-box;
  }
`;

const MBtnContainer = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: row;
    width: 290px;
    gap: 10px;
  }
`;
export default PostList;
