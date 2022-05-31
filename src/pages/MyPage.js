import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { MsgActionCreators } from "../redux/modules/message";
import { actionCreators } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import { Modal } from "../elements/index";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { useMediaQuery } from "react-responsive";
import { Text, ColorBadge, Tag } from "../elements";
import { ReactComponent as Setting } from "../assets/설정btn.svg";
import { ReactComponent as Help } from "../assets/help_outline.svg";
import { ReactComponent as Sound } from "../assets/surround_sound.svg";
import { ReactComponent as Left } from "../assets/paging_left.svg";
import { ReactComponent as Right } from "../assets/paging_right.svg";

import Layout from "../components/Layout";
import MessageList from "./MessageList";
import CounselHistory from "./CounselHistory";
import Follow from "./Follow";
import Post from "../pages/Post";
import Paginations from "../elements/Pagination";
import ResTag from "../elements/ResTag";
import ResTag2 from "../elements/ResTag2";
import EmptyMSG from "../elements/EmptyMSG";
import EmptyChat from "../elements/EmptyChat";
import EmptyFollow from "../elements/EmptyFollow";
import EmptyPost from "../elements/EmptyPost";
import EmptyRes from "../elements/EmptyRes";
import ListenerInfo from "../components/ListenerInfo";
import LoveInfo from "../components/LoveInfo";
import TapeInfo from "../components/TapeInfo";
import ZzimInfo from "../components/ZzimInfo";

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
  //멤버인포조회
  React.useEffect(() => {
    dispatch(actionCreators.getInfoDB());
  }, []);
  const userInfo = useSelector((state) => state.mypage.user.user);
  //페이지별 게시글 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getPostListDB(page));
  }, [page]);

  const postList = useSelector((state) => state.mypage.postList.content);
  const postTotalPage = useSelector(
    (state) => state.mypage.postList.totalPages
  );

  const [listenerOpen, setListenerOpen] = React.useState(false);
  const close = () => {
    setListenerOpen(false);
  };

  const [tapeOpen, setTapeOpen] = React.useState(false);
  const tapeClose = () => {
    setTapeOpen(false);
  };

  const [zzimOpen, setZzimOpen] = React.useState(false);
  const zzimClose = () => {
    setZzimOpen(false);
  };

  const [loveOpen, setLoveOpen] = React.useState(false);
  const loveClose = () => {
    setLoveOpen(false);
  };

  return (
    <React.Fragment>
      <Layout>
        <BackGround>
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
                      <Help
                        onClick={() => {
                          setTapeOpen(true);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      {tapeOpen ? (
                        <Modal>
                          <TapeInfo closeTape={tapeClose} />
                        </Modal>
                      ) : null}
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
                    <Help
                      onClick={() => {
                        setLoveOpen(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    {loveOpen ? (
                      <Modal>
                        <LoveInfo close={loveClose} />
                      </Modal>
                    ) : null}
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
                    <Help
                      onClick={() => {
                        setListenerOpen(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    {listenerOpen ? (
                      <Modal>
                        <ListenerInfo close={close} />
                      </Modal>
                    ) : null}
                  </div>
                  <div className="types">
                    <MobileListener>
                      {userInfo?.resTag1 === null ? (
                        <EmptyRes />
                      ) : (
                        <ResTags>
                          <ResTag resTag1={userInfo?.resTag1} />
                        </ResTags>
                      )}
                      {userInfo?.resTag2 ? (
                        <ResTags>
                          <ResTag2 resTag2={userInfo?.resTag2} />
                        </ResTags>
                      ) : null}
                    </MobileListener>
                    <WebListener>
                      {userInfo?.resTag1 === null ? (
                        <EmptyRes />
                      ) : (
                        <ResTags>
                          <ResTag resTag1={userInfo?.resTag1} />
                        </ResTags>
                      )}
                      {userInfo?.resTag2 ? (
                        <ResTags>
                          <ResTag2 resTag2={userInfo?.resTag2} />
                        </ResTags>
                      ) : null}
                    </WebListener>
                    <OndoTag>
                      <Tag sub2>
                        <TemperatureBox>
                          <Text sub7 margin="5px 0px">
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
                  <Help
                    onClick={() => {
                      setTapeOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  {tapeOpen ? (
                    <Modal>
                      <TapeInfo closeTape={tapeClose} />
                    </Modal>
                  ) : null}
                </div>
                <div className="tapeCnt">
                  <Sound />
                  &nbsp;&nbsp;
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
                      Swal.fire("마지막 쪽지 페이지입니다.");
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
            <MobileGridWrapper>
              {chatList?.length > 0 ? (
                <CounselGrid>
                  {chatList?.map((item, idx) => {
                    return <CounselHistory key={idx} item={item} />;
                  })}
                </CounselGrid>
              ) : (
                <EmptyChat />
              )}
            </MobileGridWrapper>
          </CounselWrapper>
          <FollowWrapper>
            <TitleContainer>
              <div className="follow">
                <Text title color="#2E2A32" textAlign="left">
                  찜한 리스너
                </Text>
                <Help
                  onClick={() => {
                    setZzimOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                />
                {zzimOpen ? (
                  <Modal>
                    <ZzimInfo closeZzim={zzimClose} />
                  </Modal>
                ) : null}
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
                      Swal.fire("마지막 찜 페이지입니다.");
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
        </BackGround>
      </Layout>
    </React.Fragment>
  );
};

const PageBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 33px 0px 10px;
`;

const BackGround = styled.div`
  padding: 80px 0px 200px;
  @media ${({ theme }) => theme.device.isMobile} {
    padding: 30px 0px 80px;
  }
`;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 1032px;
  height: 200px;
  margin: auto;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  background-color: #ffffff;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 483px;
    margin: auto;
  }
`;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  gap: 40px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
  }
`;

const MemberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 200px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 320px;
    height: 120px;
  }
`;

const ColorBox = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
  @media ${({ theme }) => theme.device.isMobile} {
    ${({ theme }) => theme.common.flexCenterColumn};
    width: 320px;
    margin: 0px auto;
  }
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  .nick {
    display: flex;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    ${({ theme }) => theme.common.flexCenterColumn};
    width: 320px;
    height: 60px;
    margin: 20px auto;
  }
`;
const TypeWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  max-width: 400px;
  width: 100%;
  height: 200px;
  #love {
    display: flex;
    flex-direction: row;
    width: 400px;
    height: 26px;
    margin-bottom: 18px;
  }
  .loveBox {
    display: flex;
    flex-direction: row;
    width: 155px;
  }
  .loveTag {
    display: flex;
    flex-direction: row;
    width: 410px;
    height: 26px;
    margin-left: 32px;
    gap: 10px;
  }
  #listener {
    display: flex;
    flex-direction: row;
    width: 400px;
  }
  .listenerBox {
    display: flex;
    flex-direction: row;
    width: 139px;
  }
  .types {
    display: flex;
    flex-direction: column;
  }
  .listenerTag {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 26px;
    gap: 10px;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    ${({ theme }) => theme.common.flexCenterColumn};
    width: 320px;
    height: 159px;
    margin: auto;
    #love {
      display: flex;
      flex-direction: column;
      width: 320px;
    }
    .loveBox {
      display: flex;
      flex-direction: row;
      width: 280px;
      margin: auto;
    }
    .loveTag {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 320px;
      margin: 10px auto;
    }
    #listener {
      display: flex;
      flex-direction: column;
      width: 320px;
      padding-top: 30px;
      box-sizing: border-box;
    }
    .listenerBox {
      display: flex;
      flex-direction: row;
      width: 280px;
      margin: 0px auto 10px;
    }
    .types {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
    .listenerTag {
      display: flex;
      flex-direction: row;
      width: 277px;
      margin-right: 30px;
    }
  }
`;

const TapeWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenter};
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
  ${({ theme }) => theme.common.flexCenter};
  width: 280px;
  height: 24px;
  margin: 0px auto 30px;
  .tape {
    display: flex;
  }
  .tapeCnt {
    display: flex;
    justify-content: center;
  }
`;

const MobileListener = styled.div`
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: row;
    width: 280px;
    gap: 5px;
  }
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
`;

const ResTags = styled.div`
  display: flex;
  flex-direction: row;
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
  @media ${({ theme }) => theme.device.isMobile} {
    margin-top: 0px;
  }
`;

const TemperatureBox = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px 26px;
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
  width: 69px;
  height: 6px;
  box-sizing: border-box;
  background-color: #fff;
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
  @media ${({ theme }) => theme.device.isMobile} {
    height: 6px;
  }
`;

const MsgWrapper = styled.div`
  width: 1032px;
  height: 402px;
  margin: auto;
  margin-top: 60px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 390px;
  }
`;
const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    margin: auto;
    gap: 10px;
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
    ${({ theme }) => theme.common.flexCenter};
    width: 80px;
    gap: 20px;
  }
  .follow {
    display: flex;
  }
  @media ${({ theme }) => theme.device.isMobile} {
    width: 320px;
    .page {
      ${({ theme }) => theme.common.flexCenter};
      width: 80px;
      height: 40px;
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
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    max-height: 675px;
  }
`;

const CounselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 328px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1032px;
  margin: 16px 0px;
  gap: 10px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
  }
`;

const MobileGridWrapper = styled.div`
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
  }
  @media ${({ theme }) => theme.device.web} {
  }
`;

const FollowWrapper = styled.div`
  width: 1034px;
  margin: auto;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    max-height: 675px;
    margin: auto;
    margin-top: 220px;
    box-sizing: border-box;
  }
`;

const FollowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1034px;
  margin-top: 18px;
  padding: 0px;
  gap: 26px;
  @media ${({ theme }) => theme.device.isMobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
  }
`;

const PostWrapper = styled.div`
  width: 1032px;
  margin: auto;
  margin-top: 100px;
  @media ${({ theme }) => theme.device.isMobile} {
    width: 328px;
    box-sizing: border-box;
  }
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
  padding: 25px 0px 23px 0;
  color: #61586A
  font-size: 14px;
  line-height: 18px;
  font-weight: 500; 
`;
export default MyPage;
