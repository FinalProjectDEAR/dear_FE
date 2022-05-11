import React from "react";
import { Text, Input, Button, ColorBadge } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck } from "../shared/Check";

import styled from "styled-components";

function MemberInfo() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [loveType, setLoveType] = React.useState("");
  const [lovePeriod, setLovePeriod] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

  const [showName, setShowName] = React.useState("");
  const [nickError, setNickError] = React.useState(null);
  const [isSelected, setIsSelected] = React.useState("#fff");
  const [isNext, setIsNext] = React.useState(1);

  const memberId = localStorage.getItem("memberId");

  const nickErr = useSelector((state) => state.user.msg);

  const dupCheck = (nickname) => {
    if (!nicknameCheck(nickname)) {
      window.alert("닉네임이 형식에 맞지 않습니다. 영문/한글/숫자 포함 3-10자");
      return;
    }
    setIsCheck(true);
    setShowName(nickname);
    dispatch(userActions.dupNicknameDB(nickname, setNickError));
  };

  const next = () => {
    if (nickname === "" || isSelected === "#fff") {
      window.alert("닉네임, 퍼스널 컬러를 모두 입력해주세요!");
      return;
    }
    setIsNext(2);
  };

  const submit = () => {
    if (gender === "" || age === "" || loveType === "" || lovePeriod === "") {
      window.alert("정보를 모두 입력해주세요.");
      return;
    }

    const memberInfo = {
      nickname: nickname,
      color: isSelected,
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

  const colorList = [
    "#7A37BE",
    "#FFE5A1",
    "#FFA945",
    "#FF0099",
    "#FF3D3D",
    "#82F9CC",
    "#FFE91E",
    "#6255F7",
    "#FFF7B0",
    "#E3E9F8",
    "#FFA7A7",
    "#96DAFE",
    "#9AA4FF",
    "#FF926B",
    "#1A9AE2",
    "#B794DA",
    "#FF7715",
    "#F2E5FF",
    "#B9E7DE",
    "#043957",
    "#E0E0E0",
    "#C6A6FB",
    "#96F394",
    "#C525A1",
    "#C2C2C2",
    "#5F6465",
    "#D2E63E",
    "#FED500",
    "#74E900",
    "#B2BCE1",
    "#B90000",
    "#024DA5",
  ];

  return (
    <React.Fragment>
      {isNext === 1 ? (
        <InfoWrapper>
          <TitleBox>
            <Text color="#BB9ED8" weight="500" size="14px">
              STEP 1
            </Text>
            <Text
              margin="0px 10px"
              batang
              weight="500"
              size="16px"
              color="#333333"
            >
              나를 가장 잘 나타내는 프로필을 만들어주세요.
            </Text>
          </TitleBox>
          <InfoContainer>
            <Preview>
              <ColorBadge size="40" bg={isSelected} />
              <Text margin="0px 15px" batang weight="300" size="16px">
                {showName}
              </Text>
            </Preview>

            <NickBox>
              <div style={{ display: "flex" }}>
                <Input
                  padding="15px"
                  margin="0px"
                  placeholder="10자 이내로 입력해주세요."
                  alignItems="center"
                  _onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  value={nickname}
                />
                <ButtonBox>
                  <Button
                    width="110px"
                    margin="0px 10px"
                    borderRadius="22px"
                    bg="#BB9ED8"
                    text="중복확인"
                    _onClick={() => {
                      dupCheck(nickname);
                    }}
                  />
                </ButtonBox>
              </div>
              <Text
                weight="300"
                size="12px"
                color="#999"
                textAlign="left"
                margin="0px 15px"
              >
                {nickErr}
              </Text>
            </NickBox>

            <ColorBox>
              {colorList.map((color, idx) => {
                return (
                  <ColorBadge
                    border="2px solid #F8F8F8"
                    size="20"
                    margin="10px 0px"
                    bg={color}
                    key={idx}
                    cursor="pointer"
                    _onClick={() => {
                      setIsSelected(color);
                    }}
                  />
                );
              })}
            </ColorBox>
            <ButtonBox>
              <Button
                width="160px"
                bg="#61586A"
                margin="20px 0px"
                shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
                _onClick={() => {
                  setIsNext(2);
                }}
              >
                <Text
                  margin="0px"
                  color="#fff"
                  weight="500"
                  size="14px"
                  cursor="pointer"
                >
                  다음단계
                </Text>
              </Button>
            </ButtonBox>
          </InfoContainer>
        </InfoWrapper>
      ) : null}
      {isNext === 2 ? (
        <InfoWrapper>
          <TitleBox>
            <Text color="#BB9ED8" weight="500" size="14px">
              STEP 2
            </Text>
            <Text
              margin="0px 10px"
              batang
              weight="500"
              size="16px"
              color="#333333"
            >
              리스너 매칭과 상담을 위한 정보를 선택해주세요.
            </Text>
          </TitleBox>
          <InfoContainer>
            <LineBox>
              <Subject>
                <Text weight="500" size="14px" color="#999" textAlign="left">
                  성별
                </Text>
              </Subject>

              <InputBox>
                <CheckBox>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <Text weight="300" size="14px" color="#333333">
                    남성
                  </Text>
                </CheckBox>
                <CheckBox>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <Text weight="300" size="14px" color="#333333">
                    여성
                  </Text>
                </CheckBox>
              </InputBox>
            </LineBox>

            <LineBox>
              <Subject>
                <Text weight="500" size="14px" color="#999" textAlign="left">
                  나이
                </Text>
              </Subject>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="age"
                      value="20대"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      20대 초·중반
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="age"
                      value="20대"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      20대 후반
                    </Text>
                  </CheckBox>
                </InputBox>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="age"
                      value="30대"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      30대 초·중반
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="age"
                      value="30대"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      30대 후반
                    </Text>
                  </CheckBox>
                </InputBox>
              </div>
            </LineBox>
            <LineBox>
              <Subject>
                <Text weight="500" size="14px" color="#999" textAlign="left">
                  연애유형
                </Text>
              </Subject>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="loveType"
                      value="본인이 연하"
                      onChange={(e) => {
                        setLoveType(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      본인이 연하
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="loveType"
                      value="동갑"
                      onChange={(e) => {
                        setLoveType(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      동갑
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="loveType"
                      value="본인이 연상"
                      onChange={(e) => {
                        setLoveType(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      본인이 연상
                    </Text>
                  </CheckBox>
                </InputBox>
              </div>
            </LineBox>
            <LineBox>
              <Subject>
                <Text weight="500" size="14px" color="#999" textAlign="left">
                  연애기간
                </Text>
              </Subject>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <InputBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="lovePeriod"
                      value="6개월 미만"
                      onChange={(e) => {
                        setLovePeriod(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      6개월 미만
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="lovePeriod"
                      value="6개월 ~ 2년 미만"
                      onChange={(e) => {
                        setLovePeriod(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      6개월 ~ 2년 미만
                    </Text>
                  </CheckBox>
                  <CheckBox>
                    <input
                      type="radio"
                      name="lovePeriod"
                      value="3년 이상"
                      onChange={(e) => {
                        setLovePeriod(e.target.value);
                      }}
                    />
                    <Text weight="300" size="14px" color="#333333">
                      3년 이상
                    </Text>
                  </CheckBox>
                </InputBox>
              </div>
            </LineBox>
            <SubmitBox>
              <Button
                width="160px"
                bg=" #BB9ED8"
                margin="10px"
                shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
                _onClick={() => {
                  setIsNext(1);
                }}
              >
                <Text
                  margin="0px"
                  color="#fff"
                  weight="500"
                  size="14px"
                  cursor="pointer"
                >
                  이전단계
                </Text>
              </Button>
              <Button
                width="160px"
                bg="#7A37BE"
                margin="10px"
                shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
                _onClick={submit}
              >
                <Text
                  margin="0px"
                  color="#fff"
                  weight="500"
                  size="14px"
                  cursor="pointer"
                >
                  선택완료
                </Text>
              </Button>
            </SubmitBox>
          </InfoContainer>
        </InfoWrapper>
      ) : null}
    </React.Fragment>
  );
}

export default MemberInfo;

const InfoWrapper = styled.div`
  width: 550px;
  height: 614px;
  border-radius: 20px;
  margin: auto;
  padding: 70px;
  box-sizing: border-box;
  background-color: #fff;
`;

const InfoContainer = styled.div`
  width: 364px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LineBox = styled.div`
  margin: 10px 0px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
`;

const Preview = styled.div`
  width: 280px;
  height: 92px;
  margin: 15px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
`;

const NickBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColorBox = styled.div`
  margin: 10px 0px;
  display: grid;
  grid-template-columns: repeat(8, 30px);
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Subject = styled.div`
  width: 70px;
  padding: 10px 0px;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  margin: 10px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
`;

const SubmitBox = styled.div`
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
