import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators } from "../redux/modules/mypage";
import { nicknameCheck } from "../shared/Check";

import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";
import { Button, Text, ColorBadge, Input } from "../elements";
import { useMediaQuery } from "react-responsive";

import Layout from "../components/Layout";

const EditMyPage = () => {
  const Mobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = React.useState("#CCCCCC");
  const [nickname, setNickname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [loveType, setLoveType] = React.useState("");
  const [lovePeriod, setLovePeriod] = React.useState("");
  const [dating, setDating] = React.useState("");
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
  const [showName, setShowName] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);
  const [nickError, setNickError] = React.useState(null);
  const [nickChk, setNickChk] = React.useState(false);
  const [isDup, setIsDup] = React.useState(true);

  const nickErr = useSelector((state) => state.user.nickMsg);

  //멤버인포조회
  React.useEffect(() => {
    dispatch(actionCreators.getInfoDB());
  }, []);

  const userInfo = useSelector((state) => state.mypage.user.user);
  //defaultValue가 아닌 진짜 Value로 불러오기 위한 작업
  useEffect(() => {
    setNickname(userInfo?.nickname);
    setAge(userInfo?.age);
    setLoveType(userInfo?.loveType);
    setLovePeriod(userInfo?.lovePeriod);
    setIsSelected(userInfo?.color);
    setDating(userInfo?.dating);
  }, [userInfo]);

  const dupCheck = (nickname) => {
    if (!nicknameCheck(nickname)) {
      Swal.fire("닉네임이 형식에 맞지 않습니다. 영문/한글/숫자 포함 3-10자");
      return;
    } else {
      setIsDup(false);
    }
    setIsCheck(true);
    setShowName(nickname);
    dispatch(userActions.dupNicknameDB(nickname, setNickError));
  };

  const submitSolo = () => {
    if (age === "") {
      Swal.fire("정보를 모두 입력해주세요.");
      return;
    }
    const memberInfo = {
      nickname: nickname,
      color: isSelected,
      age: age,
      dating: dating,
      loveType: loveType,
      lovePeriod: lovePeriod,
      gender: userInfo.gender,
    };
    dispatch(actionCreators.addInfoDB(memberInfo));
  };

  const submitCouple = () => {
    if (age === "" || loveType === "" || lovePeriod === "") {
      Swal.fire("정보를 모두 입력해주세요.");
      return;
    }
    const memberInfo = {
      nickname: nickname,
      color: isSelected,
      age: age,
      dating: dating,
      loveType: loveType,
      lovePeriod: lovePeriod,
      gender: userInfo.gender,
    };
    dispatch(actionCreators.addInfoDB(memberInfo));
  };

  const addInfo = (dating) => {
    if (userInfo.nickname === nickname) {
      if (dating === "솔로") {
        submitSolo();
      }
      if (dating === "커플") {
        submitCouple();
      }
    } else if (isCheck === false) {
      Swal.fire("닉네임 중복확인을 해주세요.");
      return;
    } else if (nickErr === false) {
      Swal.fire("사용가능한 닉네임이어야 합니다.");
      return;
    } else if (!nicknameCheck(nickname)) {
      Swal.fire("닉네임이 형식에 맞지 않습니다. 영문/한글/숫자 포함 3-10자");
      return;
    }
    if (dating === "솔로") {
      submitSolo();
    }
    if (dating === "커플") {
      submitCouple();
    }
  };

  return (
    <React.Fragment>
      <Layout>
        <Background>
          <EditWrapper>
            <Text title textAlign="left">
              내 프로필 수정
            </Text>
            <EditContainer>
              <NickName>
                <ColorBadge
                  border="2px solid #F8F8F8"
                  size="60"
                  bg={isSelected}
                  cursor="pointer"
                />
                {Mobile ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="nick">
                      <Input
                        padding="11px 15px"
                        margin="0px"
                        placeholder="닉네임 3자-10자 이내 입력"
                        maxlength="10"
                        alignItems="center"
                        _onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                        value={nickname || ""}
                      />
                      {isCheck && nickErr === true ? (
                        <Text
                          sub7
                          textAlign="left"
                          margin="15px"
                          color="#50BA94"
                        >
                          사용 가능한 닉네임입니다.
                        </Text>
                      ) : null}
                      {isCheck && nickErr === false ? (
                        <Text
                          sub7
                          textAlign="left"
                          margin="15px"
                          color="#D53253"
                        >
                          사용할 수 없는 닉네임입니다.
                        </Text>
                      ) : null}
                      {isCheck === false ? (
                        <Text sub7 textAlign="left" margin="10px">
                          영문, 한글, 숫자조합 3~10자 이내로 입력해 주세요
                        </Text>
                      ) : null}
                    </div>
                    <DupChk>
                      <Text
                        sub3
                        color="#7A37BE"
                        _onClick={() => {
                          dupCheck(nickname);
                        }}
                        cursor="pointer"
                      >
                        중복확인
                      </Text>
                    </DupChk>
                  </div>
                ) : (
                  <>
                    <div className="nick">
                      <Input
                        padding="11px 15px"
                        margin="0px"
                        placeholder="닉네임 3자-10자 이내 입력"
                        maxlength="10"
                        alignItems="center"
                        _onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                        value={nickname || ""}
                      />
                      {isCheck && nickErr === true ? (
                        <Text
                          sub7
                          textAlign="left"
                          margin="15px"
                          color="#50BA94"
                        >
                          사용 가능한 닉네임입니다.
                        </Text>
                      ) : null}
                      {isCheck && nickErr === false ? (
                        <Text
                          sub7
                          textAlign="left"
                          margin="15px"
                          color="#D53253"
                        >
                          사용할 수 없는 닉네임입니다.
                        </Text>
                      ) : null}
                      {isCheck === false ? (
                        <Text sub7 textAlign="left" margin="15px">
                          영문, 한글, 숫자조합 3~10자 이내로 입력해 주세요
                        </Text>
                      ) : null}
                    </div>
                    <Text
                      sub3
                      color="#7A37BE"
                      _onClick={() => {
                        dupCheck(nickname);
                      }}
                      cursor="pointer"
                    >
                      중복확인
                    </Text>
                  </>
                )}
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
            <InfoContainerM>
              <Text title textAlign="left">
                기본 정보
              </Text>
              <InfoBox>
                <BoxInfo>
                  {Mobile ? (
                    <div className="title">
                      <Text body4 color="#7A37BE" textAlign="left">
                        수정한 정보는
                      </Text>
                      <Text body4 color="#7A37BE" textAlign="left">
                        매칭되는 상대에게만 공개됩니다.
                      </Text>
                    </div>
                  ) : (
                    <div className="title">
                      <Text body4 color="#7A37BE" textAlign="left">
                        수정한 정보는 매칭되는 상대에게만 공개됩니다.
                      </Text>
                    </div>
                  )}
                  <div id="info">
                    <div className="age">
                      <div className="typeTitleM">
                        <Text body4 color="#666666">
                          나이
                        </Text>
                      </div>
                      <div className="ageRadio">
                        {Mobile ? (
                          <>
                            <MobileAge>
                              <input
                                type="radio"
                                value="20대 초반"
                                name="나이"
                                checked={age === "20대 초반" ? "20대 초반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 초반</Text>
                              </label>
                              <input
                                type="radio"
                                value="20대 중반"
                                name="나이"
                                checked={age === "20대 중반" ? "20대 중반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 중반</Text>
                              </label>
                            </MobileAge>
                            <MobileAge>
                              <input
                                type="radio"
                                value="20대 후반"
                                name="나이"
                                checked={age === "20대 후반" ? "20대 후반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 후반</Text>
                              </label>

                              <input
                                type="radio"
                                value="30대 초반"
                                name="나이"
                                checked={age === "30대 초반" ? "30대 초반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 초반</Text>
                              </label>
                            </MobileAge>
                            <MobileAge>
                              <input
                                type="radio"
                                value="30대 중반"
                                name="나이"
                                checked={age === "30대 중반" ? "30대 중반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 중반</Text>
                              </label>
                              <input
                                type="radio"
                                value="30대 후반"
                                name="나이"
                                checked={age === "30대 후반" ? "30대 후반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 후반</Text>
                              </label>
                            </MobileAge>
                          </>
                        ) : (
                          <>
                            <WebAge>
                              <input
                                type="radio"
                                value="20대 초반"
                                name="나이"
                                checked={age === "20대 초반" ? "20대 초반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 초반</Text>
                              </label>
                              <input
                                type="radio"
                                value="20대 중반"
                                name="나이"
                                checked={age === "20대 중반" ? "20대 중반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 중반</Text>
                              </label>
                              <input
                                type="radio"
                                value="20대 후반"
                                name="나이"
                                checked={age === "20대 후반" ? "20대 후반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>20대 후반</Text>
                              </label>
                            </WebAge>
                            <WebAge>
                              <input
                                type="radio"
                                value="30대 초반"
                                name="나이"
                                checked={age === "30대 초반" ? "30대 초반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 초반</Text>
                              </label>
                              <input
                                type="radio"
                                value="30대 중반"
                                name="나이"
                                checked={age === "30대 중반" ? "30대 중반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 중반</Text>
                              </label>
                              <input
                                type="radio"
                                value="30대 후반"
                                name="나이"
                                checked={age === "30대 후반" ? "30대 후반" : ""}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                              <label>
                                <Text sub6>30대 후반</Text>
                              </label>
                            </WebAge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </BoxInfo>
              </InfoBox>
            </InfoContainerM>
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
                          <input
                            type="radio"
                            value="솔로"
                            name="연애"
                            checked={dating === "솔로" ? "솔로" : ""}
                            onChange={(e) => {
                              setDating(e.target.value);
                              setLoveType("");
                              setLovePeriod("");
                            }}
                          />
                          <label>
                            <Text sub6>솔로</Text>
                          </label>
                          <input
                            type="radio"
                            value="커플"
                            name="연애"
                            checked={dating === "커플" ? "커플" : ""}
                            onChange={(e) => {
                              setDating(e.target.value);
                            }}
                          />
                          <label>
                            <Text sub6>커플</Text>
                          </label>
                        </div>
                      </div>
                    </div>
                    {dating === "커플" ? (
                      <>
                        <div id="ageInfo">
                          <div className="age">
                            <div className="titleType">
                              <Text body4 color="#666666" textAlign="left">
                                나이차
                              </Text>
                            </div>
                            <RadioWrap>
                              <div className="radioMobile">
                                <input
                                  type="radio"
                                  value="연상"
                                  name="나이차"
                                  checked={loveType === "연상" ? "연상" : ""}
                                  onChange={(e) => {
                                    setLoveType(e.target.value);
                                  }}
                                />
                                <label>
                                  <Text sub6>연상</Text>
                                </label>
                                <input
                                  type="radio"
                                  value="동갑"
                                  name="나이차"
                                  checked={loveType === "동갑" ? "동갑" : ""}
                                  onChange={(e) => {
                                    setLoveType(e.target.value);
                                  }}
                                />
                                <label>
                                  <Text sub6>동갑</Text>
                                </label>
                              </div>
                              <div className="radioMobile">
                                <input
                                  type="radio"
                                  value="연하"
                                  name="나이차"
                                  checked={loveType === "연하" ? "연하" : ""}
                                  onChange={(e) => {
                                    setLoveType(e.target.value);
                                  }}
                                />
                                <label>
                                  <Text sub6>연하</Text>
                                </label>
                                <input
                                  type="radio"
                                  value="해당없음"
                                  name="나이차"
                                  checked={
                                    loveType === "해당없음" ? "해당없음" : ""
                                  }
                                  onChange={(e) => {
                                    setLoveType(e.target.value);
                                  }}
                                />
                                <label>
                                  <Text sub6>해당없음</Text>
                                </label>
                              </div>
                            </RadioWrap>
                          </div>
                        </div>
                        <div id="info">
                          <div className="age">
                            <div className="mobileLove">
                              <Text body4 color="#666666" textAlign="left">
                                연애기간
                              </Text>
                            </div>
                            {Mobile ? (
                              <div
                                style={{
                                  marginLeft: "30px",
                                  marginBottom: "55px",
                                }}
                              >
                                <LoveRadio>
                                  <input
                                    type="radio"
                                    value="6개월 미만"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "6개월 미만"
                                        ? "6개월 미만"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>6개월 미만</Text>
                                  </label>
                                  <input
                                    type="radio"
                                    value="6개월~2년"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "6개월~2년"
                                        ? "6개월~2년"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>6개월~2년</Text>
                                  </label>
                                </LoveRadio>
                                <LoveRadio2>
                                  <input
                                    type="radio"
                                    value="2년 이상"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "2년 이상"
                                        ? "2년 이상"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>2년 이상</Text>
                                  </label>
                                  <input
                                    type="radio"
                                    value="5년 이상"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "5년 이상"
                                        ? "5년 이상"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>5년 이상</Text>
                                  </label>
                                </LoveRadio2>
                                <LoveRadio>
                                  <input
                                    type="radio"
                                    value="해당없음"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "해당없음"
                                        ? "해당없음"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>해당없음</Text>
                                  </label>
                                </LoveRadio>
                              </div>
                            ) : (
                              <div className="ageRadio">
                                <div className="radio">
                                  <input
                                    type="radio"
                                    value="6개월 미만"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "6개월 미만"
                                        ? "6개월 미만"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>6개월 미만</Text>
                                  </label>
                                  <input
                                    type="radio"
                                    value="6개월~2년"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "6개월~2년"
                                        ? "6개월~2년"
                                        : ""
                                    }
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
                                    value="2년 이상"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "2년 이상"
                                        ? "2년 이상"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>2년 이상</Text>
                                  </label>
                                  <input
                                    type="radio"
                                    value="5년 이상"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "5년 이상"
                                        ? "5년 이상"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>5년 이상</Text>
                                  </label>
                                  <input
                                    type="radio"
                                    value="해당없음"
                                    name="연애기간"
                                    checked={
                                      lovePeriod === "해당없음"
                                        ? "해당없음"
                                        : ""
                                    }
                                    onChange={(e) => {
                                      setLovePeriod(e.target.value);
                                    }}
                                  />
                                  <label>
                                    <Text sub6>해당없음</Text>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}
                  </BoxInfo>
                </InfoBox>
              </InfoContainer>
            </TypeBox>
          </InfoWrapper>
          <BtnBox>
            <Button
              primary
              size="regular"
              cursor="pointer"
              _onClick={() => {
                addInfo(dating);
              }}
            >
              <Text body4 color="#ffffff" cursor="pointer">
                정보 수정하기
              </Text>
            </Button>
          </BtnBox>
          <MBtnBox>
            <button
              onClick={() => {
                addInfo(dating);
              }}
              className="mobile"
            >
              <Text body4 color="#ffffff" cursor="pointer">
                정보 수정하기
              </Text>
            </button>
          </MBtnBox>
        </Background>
      </Layout>
    </React.Fragment>
  );
};
const Background = styled.div`
  height: 900px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 1300px;
    padding-top: 30px;
  }
`;

const EditWrapper = styled.div`
  max-width: 1032px;
  height: 245px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 465px;
  }
`;

const EditContainer = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 200px;
  margin-top: 15px;
  gap: 68px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  background: #ffffff;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 415px;
    margin: auto;
  }
`;

const NickName = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  gap: 20px;
  .nick {
    width: 200px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 272px;
    height: 215px;
    margin: 40px auto 20px;
    gap: 0px;
    .nick {
      margin: 20px auto 0px;
    }
  }
`;

const Color = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 20px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
  gap: 10px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.device.mobile} {
    display: grid;
    grid-template-columns: repeat(8, 25px);
    flex-direction: column;
    width: 272px;
    margin-top: -90px;
    gap: 6px;
    box-sizing: border-box;
  }
`;

const DupChk = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 50px;
  height: 110px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 75px auto 30px;
  max-width: 1032px;
  gap: 24px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 370px;
    margin: auto;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 284px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 370px;
    margin: auto;
  }
`;

const InfoContainerM = styled.div`
  width: 100%;
  height: 284px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 284px;
    margin: auto;
  }
`;

const MobileAge = styled.div`
  display: flex;
  flex-direction: row;
  width: 204px;
  height: 122px;
  padding: 10px 0px;
  gap: 10px;
  box-sizing: border-box;
`;

const WebAge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0px;
  gap: 10px;
  margin-left: 30px;
  box-sizing: border-box;
`;

const InfoBox = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 504px;
  height: 240px;
  margin-top: 15px;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 20px;
  background: #ffffff;
  .title {
    margin-bottom: 18px;
  }
  #info {
    display: flex;
    flex-direction: column;
    height: 112px;
    gap: 8px;
  }
  .gender {
    display: flex;
    align-items: center;
    width: 220px;
    height: 38px;
  }
  .radio {
    display: flex;
    flex-direction: row;
    margin-left: 35px;
    gap: 10px;
  }
  .radioMobile {
    display: flex;
    flex-direction: row;
    margin-left: 35px;
    gap: 10px;
  }
  .radioTerm {
    display: flex;
    flex-direction: row;
    margin-left: 35px;
    gap: 16.3px;
  }
  .age {
    display: flex;
    align-items: center;
    width: 387px;
    height: 66px;
  }
  .ageRadio {
    display: flex;
    flex-direction: column;
  }
  .typeTitle {
    width: 50px;
  }
  .typeTitleM {
    width: 50px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 370px;
    margin: auto;
    .title {
      width: 294px;
      height: 100px;
      margin: auto;
      padding-left: 26px;
      box-sizing: border-box;
    }
    #info {
      display: flex;
      flex-direction: column;
      width: 294px;
      margin: auto;
      gap: 8px;
    }
    #ageInfo {
      ${({ theme }) => theme.common.flexCenterColumn};
      width: 294px;
      height: 80px;
      margin: auto;
      gap: 8px;
      box-sizing: border-box;
    }
    .radio {
      display: flex;
      flex-direction: row;
      width: 220px;
      margin-right: 60px;
      gap: 10px;
    }
    .radioMobile {
      display: flex;
      flex-direction: row;
      width: 220px;
      height: 0px;
      padding: 10px 0px;
      gap: 31px;
      box-sizing: border-box;
    }
    .radioTerm {
      display: flex;
      flex-direction: row;
      width: 220px;
      margin-left: 35px;
      gap: 2px;
    }
    .age {
      display: flex;
      align-items: center;
      width: 294px;
      height: 100px;
      margin: auto;
      padding-top: 24px;
    }
    .ageRadio {
      display: flex;
      flex-direction: column;
      height: 122px;
    }
    .typeTitleM {
      width: 35px;
      padding: 30px;
    }
    .mobileLove {
      padding-bottom: 100px;
    }
    .typeTitle {
      width: 50px;
    }
    .titleType {
      width: 50px;
      margin-bottom: 40px;
    }
  }
`;

const LoveRadio = styled.div`
  display: flex;
  flex-direction: row;
  width: 220px;
  padding: 0px 0px 0px 12px;
  margin-bottom: 10px;
  gap: 18px;
`;

const LoveRadio2 = styled.div`
  display: flex;
  flex-direction: row;
  width: 220px;
  padding: 0px 0px 0px 12px;
  margin-bottom: 10px;
  gap: 24px;
`;

const RadioWrap = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: flex;
    flex-direction: row;
    margin-left: 13px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-bottom: 50px;
  }
`;

const BoxInfo = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  height: 158px;
  width: 374px;
`;

const TypeBox = styled.div`
  max-width: 504px;
  height: 284px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: right;
  max-width: 1032px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MBtnBox = styled.div`
  @media ${({ theme }) => theme.device.web} {
    display: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    position: fixed;
    bottom: 0;
    .mobile {
      width: 100vw;
      height: 48px;
      background: #7a37be;
      border: none;
      border-radius: 0px;
    }
  }
`;
export default EditMyPage;
