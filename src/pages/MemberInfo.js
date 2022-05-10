import React from "react";
import { Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck } from "../shared/Check";

function MemberInfo() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [loveType, setLoveType] = React.useState("");
  const [lovePeriod, setLovePeriod] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

  const memberId = localStorage.getItem("memberId");

  const dupCheck = (nickname) => {
    if (!nicknameCheck(nickname)) {
      window.alert("닉네임이 형식에 맞지 않습니다. 영문/한글/숫자 포함 3-10자");
      return;
    }
    setIsCheck(true);
    dispatch(userActions.dupNicknameDB(nickname));
  };

  const submit = () => {
    const memberInfo = {
      nickname: nickname,
      gender: gender,
      age: age,
      loveType: loveType,
      lovePeriod: lovePeriod,
    };
    dispatch(userActions.memberInfoDB(memberId, memberInfo));
  };

  const sendInfo = () => {
    if (isCheck === false) {
      window.alert("닉네임 중복확인을 해주세요!");
    }

    if (
      nickname === "" ||
      gender === "" ||
      age === "" ||
      loveType === "" ||
      lovePeriod === ""
    ) {
      window.alert("필수정보를 모두 입력해주세요!");
      return;
    }
  };

  return (
    <React.Fragment>
      <div id="wrap" width="70vw" padding="16px" margin="15% auto">
        <div id="container" width="60%" margin="0px auto">
          <div>
            <div
              id="nickName"
              display="flex"
              borderLine="1px solid orange"
              justifyContent="flex-start"
              width="100%"
            >
              <div id="title" width="20%" borderLine="1px solid orange">
                <Text textAlign="left" bold>
                  닉네임
                </Text>
              </div>
              <div id="input" width="60%">
                <Input
                  placeholder="활동하실 닉네임을 입력해주세요."
                  value={nickname}
                  _onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </div>
              <div width="10%" margin="8px 20px">
                <Button
                  text="중복조회"
                  padding="5px"
                  _onClick={() => {
                    dupCheck(nickname);
                  }}
                />
              </div>
            </div>
            <div
              id="gender"
              display="flex"
              borderLine="1px solid orange"
              justifyContent="flex-start"
              items="center"
              width="100%"
            >
              <div id="title" width="20%" borderLine="1px solid orange">
                <Text textAlign="left" bold>
                  성별
                </Text>
              </div>
              <div id="input" width="60%" display="flex">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  남
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  여
                </div>
              </div>
            </div>
            <div
              id="age"
              display="flex"
              borderLine="1px solid orange"
              justifyContent="flex-start"
              items="center"
              width="100%"
            >
              <div id="title" width="20%" borderLine="1px solid orange">
                <Text textAlign="left" bold>
                  연령대
                </Text>
              </div>
              <div id="input" width="60%" display="columns">
                <div
                  id="line1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="20대 초반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    20대 초반
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="20대 중반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    20대 중반
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="20대 후반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    20대 후반
                  </div>
                </div>
                <div
                  id="line2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="30대 초반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    30대 초반
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="20대 중반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    30대 중반
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="age"
                      value="20대 후반"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    30대 후반
                  </div>
                </div>
              </div>
            </div>
            <div
              id="loveType"
              display="flex"
              borderLine="1px solid orange"
              justifyContent="flex-start"
              items="center"
            >
              <div id="title" width="20%" borderLine="1px solid orange">
                <Text textAlign="left" bold>
                  연애유형
                </Text>
              </div>
              <div id="input" width="60%" display="flex">
                <div>
                  <input
                    type="radio"
                    name="loveType"
                    value="연하"
                    onChange={(e) => {
                      setLoveType(e.target.value);
                    }}
                  />
                  연하
                </div>
                <div>
                  <input
                    type="radio"
                    name="loveType"
                    value="동갑"
                    onChange={(e) => {
                      setLoveType(e.target.value);
                    }}
                  />
                  동갑
                </div>
                <div>
                  <input
                    type="radio"
                    name="loveType"
                    value="연상"
                    onChange={(e) => {
                      setLoveType(e.target.value);
                    }}
                  />
                  연상
                </div>
              </div>
            </div>
            <div
              id="lovePeriod"
              display="flex"
              borderLine="1px solid orange"
              justifyContent="flex-start"
              items="center"
            >
              <div id="title" width="20%" borderLine="1px solid orange">
                <Text textAlign="left" bold>
                  연애기간
                </Text>
              </div>
              <div
                id="input"
                width="60%"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <input
                    type="radio"
                    name="lovePeriod"
                    value="6개월 미만"
                    onChange={(e) => {
                      setLovePeriod(e.target.value);
                    }}
                  />
                  6개월 미만
                </div>
                <div>
                  <input
                    type="radio"
                    name="lovePeriod"
                    value="2년 미만"
                    onChange={(e) => {
                      setLovePeriod(e.target.value);
                    }}
                  />
                  2년 미만
                </div>
                <div>
                  <input
                    type="radio"
                    name="lovePeriod"
                    value="3년 이상"
                    onChange={(e) => {
                      setLovePeriod(e.target.value);
                    }}
                  />
                  3년 이상
                </div>
              </div>
            </div>
          </div>
          <div width="30%" margin="20px auto">
            <Button text="등록완료" cursor="pointer" _onClick={submit} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MemberInfo;
