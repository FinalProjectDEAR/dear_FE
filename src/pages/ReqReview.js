import React from "react";
import { Text, TextB, Input, Button } from "../elements/index";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/review";

//고민러가 작성하는 상담후기 페이지
function ReqReview(props) {
  console.log("리스너 아이디", props.resMemberId);
  const dispatch = useDispatch();

  const [serviceComment, setServiceComment] = React.useState(null);
  const [follow, unFollow] = React.useState(false);
  const [goodClick, setGoodClick] = React.useState(false);
  const [badClick, setBadClick] = React.useState(false);

  const goodTag = [
    "공감을 잘해줘요.",
    "대화가 즐거웠어요.",
    "감수성이 풍부했어요.",
    "시원하게 팩트폭격을 해줘요.",
    "명쾌한 해결책을 알려줘요.",
  ];
  const badTag = [
    "욕설, 비속어를 사용했어요.",
    "주제와 관련없는 이야기를 했어요.",
    "이야기를 꺼내도 답이 없었어요.",
    "대화 태도가 불량해요",
    "불순한 의도로 접근했어요.",
  ];

  const [goodResTag, setGoodResTag] = React.useState({
    "공감을 잘해줘요.": false,
    "대화가 즐거웠어요.": false,
    "감수성이 풍부했어요.": false,
    "시원하게 팩트폭격을 해줘요.": false,
    "명쾌한 해결책을 알려줘요.": false,
  });
  const [badResTag, setBadResTag] = React.useState({
    "욕설, 비속어를 사용했어요.": false,
    "주제와 관련없는 이야기를 했어요.": false,
    "이야기를 꺼내도 답이 없었어요.": false,
    "대화 태도가 불량해요": false,
    "불순한 의도로 접근했어요.": false,
  });
  //Boolean(value)은 value를 불리언값으로
  const SelectGoodTag = (e) => {
    const { value, name } = e.target;
    if (e.target.checked) {
      setGoodResTag({ ...goodResTag, [name]: Boolean(value) });
    } else {
      setGoodResTag({ ...goodResTag, [name]: Boolean(!value) });
    }
  };
  //Object.values()객체의 value값만 뽑아내기
  // console.log("굿", Object.values(goodResTag));

  const SelectBadTag = (e) => {
    const { value, name } = e.target;
    if (e.target.checked) {
      setBadResTag({ ...badResTag, [name]: Boolean(value) });
    } else {
      setBadResTag({ ...badResTag, [name]: Boolean(!value) });
    }
  };
  // console.log("배드", Object.values(badResTag));

  //고민러 고정값
  const requestReview = true;

  //고민러 후기 추가하기
  const finish = () => {
    let tagLike = "";
    if (goodClick === true) {
      console.log(
        "굿클릭",
        requestReview,
        Object.values(goodResTag),
        serviceComment
      );
      if (goodResTag === "") {
        window.alert("이유를 선택 해주세요!");
        return;
      }
      tagLike = true;
      dispatch(
        actionCreators.addReviewReqDB(
          requestReview,
          props.reqMemberId,
          tagLike,
          Object.values(goodResTag),
          serviceComment
        )
      );
      // localStorage.removeItem("request");
    }
    if (badClick === true) {
      console.log(
        "배드클릭",
        requestReview,
        Object.values(badResTag),
        serviceComment
      );
      if (badResTag === "") {
        window.alert("이유를 선택 해주세요!");
        return;
      }
      tagLike = false;
      dispatch(
        actionCreators.addReviewReqDB(
          requestReview,
          props.reqMemberId,
          tagLike,
          Object.values(badResTag),
          serviceComment
        )
      );
      localStorage.removeItem("request");
    }
    props.informClose();
  };
  //유저찜하기 액션
  const userFollow = () => {
    unFollow(!follow);
    dispatch(actionCreators.followDB(props.reqMemberId, follow));
  };

  return (
    <React.Fragment>
      <ReviewWrapper>
        <ReviewContainer>
          <TitleBox>
            <TextB subTitle textAlign="left">
              상담후기를 작성해주세요.
            </TextB>
            <span style={{ color: "red", margin: "4px" }}>*</span>
            <Text sub7>필수입력</Text>
          </TitleBox>
          <Text sub5 color="#BB9ED8" margin="0px 0px 10px 0px">
            후기를 작성하여 원활한 서비스문화 만들기에 동참해주세요!
          </Text>
        </ReviewContainer>
        <LikeContainer>
          <Text body4>
            {props.resNickname}님과 상담은 어떠셨나요?
            <Star>*</Star>
          </Text>
          <ThumbContainer>
            <ThumbUpBtn
              bg={goodClick ? "#7A37BE" : "#E6E6E6"}
              color={goodClick ? "#FFF" : "#ccc"}
              onClick={() => {
                setGoodClick(!goodClick);
                setBadClick(false);
              }}
            >
              <ThumbUpAltIcon fontSize="small" />
            </ThumbUpBtn>

            <ThumbDownBtn
              bg={badClick ? "#D53253" : "#E6E6E6"}
              color={badClick ? "#FFF" : "#ccc"}
              onClick={() => {
                setBadClick(!badClick);
                setGoodClick(false);
              }}
            >
              <ThumbDownAltIcon fontSize="small" />
            </ThumbDownBtn>
          </ThumbContainer>
        </LikeContainer>
        {goodClick ? (
          <ReviewBox>
            <Text body4 margin="10px 0px">
              상담하며 좋았던 점을 선택해 주세요.
              <Star>*</Star>
            </Text>
            {goodTag.map((e, i) => (
              <ChkDiv key={i}>
                <React.Fragment>
                  <input
                    type="checkbox"
                    onChange={SelectGoodTag}
                    value={true}
                    id={i}
                    name={e}
                  />
                  <label htmlFor={e}>{e}</label>
                </React.Fragment>
              </ChkDiv>
            ))}
          </ReviewBox>
        ) : null}

        {badClick ? (
          <ReviewBox>
            <TitleBox>
              <Text body4 margin="13px 0px">
                '별로예요'에 답한 이유는 무엇인가요?
                <Star>*</Star>
              </Text>
              <BadManner>비매너 후기는 상대방이 볼 수 없어요</BadManner>
            </TitleBox>

            {badTag.map((e, i) => (
              <ChkDiv key={i}>
                <React.Fragment>
                  <input
                    type="checkbox"
                    onChange={SelectBadTag}
                    value={true}
                    id={i}
                    name={e}
                  />
                  <label htmlFor={e}>{e}</label>
                </React.Fragment>
              </ChkDiv>
            ))}
          </ReviewBox>
        ) : null}
        <SvcContainer>
          <Text body4>서비스에 대한 간단한 한줄평을 남겨주세요!</Text>
          <SvcInput>
            <Input
              padding="10px 15px"
              placeholder="20자 이내로 입력해주세요."
              _onChange={(e) => {
                setServiceComment(e.target.value);
              }}
              value={serviceComment}
            />
          </SvcInput>
        </SvcContainer>
        <BottomBox>
          <Button
            secondaryDefault
            size="regular"
            _onClick={userFollow}
            margin="0px 8px"
          >
            <Text color="#7A37BE" cursor="pointer">
              {follow ? "리스너 찜 취소하기" : "리스너 찜하기"}
            </Text>
          </Button>
          <Button
            primaryDefault
            size="regular"
            _onClick={finish}
            margin="0px 8px"
          >
            <Text color="white" margin="-2px" cursor="pointer">
              종료하기
            </Text>
          </Button>
        </BottomBox>
      </ReviewWrapper>
    </React.Fragment>
  );
}

const ReviewWrapper = styled.div`
  max-width: 550px;
  height: 575px;
  padding: 40px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
`;

const LikeContainer = styled.div`
  height: 44px;
  margin: 10px 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background-color: red; */
`;

const ThumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 30px;
`;

const ThumbUpBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  margin: 0px 4px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};

  display: flex;
  align-items: center;
`;

const ThumbDownBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  margin: 0px 2px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: static;
  width: 490px;
  height: 230px;
`;

const ChkDiv = styled.div`
  margin: 7px 0px;
  display: flex;
  justify-content: left;
  color: #61586a;
  font-size: 13px;
  input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid #999;
    appearance: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  input[type="checkbox"]:checked {
    background: #61586a;
    border: none;
  }
`;

const SvcContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const SvcInput = styled.div`
  box-sizing: border-box;
  width: 470px;
`;

const BottomBox = styled.div`
  position: absolute;
  bottom: 50px;
  left: 8px;
  width: 100%;
  height: 36px;
  margin-top: 30px;
`;

const Star = styled.span`
  margin-left: 4px;
  color: #d53253;
`;

const BadManner = styled.p`
  margin-left: 4px;
  color: #d53253;
  font-size: 11px;
`;
export default ReqReview;
