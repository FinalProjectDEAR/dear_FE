import React from "react";
import { Text, ColorBadge, Tag } from "../elements";
import { ReactComponent as Setting } from "../assets/설정btn.svg";
import { ReactComponent as Help } from "../assets/help_outline.svg";
import { ReactComponent as Sound } from "../assets/surround_sound.svg";
import { ReactComponent as Left } from "../assets/paging_left.svg";
import { ReactComponent as Right } from "../assets/paging_right.svg";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import ReactTooltip from "react-tooltip";
//페이지관련
import Layout from "../components/Layout";
import MessageList from "./MessageList";
import CounselHistory from "./CounselHistory";
import Follow from "./Follow";
import Post from "../pages/Post";
import Paginations from "../elements/Pagination";
import ResTag from "../elements/ResTag";
import EmptyMSG from "../elements/EmptyMSG";
import EmptyChat from "../elements/EmptyChat";
import EmptyFollow from "../elements/EmptyFollow";
import EmptyPost from "../elements/EmptyPost";
import EmptyRes from "../elements/EmptyRes";
//리덕스관련
import { useDispatch, useSelector } from "react-redux";
import { MsgActionCreators } from "../redux/modules/message";
import { actionCreators } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";

const MyPage = () => {
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const dispatch = useDispatch();
  //게시글 페이지
  const [page, setPage] = React.useState(1);
  //쪽자 페이지
  const [mPage, setMpage] = React.useState(1);
  //팔로우 페이지
  const [fPage, setFpage] = React.useState(1);
  //페이지별 팔로우 조회
  const followPage = useSelector((state) => state.mypage.page);
  //페이지별 메시지 조회
  const msgPage = useSelector((state) => state.message.page);
  //팔로우 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getFollowDB(fPage));
  }, [fPage]);
  const follower = useSelector((state) => state.mypage.followList);
  //상담 히스토리 조회
  React.useEffect(() => {
    dispatch(actionCreators.getChatDB());
  }, []);
  const chatList = useSelector((state) => state.mypage.chatList);
  //쪽지 조회
  React.useEffect(() => {
    dispatch(MsgActionCreators.getMessageDB(mPage));
  }, [mPage]);
  const msgList = useSelector((state) => state.message.message);
  // console.log(msgList);
  //멤버인포조회
  React.useEffect(() => {
    dispatch(actionCreators.getInfoDB());
  }, []);
  const userInfo = useSelector((state) => state.mypage.user.user);
  console.log("멤버인포레스태그", userInfo?.resTag1);
  const resTag1 = userInfo?.resTag1;
  const resTag2 = userInfo?.resTag2;
  //페이지별 게시글 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getPostListDB(page));
    // return () => {
    //   dispatch(actionCreators.resetPage());
    // };
  }, [page]);
  const postList = useSelector((state) => state.mypage.postList.content);
  const postTotalPage = useSelector(
    (state) => state.mypage.postList.totalPages
  );
  return (
    <React.Fragment>
      <Layout>
        <Background>
          <MyPageWrapper>
            <MypageContainer>
              <MemberWrapper>
                <ColorBox>
                  <ColorBadge
                    border="2px solid #F8F8F8"
                    size="60"
                    bg={userInfo?.color}
                    cursor="pointer"
                  />
                </ColorBox>
                <NicknameBox>
                  <div className="nick">
                    <Text body2 color="#2E2A32">
                      {userInfo?.nickname}
                    </Text>
                    <Setting
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push("/editMyPage");
                      }}
                    />
                  </div>
                  <Text sub6 color="#999999" size="14px">
                    {userInfo?.memberId}
                  </Text>
                  <Text sub7 color="#7A37BE" size="12px">
                    나를 찜한 친구 {userInfo?.follower}명
                  </Text>
                </NicknameBox>
                {Mobile ? (
                  <MTapeWrapper>
                    <div className="tape">
                      <Text sub6>보유 테이프</Text>
                      <Help />
                    </div>
                    <div className="tapeCnt">
                      <Sound />
                      <Text body2>
                        {userInfo?.reward ? userInfo?.reward : 0}
                      </Text>
                    </div>
                  </MTapeWrapper>
                ) : null}
              </MemberWrapper>
              <TypeWrapper>
                <div id="love">
                  <div className="loveBox">
                    <Text body4 color="#2E2A32">
                      나의 연애 유형
                    </Text>
                    <Help />
                    {/* <div className="section">
                      <p className="subTitle">
                        <div className="exampleJsx">
                          <div className="side">
                            <a data-for="enrich" data-tip>
                              <Help />
                            </a>
                          </div>
                          <ReactTooltip
                            id="enrich"
                            getContent={(dataTip) => "어쩌고저쩌고설명"}
                          />
                        </div>
                      </p>
                    </div> */}
                  </div>
                  <div className="loveTag">
                    <Tag small2>
                      <Text sub7 margin="3px 8px">
                        {userInfo?.age}
                      </Text>
                    </Tag>
                    <Tag small2>
                      <Text sub7 margin="3px 8px">
                        {userInfo?.dating}
                      </Text>
                    </Tag>
                    {userInfo?.loveType ? (
                      <Tag small2>
                        <Text sub7 margin="3px 8px">
                          {userInfo?.loveType}
                        </Text>
                      </Tag>
                    ) : null}
                    {userInfo?.lovePeriod ? (
                      <Tag small2>
                        <Text sub7 margin="3px 8px">
                          {userInfo?.lovePeriod}
                        </Text>
                      </Tag>
                    ) : null}
                  </div>
                </div>
                <div id="listener">
                  <div className="listenerBox">
                    <Text body4 color="#2E2A32">
                      나의 리스너 유형
                    </Text>
                    <Help />
                  </div>
                  <div className="types">
                    <MobileListener>
                      <ResTags>
                        {userInfo === !null ? (
                          <ResTag resTag1={userInfo?.resTag1} />
                        ) : (
                          <EmptyRes />
                        )}
                      </ResTags>
                      <ResTags>
                        {userInfo ? (
                          <ResTag resTag2={userInfo?.resTag2} />
                        ) : null}
                      </ResTags>
                    </MobileListener>
                    <WebListener>
                      <ResTags>
                        {userInfo === !null ? (
                          <ResTag resTag1={userInfo?.resTag1} />
                        ) : (
                          <EmptyRes />
                        )}
                        {userInfo ? (
                          <ResTag resTag2={userInfo?.resTag2} />
                        ) : null}
                      </ResTags>
                    </WebListener>

                    <OndoTag>
                      <Tag sub2>
                        <TemperatureBox>
                          <Text sub7 margin="3px 0px">
                            마음의 온도
                            <Temperature>{userInfo?.score}°C</Temperature>
                          </Text>
                          <TemperatureBar>
                            <ProgressBar>
                              <ColorBadge
                                size="10"
                                bg="#7A37BE"
                                border="none"
                                position="absolute"
                              />
                              <Highlight width={userInfo?.score + "%"} />
                            </ProgressBar>
                          </TemperatureBar>
                        </TemperatureBox>
                      </Tag>
                    </OndoTag>
                  </div>
                </div>
              </TypeWrapper>
              <TapeWrapper>
                <div className="tape">
                  <Text sub6>보유 테이프</Text>
                  <Help />
                </div>
                <div className="tapeCnt">
                  <Sound />
                  <Text body2>{userInfo?.reward ? userInfo?.reward : 0}</Text>
                </div>
              </TapeWrapper>
            </MypageContainer>
          </MyPageWrapper>
          <MsgWrapper>
            <TitleContainer>
              <div className="title">
                <Text title color="#2E2A32" textAlign="left">
                  받은 쪽지
                </Text>
                <Text body4 color="#948A9E" textAlign="left">
                  쪽지는 최대 30일까지 보관돼요
                </Text>
              </div>
              <div className="page">
                <Left
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (mPage > 1) {
                      setMpage(mPage - 1);
                    }
                  }}
                />
                <Right
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (mPage === msgPage) {
                      window.alert("마지막 쪽지 페이지입니다.");
                      return;
                    }
                    setMpage(mPage + 1);
                  }}
                />
              </div>
            </TitleContainer>
            {msgList?.length > 0 ? (
              <MsgContainer>
                {msgList &&
                  msgList.map((item, idx) => {
                    return <MessageList key={idx} item={item} />;
                  })}
              </MsgContainer>
            ) : (
              <EmptyMSG />
            )}
          </MsgWrapper>
          <CounselWrapper>
            <Title>
              <Text title color="#2E2A32" textAlign="left">
                상담 히스토리
              </Text>
              <Text body4 color="#948A9E" textAlign="left">
                히스토리는 최대 6개까지 볼 수 있어요
              </Text>
            </Title>
            {chatList?.length > 0 ? (
              <CounselGrid>
                {chatList?.map((item, idx) => {
                  return <CounselHistory key={idx} item={item} />;
                })}
              </CounselGrid>
            ) : (
              <EmptyChat />
            )}
          </CounselWrapper>
          <FollowWrapper>
            <TitleContainer>
              <div className="follow">
                <Text title color="#2E2A32" textAlign="left">
                  찜한 리스너
                </Text>
                <Help />
              </div>
              <div className="page">
                <Left
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (fPage > 1) {
                      setFpage(fPage - 1);
                    }
                  }}
                />
                <Right
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (fPage === followPage) {
                      window.alert("마지막 찜 페이지입니다.");
                      return;
                    }
                    setFpage(fPage + 1);
                  }}
                />
              </div>
            </TitleContainer>
            {follower?.length > 0 ? (
              <FollowContainer>
                {follower?.map((item, idx) => {
                  return <Follow key={idx} item={item} />;
                })}
              </FollowContainer>
            ) : (
              <EmptyFollow />
            )}
          </FollowWrapper>
          <PostWrapper>
            <Title>
              <Text title color="#2E2A32" textAlign="left">
                내 게시글 관리
              </Text>
            </Title>
            {postList?.length > 0 ? (
              <>
                <PostTable>
                  <TableInfo>
                    <InfoItem style={{ marginLeft: "40px" }}>제목</InfoItem>
                    <InfoItem style={{ marginRight: "40px" }}>작성일</InfoItem>
                  </TableInfo>
                  {postList?.slice(0, 8).map((item, idx) => {
                    // slice를 이용하여 보여주고 싶은 게시물을 제어
                    return <Post key={idx} item={item} />;
                  })}
                </PostTable>
                <PageBtn>
                  <Paginations totalPage={postTotalPage} setPage={setPage} />
                </PageBtn>
              </>
            ) : (
              <EmptyPost />
            )}
          </PostWrapper>
        </Background>
      </Layout>
    </React.Fragment>
  );
};

const PageBtn = styled.div`
  padding-top: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  height: 2200px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 3200px;
  }
`;
const MyPageWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  width: 1032px;
  height: 200px;
  margin: auto;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    height: 483px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }
`;
const MypageContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  gap: 40px;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
  }
`;
const MemberWrapper = styled.div`
  width: 180px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    height: 120px;
    display: flex;
    flex-direction: column;
    margin: auto;
    /* border: 1px solid red; */
  }
`;
const ColorBox = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    /* border: 1px solid red; */
  }
`;
const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 300px;
  height: 64px;
  .nick {
    display: flex;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    /* border: 1px solid red; */
  }
`;
const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  #love {
    width: 400px;
    height: 26px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: row;
    /* border: 1px solid red; */
  }
  .loveBox {
    display: flex;
    flex-direction: row;
    width: 155px;
    /* border: 1px solid red; */
  }
  .loveTag {
    margin-left: 32px;
    gap: 10px;
    width: 410px;
    height: 26px;
    display: flex;
    flex-direction: row;
    /* border: 1px solid red; */
  }
  #listener {
    width: 400px;
    display: flex;
    flex-direction: row;
    /* border: 1px solid red; */
  }
  .listenerBox {
    display: flex;
    flex-direction: row;
    width: 139px;
    /* margin-right: 20px; */
    /* border: 1px solid red; */
  }
  .types {
    display: flex;
    flex-direction: column;
    /* margin-left: 20px; */
  }
  .listenerTag {
    gap: 10px;
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row;
    /* border: 1px solid blue; */
  }
  @media ${({ theme }) => theme.device.isMobile} {
    width: 280px;
    height: 159px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    /* border: 1px solid blue; */
    #love {
      width: 280px;
      /* height: 26px; */
      /* margin-bottom: 18px; */
      display: flex;
      flex-direction: column;
      /* background: yellow; */
    }
    .loveBox {
      display: flex;
      flex-direction: row;
      width: 104px;
      /* background: blue; */
      margin-left: 10px;
    }
    .loveTag {
      margin: 10px auto;
      justify-content: center;
      width: 280px;
      /* gap: 10px; */
      display: flex;
      flex-direction: row;
      /* background: pink; */
    }
    #listener {
      width: 280px;
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      box-sizing: border-box;
    }
    .listenerBox {
      display: flex;
      flex-direction: row;
      width: 116px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .types {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
    .listenerTag {
      /* gap: 10px; */
      /* height: 26px; */
      display: flex;
      flex-direction: row;
      width: 277px;
      margin-right: 30px;
      /* margin: auto; */
      /* background: pink; */
    }
  }
`;
const TapeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 88px;
  .tape {
    display: flex;
  }
  .tapeCnt {
    display: flex;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;
const MTapeWrapper = styled.div`
  width: 280px;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px auto 30px;
  /* background: red; */
  .tape {
    display: flex;
    /* background: red; */
  }
  .tapeCnt {
    display: flex;
    justify-content: center;
  }
`;
const MobileListener = styled.div`
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    justify-content: row;
    width: 230px;
    /* background: pink; */
  }
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
`;
const ResTags = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
`;

const WebListener = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: flex;
    justify-content: row;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    display: none;
  }
`;
const OndoTag = styled.div`
  /* margin-top: 0px; */
  /* border: 1px solid red; */
  @media ${({ theme }) => theme.device.isMobile} {
    margin-top: 0px;
  }
`;
const TemperatureBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 26px;
  /* border: 1px solid red; */
`;
const TemperatureBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 5px;
`;
const Temperature = styled.span`
  font-weight: 700;
  margin-left: 3px;
`;
const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  width: 69px;
  height: 6px;
  border: 1px solid #bb9ed8;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.isMobile} {
    height: 10px;
  }
`;

const Highlight = styled.div`
  background-color: #7a37be;
  transition: 1s;
  width: ${(props) => props.width};
  height: 6px;
  border-radius: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 24px;
  }
`;

const MsgWrapper = styled.div`
  width: 1032px;
  height: 402px;
  margin: auto;
  margin-top: 60px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 390px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }
`;
const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 300px;
    gap: 10px;
    /* background-color: orange; */
    display: flex;
    flex-direction: column;
    margin: auto;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1032px;
  .title {
    width: 180px;
  }
  .page {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .follow {
    display: flex;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 390px;
    /* margin: auto; */
    /* border: 1px solid red; */
    .page {
      /* border: 1px solid red; */
      width: 80px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }
  }
`;
const Title = styled.div`
  width: 250px;
`;
const CounselWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 342px;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    max-height: 675px;
    /* background-color: violet; */
  }
`;
const CounselGrid = styled.div`
  width: 1032px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 328px);
  flex-direction: column;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 96px;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }
`;
const FollowWrapper = styled.div`
  margin: auto;
  width: 1034px;
  height: 236px;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    /* width: 328px;
    height: 440px;
    background-color: violet; */
    width: 320px;
    height: 92px;
    /* background-color: orange; */
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 100px;
  }
`;
const FollowContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  padding: 0px;
  gap: 26px;
  width: 1034px;
  height: 186px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    height: 502px;
    /* background-color: orange; */
    display: flex;
    flex-direction: column;
  }
`;
const PostWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 369px;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 328px;
    height: 536px;
    /* border: 1px solid red; */
    margin-top: 460px;
    box-sizing: border-box;
  }
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
  color: #61586A
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  vertical-align: middle;
`;
export default MyPage;
