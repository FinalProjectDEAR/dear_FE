import React from "react";
import { Text, Input, Button } from "../elements/index";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/review";

function Review() {
  const dispatch = useDispatch();
  const resMemberId = localStorage.getItem("memberId");

  const [resTag, setResTag] = React.useState("");
  const [serviceComment, setServiceComment] = React.useState("");
  const [point, setPoint] = React.useState(0);
  const [follow, unFollow] = React.useState(false);
  const SelectTag = (e) => {
    setResTag(e.target.value);
  };
  const [tag, setTag] = React.useState([
    "공감을 잘해줘요",
    "대화가 즐거워요",
    "명쾌한 해결사",
    "아얏! 팩트 폭격기",
    "내 말을 잘 들어주지않아요",
    "나쁜 말을 사용해요",
    "말이 안통해요",
    "도움이 안돼요",
  ]);
  const memberId = localStorage.getItem("memberId");
  const request = localStorage.getItem("request");
  const response = localStorage.getItem("response");
  //고민러 후기 추가하기
  const addReviewReq = () => {
    dispatch(
      actionCreators.addReviewReqDB(resMemberId, resTag, serviceComment, point)
    );
    localStorage.removeItem("request");
  };
  //리스너 후기 추가하기
  const addReviewRes = () => {
    dispatch(actionCreators.addReviewReqDB(resMemberId, resTag, point));
    localStorage.removeItem("response");
  };
  //유저찜하기 액션
  const userFollow = () => {
    unFollow(!follow);
    dispatch(actionCreators.followDB(memberId, follow));
  };
  // === request
  if (memberId) {
    return (
      <React.Fragment>
        <div
          style={{ maxWidth: "850px", margin: "auto", border: "1px solid red" }}
        >
          <div style={{ padding: "16px", margin: "auto" }} id="wrap">
            <h2>후기를 작성해주세요</h2>
            <Text>작성한 후기는 DEAR의 원활한 이용에 도움이 돼요</Text>
            <div>
              <div>
                <div>
                  <Text>리스너는 어떠셨나요?</Text>
                </div>
              </div>
              <ChkBtn>
                {tag.map((e, i) => (
                  <React.Fragment key={i}>
                    <input
                      type="checkbox"
                      value={e}
                      onChange={SelectTag}
                      name="tag"
                      id={e}
                    />
                    <label htmlFor={e}>{e}</label>
                  </React.Fragment>
                ))}
              </ChkBtn>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid orange",
                  marginTop: "15px",
                }}
              >
                <div style={{ backgroundColor: "orange" }}>
                  <Text>isLike</Text>
                </div>
                <div
                  style={{
                    width: "600px",
                    backgroundColor: "pink",
                    margin: "15px",
                  }}
                >
                  <Button
                    width="30px"
                    margin="3px"
                    text="업"
                    _onClick={() => {
                      setPoint(+1);
                    }}
                  />
                  <Button
                    width="30px"
                    text="다운"
                    _onClick={() => {
                      setPoint(-1);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid orange",
                  marginTop: "15px",
                }}
              >
                <div style={{ backgroundColor: "orange" }}>
                  <Text>서비스 한줄평 (20자 이내)</Text>
                </div>
                <div
                  style={{
                    width: "600px",
                    backgroundColor: "pink",
                    margin: "15px",
                  }}
                >
                  <Input
                    placeholder="내용을 입력해주세요."
                    _onChange={(e) => {
                      setServiceComment(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                bg="#eeeeee"
                color="#61586A"
                width="300px"
                text={follow === true ? "리스너 찜하기" : "리스너 찜 취소하기"}
                cursor="pointer"
                _onClick={userFollow}
              />
              <Button
                width="300px"
                text="종료하기"
                cursor="pointer"
                _onClick={addReviewReq}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  if (memberId === response) {
    return (
      <React.Fragment>
        <div
          style={{ maxWidth: "850px", margin: "auto", border: "1px solid red" }}
        >
          <div style={{ padding: "16px", margin: "auto" }} id="wrap">
            <h2>후기를 작성해주세요</h2>
            <Text>작성한 후기는 DEAR의 원활한 이용에 도움이 돼요</Text>
            <div>
              <div>
                <div>
                  <Text>리스너는 어떠셨나요?</Text>
                </div>
              </div>
              <ChkBtn>
                {tag.map((e, i) => (
                  <React.Fragment key={i}>
                    <input
                      type="checkbox"
                      value={e}
                      onChange={SelectTag}
                      name="tag"
                      id={e}
                    />
                    <label htmlFor={e}>{e}</label>
                  </React.Fragment>
                ))}
              </ChkBtn>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid orange",
                  marginTop: "15px",
                }}
              >
                <div style={{ backgroundColor: "orange" }}>
                  <Text>isLike</Text>
                </div>
                <div
                  style={{
                    width: "600px",
                    backgroundColor: "pink",
                    margin: "15px",
                  }}
                >
                  <Button
                    width="30px"
                    margin="3px"
                    text="업"
                    _onClick={() => {
                      setPoint(+1);
                    }}
                  />
                  <Button
                    width="30px"
                    text="다운"
                    _onClick={() => {
                      setPoint(-1);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                bg="#eeeeee"
                color="#61586A"
                width="300px"
                text={follow === true ? "리스너 찜하기" : "리스너 찜 취소하기"}
                cursor="pointer"
                _onClick={userFollow}
              />
              <Button
                width="300px"
                text="종료하기"
                cursor="pointer"
                _onClick={addReviewRes}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const ChkBtn = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid orange;
  width: 100%;
  margin: auto;
  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
  }

  input[type="checkbox"] + label {
    border: 1px solid #61586a;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    height: 24px;
    width: 200px;
  }
  input[type="checkbox"] + label {
    background-color: #fff;
    color: #61586a;
  }
  input[type="checkbox"]:checked + label {
    background-color: #61586a;
    color: #fff;
  }
`;

export default Review;
