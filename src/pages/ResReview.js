import React from "react";
import { Text, Input, Button } from "../elements/index";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/review";

//리스너 상담후기작성페이지
function ResReview({ leaveSession }) {
  const dispatch = useDispatch();
  const resMemberId = localStorage.getItem("memberId");
  // const oppositeMemberId = 상대방아이디_고민러아이디
  const response = localStorage.getItem("response");

  const [serviceComment, setServiceComment] = React.useState(null);
  const [goodClick, setGoodClick] = React.useState(false);
  const [badClick, setBadClick] = React.useState(false);

  const goodTag = [
    "친절하고 매너가 좋아요",
    "대화가 즐거웠어요.",
    "충분히 고민할 만한 주제였어요",
  ];
  const badTag = [
    "욕설, 비속어를 사용했어요.",
    "이야기를 꺼내도 답이 없었어요.",
    "불순한 의도로 접근했어요.",
  ];
  const [goodResTag, setGoodResTag] = React.useState({
    "친절하고 매너가 좋아요": false,
    "대화가 즐거웠어요.": false,
    "충분히 고민할 만한 주제였어요": false,
  });
  const [badResTag, setBadResTag] = React.useState({
    "욕설, 비속어를 사용했어요.": false,
    "이야기를 꺼내도 답이 없었어요.": false,
    "불순한 의도로 접근했어요.": false,
  });

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
  //리스너 고정값
  const requestReview = false;
  //리스너 후기 추가하기
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
        actionCreators.addReviewResDB(
          requestReview,
          tagLike,
          Object.values(goodResTag),
          serviceComment
        )
      );
      localStorage.removeItem("response");
    }

    if (badClick === true) {
      console.log(
        "배드클릭",
        requestReview,
        Object.values(badResTag),
        serviceComment
      );
      tagLike = false;
      dispatch(
        actionCreators.addReviewResDB(
          requestReview,
          tagLike,
          Object.values(badResTag),
          serviceComment
        )
      );
      localStorage.removeItem("response");
    }
    leaveSession();
  };

  return (
    <React.Fragment>
      <ReviewWrapper>
        <ReviewContainer>
          <Text batang weight="600" size="16px">
            상담후기를 작성해주세요.
            <Star>*</Star>
            <Pilsu>필수입력</Pilsu>
          </Text>
          <SubTitle>
            <Text color="#BB9ED8" size="14px">
              후기를 작성하여 원활한 서비스문화 만들기에 동참해주세요!
            </Text>
          </SubTitle>
        </ReviewContainer>
        <Container>
          <MiddleContainer>
            <Text paddingLeft="60px" size="14px">
              "고민러"님과 대화는 어떠셨나요?
              <Star>*</Star>
            </Text>
            <ThumbContainer>
              <ThumbUpBtn
                onClick={() => {
                  setGoodClick(!goodClick);
                  setBadClick(false);
                }}
                goodClick={goodClick}
              >
                <ThumbUpAltIcon />
              </ThumbUpBtn>
              <ThumbDownBtn
                onClick={() => {
                  setBadClick(!badClick);
                  setGoodClick(false);
                }}
                badClick={badClick}
              >
                <ThumbDownAltIcon />
              </ThumbDownBtn>
            </ThumbContainer>
          </MiddleContainer>
          {goodClick === true ? (
            <ReviewBox>
              <SelectContainer>
                <Text size="14px">
                  대화하며 좋았던 점을 선택해 주세요.
                  <Star>*</Star>
                </Text>
                {goodTag.map((e, i) => (
                  <ChkDiv>
                    <React.Fragment key={i}>
                      <input
                        type="checkbox"
                        onChange={SelectGoodTag}
                        value={true}
                        id={e}
                        name={e}
                      />
                      <label htmlFor={e}>{e}</label>
                    </React.Fragment>
                  </ChkDiv>
                ))}
              </SelectContainer>
            </ReviewBox>
          ) : null}

          {badClick === true ? (
            <ReviewBox>
              <SelectContainer>
                <Text size="14px">
                  '별로예요'에 답한 이유는 무엇인가요?
                  <Star>*</Star>
                </Text>
                <BadManner>*비매너 후기는 상대방이 볼 수 없어요</BadManner>
                {badTag.map((e, i) => (
                  <ChkDiv>
                    <React.Fragment key={i}>
                      <input
                        type="checkbox"
                        onChange={SelectBadTag}
                        value={true}
                        id={e}
                        name={e}
                      />
                      <label htmlFor={e}>{e}</label>
                    </React.Fragment>
                  </ChkDiv>
                ))}
              </SelectContainer>
            </ReviewBox>
          ) : null}
          <SvcContainer>
            <Text margin="-0.5px" size="14px">
              서비스에 대한 간단한 한줄평을 남겨주세요!
            </Text>
            <SvcInput>
              <Input
                placeholder="20자 이내로 입력해주세요."
                _onChange={(e) => {
                  setServiceComment(e.target.value);
                }}
                value={serviceComment}
              />
            </SvcInput>
          </SvcContainer>
        </Container>
        <BtnWrap>
          <Button bg="#7A37BE" cursor="pointer" _onClick={finish}>
            <Text color="white" margin="-2px" cursor="pointer">
              종료하기
            </Text>
          </Button>
        </BtnWrap>
      </ReviewWrapper>
    </React.Fragment>
  );
}

const ReviewWrapper = styled.div`
  max-width: 550px;
  height: 630px;
  margin: 110px auto;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
`;

const ReviewContainer = styled.div`
  margin-top: 40px;
  margin-left: 40px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;
const SubTitle = styled.div`
  margin-top: -30px;
`;
const Container = styled.div`
  width: 550px;
  height: 432px;
  padding-top: 130px;
`;

const MiddleContainer = styled.div`
  display: flex;
  padding-left: 60px;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 20px;
  box-sizing: border-box;
  /* background-color: red; */
`;

const ThumbContainer = styled.div`
  width: 90px;
  height: 30px;
  margin-top: 15px;
  padding-left: 20px;
`;

const ThumbUpBtn = styled.button`
  border: none;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.goodClick ? "#7A37BE" : "#E6E6E6")};
  color: ${(props) => (props.goodClick ? "#FFFFFF" : "#333333")};
`;

const ThumbDownBtn = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.badClick ? "#D53253" : "#E6E6E6")};
  color: ${(props) => (props.badClick ? "#FFFFFF" : "#333333")};
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: -60px;
  position: static;
  width: 490px;
  height: 300px;
  left: 0px;
  top: 60px;
`;

const SelectContainer = styled.div`
  padding-left: 60px;
`;

const ChkDiv = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 14.5px;
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
  padding-left: 60px;
  margin-top: -5px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SvcInput = styled.div`
  width: 410px;
  margin-left: -10px;
`;

const BtnWrap = styled.div`
  width: 335px;
  height: 40px;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: -40px;
  padding: 10px;
  cursor: pointer;
`;

const Star = styled.span`
  color: #d53253;
`;

const Pilsu = styled.span`
  color: #999999;
  font-size: 14px;
`;

const BadManner = styled.p`
  color: #d53253;
  font-size: 11px;
  margin-top: -15px;
  margin-right: 30px;
  padding-bottom: 10px;
`;
export default ResReview;
