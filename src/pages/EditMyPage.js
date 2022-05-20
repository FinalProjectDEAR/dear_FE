import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Text, ColorBadge, Input } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/modules/mypage";

const EditMyPage = () => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = React.useState("#CCCCCC");
  const [nickname, setNickname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [loveType, setLoveType] = React.useState("");
  const [lovePeriod, setLovePeriod] = React.useState("");
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
  //멤버인포조회
  React.useEffect(() => {
    dispatch(actionCreators.getInfoDB());
  }, []);
  const userInfo = useSelector((state) => state.mypage.user.user);
  console.log(userInfo);
  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    // console.log("유즈이펙트 시작한다~~");
    setNickname(userInfo?.nickname);
    setGender(userInfo?.gender);
    setAge(userInfo?.age);
    setLoveType(userInfo?.loveType);
    setLovePeriod(userInfo?.lovePeriod);
    setIsSelected(userInfo?.color);
  }, [userInfo]);
  const addInfo = () => {
    dispatch(
      actionCreators.addInfoDB(
        age,
        isSelected,
        gender,
        lovePeriod,
        loveType,
        nickname
      )
    );
  };
  return (
    <React.Fragment>
      <EditWrapper>
        <Text title textAlign="left">
          내프로필 수정
        </Text>
        <EditContainer>
          <NickName>
            <ColorBadge
              border="2px solid #F8F8F8"
              size="60"
              bg={isSelected}
              cursor="pointer"
            />
            <div className="nick">
              <Input
                _onChange={(e) => {
                  setNickname(e.target.value);
                }}
                value={nickname || ""}
              />
            </div>
          </NickName>
          <Color>
            {colorList.map((color, idx) => {
              return (
                <ColorBadge
                  border="2px solid #F8F8F8"
                  size="20"
                  margin="10px 0px"
                  bg={color || "#CCCCCC"}
                  key={idx}
                  cursor="pointer"
                  _onClick={() => {
                    setIsSelected(color);
                  }}
                />
              );
            })}
          </Color>
        </EditContainer>
      </EditWrapper>

      <InfoWrapper>
        <InfoContainer>
          <Text title textAlign="left">
            기본 정보
          </Text>
          <InfoBox>
            <BoxInfo>
              <div className="title">
                <Text body4 color="#7A37BE" textAlign="left">
                  수정된 정보는 매칭되는 상대에게만 공개됩니다.
                </Text>
              </div>
              <div id="info">
                <div className="gender">
                  <Text body4 color="#666666">
                    성별
                  </Text>
                  <div className="radio">
                    <input
                      type="radio"
                      value={gender || ""}
                      name="성별"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label>
                      <Text sub6>남성</Text>
                    </label>
                    <input
                      type="radio"
                      value={gender || ""}
                      name="성별"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label>
                      <Text sub6>여성</Text>
                    </label>
                  </div>
                </div>
                <div id="info">
                  <div className="age">
                    <Text body4 color="#666666">
                      나이
                    </Text>
                    <div className="ageRadio">
                      <div className="radio">
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>20대 초반</Text>
                        </label>
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>20대 중반</Text>
                        </label>
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>20대 후반</Text>
                        </label>
                      </div>
                      <div className="radio">
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>30대 초반</Text>
                        </label>
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>30대 중반</Text>
                        </label>
                        <input
                          type="radio"
                          value={age || ""}
                          name="나이"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>30대 후반</Text>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BoxInfo>
          </InfoBox>
        </InfoContainer>
        <TypeBox>
          <Text title textAlign="left">
            연애 유형
          </Text>
          <InfoContainer>
            <InfoBox>
              <BoxInfo>
                <div id="info">
                  <div className="age">
                    <div className="typeTitle">
                      <Text body4 color="#666666" textAlign="left">
                        유형
                      </Text>
                    </div>
                    <div className="radio">
                      <input type="radio" value="솔로" name="연애" />
                      <label>
                        <Text sub6>솔로</Text>
                      </label>
                      <input type="radio" value="커플" name="연애" />
                      <label>
                        <Text sub6>커플</Text>
                      </label>
                    </div>
                  </div>
                </div>

                <div id="info">
                  <div className="age">
                    <div className="typeTitle">
                      <Text body4 color="#666666" textAlign="left">
                        나이차
                      </Text>
                    </div>

                    <div className="radio">
                      <input
                        type="radio"
                        value={loveType || ""}
                        name="나이차"
                        onChange={(e) => {
                          setLoveType(e.target.value);
                        }}
                      />
                      <label>
                        <Text sub6>연상</Text>
                      </label>
                      <input
                        type="radio"
                        value={loveType || ""}
                        name="나이차"
                        onChange={(e) => {
                          setLoveType(e.target.value);
                        }}
                      />
                      <label>
                        <Text sub6>동갑</Text>
                      </label>
                      <input
                        type="radio"
                        value={loveType || ""}
                        name="나이차"
                        onChange={(e) => {
                          setLoveType(e.target.value);
                        }}
                      />
                      <label>
                        <Text sub6>연하</Text>
                      </label>
                      <input
                        type="radio"
                        value={loveType || ""}
                        name="나이차"
                        onChange={(e) => {
                          setLoveType(e.target.value);
                        }}
                      />
                      <label>
                        <Text sub6>해당없음</Text>
                      </label>
                    </div>
                  </div>
                </div>

                <div id="info">
                  <div className="age">
                    <div className="typeTitle">
                      <Text body4 color="#666666" textAlign="left">
                        연애기간
                      </Text>
                    </div>

                    <div className="ageRadio">
                      <div className="radio">
                        <input
                          type="radio"
                          value={lovePeriod || ""}
                          name="연애기간"
                          onChange={(e) => {
                            setLovePeriod(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>6개월 미만</Text>
                        </label>
                        <input
                          type="radio"
                          value={lovePeriod || ""}
                          name="연애기간"
                          onChange={(e) => {
                            setLovePeriod(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>6개월~2년</Text>
                        </label>
                      </div>
                      <div className="radioTerm">
                        <input
                          type="radio"
                          value={lovePeriod || ""}
                          name="연애기간"
                          onChange={(e) => {
                            setLovePeriod(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>2년 이상</Text>
                        </label>
                        <input
                          type="radio"
                          value={lovePeriod || ""}
                          name="연애기간"
                          onChange={(e) => {
                            setLovePeriod(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>5년 이상</Text>
                        </label>
                        <input
                          type="radio"
                          value={lovePeriod || ""}
                          name="연애기간"
                          onChange={(e) => {
                            setLovePeriod(e.target.value);
                          }}
                        />
                        <label>
                          <Text sub6>해당없음</Text>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </BoxInfo>
            </InfoBox>
          </InfoContainer>
        </TypeBox>
      </InfoWrapper>
      <BtnBox>
        <Button primary size="regular" cursor="pointer" _onClick={addInfo}>
          <Text body4 color="#ffffff" cursor="pointer">
            정보 수정하기
          </Text>
        </Button>
      </BtnBox>
    </React.Fragment>
  );
};

const EditWrapper = styled.div`
  margin: auto;
  max-width: 1032px;
  height: 245px;
`;
const EditContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 68px;
`;
const NickName = styled.div`
  width: 244px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .nick {
    width: 164px;
  }
`;
const Color = styled.div`
  width: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(16, 20px);
  flex-direction: column;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 75px auto 30px;
  max-width: 1032px;
  gap: 24px;
`;
const InfoContainer = styled.div`
  width: 100%;
  height: 284px;
`;
const InfoBox = styled.div`
  margin-top: 15px;
  width: 504px;
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    margin-bottom: 18px;
  }
  #info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 112px;
  }
  .gender {
    display: flex;
    align-items: center;
    width: 220px;
    height: 38px;
  }
  .radio {
    margin-left: 35px;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .radioTerm {
    margin-left: 35px;
    display: flex;
    flex-direction: row;
    gap: 16.3px;
  }
  .age {
    width: 387px;
    height: 66px;
    display: flex;
    align-items: center;
  }
  .ageRadio {
    display: flex;
    flex-direction: column;
  }
  .typeTitle {
    width: 50px;
  }
`;
const BoxInfo = styled.div`
  width: 387px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  height: 158px;
`;
const TypeBox = styled.div`
  max-width: 504px;
  height: 284px;
`;
const BtnBox = styled.div`
  max-width: 1032px;
  display: flex;
  justify-content: right;
  margin: auto;
`;
export default EditMyPage;
