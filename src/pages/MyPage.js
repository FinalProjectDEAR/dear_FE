import React from "react";
import { Text, ColorBadge, Tag } from "../elements";
import { ReactComponent as Setting } from "../assets/설정btn.svg";
import { ReactComponent as Help } from "../assets/help_outline.svg";
import { ReactComponent as Ondo } from "../assets/온도.svg";
import { ReactComponent as Sound } from "../assets/surround_sound.svg";
import { ReactComponent as Left } from "../assets/paging_left.svg";
import { ReactComponent as Right } from "../assets/paging_right.svg";
import styled from "styled-components";
//페이지관련
import MessageList from "./MessageList";
import CounselHistory from "./CounselHistory";
import Follow from "./Follow";
import Post from "../pages/Post";
import Pagination from "../elements/Pagination";
//리덕스관련
import { useDispatch, useSelector } from "react-redux";
import { MsgActionCreators } from "../redux/modules/message";
import { actionCreators } from "../redux/modules/mypage";
import { history } from "../redux/configureStore";

const MyPage = () => {
  const dispatch = useDispatch();
  //페이지
  const [page, setPage] = React.useState(1);
  //페이지별 게시글 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getPostListDB(page));
  }, [page]);
  const postList = useSelector((state) => state.mypage.postList.content);
  const postTotalPage = useSelector(
    (state) => state.mypage.postList.totalPages
  );
  //팔로우 전체 조회
  React.useEffect(() => {
    dispatch(actionCreators.getFollowDB(page));
  }, [page]);
  const follower = useSelector((state) => state.mypage.followList);
  //상담 히스토리 조회
  React.useEffect(() => {
    dispatch(actionCreators.getChatDB());
  }, [page]);
  const chatList = useSelector((state) => state.mypage.chatList);
  //메세지조회
  React.useEffect(() => {
    dispatch(MsgActionCreators.getMessageDB(page));
  }, [page]);
  const msgList = useSelector((state) => state.message.message);
  //멤버인포조회
  React.useEffect(() => {
    dispatch(actionCreators.getInfoDB());
  }, []);
  const userInfo = useSelector((state) => state.mypage.user.user);
  console.log(userInfo?.resTags);

  return (
    <React.Fragment>
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
          </MemberWrapper>
          <TypeWrapper>
            <div id="love">
              <div className="loveBox">
                <Text body4 color="#2E2A32">
                  나의 연애 유형
                </Text>
                <Help />
              </div>
              <div className="loveTag">
                <Tag small2>
                  <Text sub7>{userInfo?.age}</Text>
                </Tag>
                <Tag small2>
                  <Text sub7>{userInfo?.dating}</Text>
                </Tag>
                <Tag small2>
                  <Text sub7>{userInfo?.loveType}</Text>
                </Tag>
                <Tag small2>
                  <Text sub7>{userInfo?.lovePeriod}</Text>
                </Tag>
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
                <div className="listenerTag">
                  {/* <Tag counselReq2>{userInfo?.resTags.resTag1}</Tag>
                  <Tag sub2>{userInfo?.resTags.resTag2}</Tag> */}
                </div>
                <div className="ondo">
                  <Tag sub2>
                    마음의 온도 {userInfo?.score} <Ondo />
                  </Tag>
                </div>
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
              <Text body2>{userInfo?.reward}</Text>
            </div>
          </TapeWrapper>
        </MypageContainer>
      </MyPageWrapper>
      <MsgWrapper>
        <TitleContainer>
          <div className="title">
            <Text title color="#2E2A32" textAlign="left">
              내가 받은 쪽지
            </Text>
            <Text body4 color="#948A9E" textAlign="left">
              쪽지는 최대 30일까지 보관돼요
            </Text>
          </div>
          <div className="page">
            <Left style={{ cursor: "pointer" }} />
            <Right style={{ cursor: "pointer" }} />
          </div>
        </TitleContainer>
        <MsgContainer>
          {msgList &&
            msgList.map((item, idx) => {
              // PostDetail 페이지에 item값을 props로 넘겨준다.
              return <MessageList key={idx} item={item} />;
            })}
        </MsgContainer>
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
        <CounselGrid>
          {chatList?.map((item, idx) => {
            return <CounselHistory key={idx} item={item} />;
          })}
        </CounselGrid>
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
            <Left style={{ cursor: "pointer" }} />
            <Right style={{ cursor: "pointer" }} />
          </div>
        </TitleContainer>
        <FollowContainer>
          {follower?.map((item, idx) => {
            return <Follow key={idx} item={item} />;
          })}
        </FollowContainer>
      </FollowWrapper>
      <PostWrapper>
        <Title>
          <Text title color="#2E2A32" textAlign="left">
            내 게시글 관리
          </Text>
        </Title>
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
        <Pagination totalPage={postTotalPage} setPage={setPage} />
      </PostWrapper>
    </React.Fragment>
  );
};

const MyPageWrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  width: 1032px;
  height: 200px;
  margin: auto;
`;
const MypageContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  gap: 40px;
`;
const MemberWrapper = styled.div`
  width: 270px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ColorBox = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;
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
`;
const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 540px;
  height: 200px;
  justify-content: center;
  align-items: center;
  #love {
    width: 540px;
    height: 26px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: row;
  }
  .loveBox {
    display: flex;
    flex-direction: row;
    width: 104px;
  }
  .loveTag {
    margin-left: 32px;
    gap: 10px;
    width: 400px;
    height: 26px;
    display: flex;
    flex-direction: row;
  }
  #listener {
    width: 540px;
    display: flex;
    flex-direction: row;
  }
  .listenerBox {
    display: flex;
    flex-direction: row;
    width: 116px;
  }
  .types {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  .listenerTag {
    gap: 10px;
    width: 400px;
    height: 26px;
    display: flex;
    flex-direction: row;
  }
  /* .ondo {
  } */
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
`;
const MsgWrapper = styled.div`
  width: 1032px;
  height: 402px;
  margin: auto;
  margin-top: 60px;
  box-sizing: border-box;
`;
const MsgContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
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
`;
const Title = styled.div`
  width: 250px;
`;
const CounselWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 342px;
  margin-top: 100px;
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
`;
const FollowWrapper = styled.div`
  margin: auto;
  width: 1034px;
  height: 236px;
  margin-top: 100px;
`;
const FollowContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  padding: 0px;
  gap: 26px;
  width: 1034px;
  height: 186px;
`;
const PostWrapper = styled.div`
  margin: auto;
  width: 1032px;
  height: 369px;
  margin-top: 100px;
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
