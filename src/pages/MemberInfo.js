import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

import { actionCreators as userActions } from "../redux/modules/user";
import { nicknameCheck } from "../shared/Check";

import { Text, TextB, Input, Button, ColorBadge, Modal } from "../elements";
import arrowBack from "../assets/arrow_back.png";
import styled from "styled-components";

function MemberInfo() {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState("");
  const [dating, setDating] = React.useState("");
  const [loveType, setLoveType] = React.useState("");
  const [lovePeriod, setLovePeriod] = React.useState("");
  const [isCheck, setIsCheck] = React.useState(false);

  const [showName, setShowName] = React.useState("");
  const [nickError, setNickError] = React.useState(null);
  const [isSelected, setIsSelected] = React.useState("#fff");
  const [isNext, setIsNext] = React.useState(1);

  const memberId = localStorage.getItem("memberId");

  const nickErr = useSelector((state) => state.user.msg);

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    history.push("/");
  };

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
    if (isCheck === false) {
      window.alert("닉네임 중복확인을 해주세요!");
    }

    if (nickname === "" || isSelected === "#fff") {
      window.alert("닉네임, 퍼스널 컬러를 모두 입력해주세요!");
      return;
    }
    setIsNext(2);
  };

  const submitSolo = () => {
    if (gender === "" || age === "") {
      window.alert("솔로 정보를 모두 입력해주세요.");
      return;
    }
    const memberInfo = {
      nickname: nickname,
      color: isSelected,
      gender: gender,
      age: age,
      dating: dating,
      loveType: loveType,
      lovePeriod: lovePeriod,
    };
    dispatch(userActions.memberInfoDB(memberId, memberInfo));
  };

  const submitCouple = () => {
    if (gender === "" || age === "" || loveType === "" || lovePeriod === "") {
      window.alert("커플 정보를 모두 입력해주세요.");
      return;
    }
    const memberInfo = {
      nickname: nickname,
      color: isSelected,
      gender: gender,
      age: age,
      dating: dating,
      loveType: loveType,
      lovePeriod: lovePeriod,
    };
    dispatch(userActions.memberInfoDB(memberId, memberInfo));
  };

  const submit = (dating) => {
    if (dating === "솔로") {
      submitSolo();
    } else if (dating === "커플") {
      submitCouple();
    } else {
      window.alert("정보를 모두 입력해주세요.");
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
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <React.Fragment>
            {isNext === 1 ? (
              <InfoWrapper>
                <TitleBox>
                  <Text body4 color="#BB9ED8">
                    STEP 1
                  </Text>
                  <TextB margin="0px 10px" color="#333333">
                    나를 가장 잘 나타내는 프로필을 만들어주세요.
                  </TextB>
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
                        padding="11px 15px"
                        margin="0px"
                        placeholder="닉네임 3자-10자 이내 입력"
                        alignItems="center"
                        _onChange={(e) => {
                          setNickname(e.target.value);
                        }}
                        value={nickname}
                      />
                      <Button
                        secondaryDefault
                        size="small"
                        margin="0px 10px"
                        _onClick={() => {
                          dupCheck(nickname);
                        }}
                      >
                        <Text body4 color="#7A37BE">
                          중복확인
                        </Text>
                      </Button>
                    </div>
                    {nickErr ? (
                      <Text sub7 textAlign="left" margin="15px">
                        {nickErr}
                      </Text>
                    ) : (
                      <Text sub7 textAlign="left" margin="15px">
                        영문, 한글, 숫자조합 3~10자 이내로 입력해 주세요.
                      </Text>
                    )}
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
                      primaryDefault
                      size="regular"
                      margin="20px 0px"
                      _onClick={next}
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
                <MobileButton onClick={next}>
                  <Text body4 color="#fff" cursor="pointer" textAlign="center">
                    다음 단계
                  </Text>
                </MobileButton>
              </InfoWrapper>
            ) : null}
            {isNext === 2 ? (
              <InfoWrapper>
                <ArrowLine>
                  <ArrowBack
                    src={arrowBack}
                    onClick={() => {
                      setIsNext(1);
                    }}
                  />
                </ArrowLine>
                <TitleBox>
                  <Text body4 color="#BB9ED8">
                    STEP 2
                  </Text>
                  <TextB margin="0px 10px" color="#333333">
                    리스너 매칭과 상담을 위한 정보를 선택해주세요.
                  </TextB>
                </TitleBox>
                <Text
                  sub5
                  color="#BB9ED8"
                  textAlign="center"
                  margin="0px 0px 20px 0px"
                >
                  입력한 정보는 상담시 매칭되는 상대방에게만 공개됩니다.
                </Text>
                <InfoContainer>
                  <LineBox>
                    <Subject>
                      <Text body4 textAlign="left">
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
                      <Text body4 textAlign="left">
                        나이
                      </Text>
                    </Subject>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputBox>
                        <CheckBox>
                          <input
                            type="radio"
                            name="age"
                            value="20대 초반"
                            onChange={(e) => {
                              setAge(e.target.value);
                            }}
                          />
                          <Text weight="300" size="14px" color="#333333">
                            20대 초반
                          </Text>
                        </CheckBox>
                        <CheckBox>
                          <input
                            type="radio"
                            name="age"
                            value="20대 중반"
                            onChange={(e) => {
                              setAge(e.target.value);
                            }}
                          />
                          <Text weight="300" size="14px" color="#333333">
                            20대 중반
                          </Text>
                        </CheckBox>
                        <CheckBox>
                          <input
                            type="radio"
                            name="age"
                            value="20대 후반"
                            onChange={(e) => {
                              setAge(e.target.value);
                            }}
                          />
                          <Text weight="300" size="14px" color="#333333">
                            20대 후반
                          </Text>
                        </CheckBox>
                      </InputBox>
                    </div>
                  </LineBox>
                  <SecondLine>
                    <InputBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="age"
                          value="30대 초반"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <Text weight="300" size="14px" color="#333333">
                          30대 초반
                        </Text>
                      </CheckBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="age"
                          value="30대 중반"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <Text weight="300" size="14px" color="#333333">
                          30대 중반
                        </Text>
                      </CheckBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="age"
                          value="30대 후반"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <Text weight="300" size="14px" color="#333333">
                          30대 후반
                        </Text>
                      </CheckBox>
                    </InputBox>
                  </SecondLine>

                  <LineBox>
                    <Subject>
                      <Text body4 textAlign="left">
                        유형
                      </Text>
                    </Subject>

                    <InputBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="dating"
                          value="솔로"
                          onChange={(e) => {
                            setDating(e.target.value);
                          }}
                        />
                        <Text weight="300" size="14px" color="#333333">
                          솔로
                        </Text>
                      </CheckBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="dating"
                          value="커플"
                          onChange={(e) => {
                            setDating(e.target.value);
                          }}
                        />
                        <Text weight="300" size="14px" color="#333333">
                          커플
                        </Text>
                      </CheckBox>
                    </InputBox>
                  </LineBox>

                  {dating === "커플" ? (
                    <>
                      <LineBox>
                        <Subject>
                          <Text body4 textAlign="left">
                            나이차
                          </Text>
                        </Subject>
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
                              연하
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
                              연상
                            </Text>
                          </CheckBox>
                        </InputBox>
                      </LineBox>
                      <LineBox>
                        <Subject>
                          <Text body4 textAlign="left">
                            연애기간
                          </Text>
                        </Subject>
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
                              value="6개월 ~ 2년"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text weight="300" size="14px" color="#333333">
                              6개월 ~ 2년
                            </Text>
                          </CheckBox>
                        </InputBox>
                      </LineBox>
                      <SecondLine>
                        <InputBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="lovePeriod"
                              value="2년 이상"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text weight="300" size="14px" color="#333333">
                              2년 이상
                            </Text>
                          </CheckBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="lovePeriod"
                              value="5년 이상"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text weight="300" size="14px" color="#333333">
                              5년 이상
                            </Text>
                          </CheckBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="lovePeriod"
                              value="해당없음"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text weight="300" size="14px" color="#333333">
                              해당없음
                            </Text>
                          </CheckBox>
                        </InputBox>
                      </SecondLine>
                    </>
                  ) : null}

                  <SubmitBox>
                    <Button
                      secondaryDefault
                      size="regular"
                      margin="10px"
                      _onClick={() => {
                        setIsNext(1);
                      }}
                    >
                      <Text body4 color="#7A37BE" cursor="pointer">
                        이전단계
                      </Text>
                    </Button>
                    <Button
                      primaryDefault
                      size="regular"
                      margin="10px"
                      _onClick={() => {
                        submit(dating);
                      }}
                    >
                      <Text body4 color="#fff" cursor="pointer">
                        디어 시작하기
                      </Text>
                    </Button>
                  </SubmitBox>
                  <MobileButton
                    onClick={() => {
                      submit(dating);
                    }}
                  >
                    <Text body4 color="#fff" textAlign="center">
                      디어 시작하기
                    </Text>
                  </MobileButton>
                </InfoContainer>
              </InfoWrapper>
            ) : null}
          </React.Fragment>
        </Modal>
      )}
    </>
  );
}

export default MemberInfo;

const InfoWrapper = styled.div`
  width: 550px;
  height: 614px;
  border-radius: 20px;
  padding: 70px;
  box-sizing: border-box;
  background-color: #fff;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    height: 834px;
    padding: 40px 0px;
    border-radius: 0px;
  }
`;

const InfoContainer = styled.div`
  width: 360px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    height: 676px;
  }
`;

const ArrowLine = styled.div`
  display: none;
  width: 360px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: flex-start;
    margin: -10px 20px;
  }
`;

const ArrowBack = styled.img`
  width: 24px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 200px;
    margin: auto;
    word-break: keep-all;
  }
`;

const LineBox = styled.div`
  margin-top: 5px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 15px;
    width: 360px;
    padding-left: 50px;
  }
`;

const SecondLine = styled.div`
  padding-left: 140px;
  margin-bottom: 10px;
  width: 400px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media ${({ theme }) => theme.device.mobile} {
    width: 360px;
    padding-left: 150px;
  }
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
  width: 280px;
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
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const Subject = styled.div`
  width: 70px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: flex-start;
    width: 50px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  height: 24px;
  margin: 8px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubmitBox = styled.div`
  position: absolute;
  width: 350px;
  height: 36px;
  left: 150px;
  top: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const MobileButton = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 360px;
  height: 48px;

  background: #7a37be;
  border-radius: 0px;

  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    position: fixed;
    bottom: 0;
  }
`;
