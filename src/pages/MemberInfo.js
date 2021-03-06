import React from "react";
//리덕스
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
//스타일
import styled from "styled-components";
import { Text, TextB, Input, Button, ColorBadge, Modal } from "../elements";
import { ReactComponent as Arrow } from "../assets/main/arrow.svg";
import Swal from "sweetalert2";
import "../styles/libraryStyle/style.css";

import { nicknameCheck } from "../shared/Check";
import { cookies } from "../shared/cookie";

function MemberInfo() {
  React.useEffect(() => {
    window.onpopstate = () => {
      history.push("/");
    };
  });

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
  const [isDup, setIsDup] = React.useState(true);

  const memberId = cookies.get("memberId", { path: "/" });
  const nickErr = useSelector((state) => state.user.nickMsg);

  //모달
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    history.push("/login");
  };

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

  const next = () => {
    if (!nickErr) {
      Swal.fire("사용가능한 닉네임이어야 합니다.");
      return;
    }
    if (isCheck === false) {
      Swal.fire("닉네임 중복확인을 해주세요!");
      return;
    }

    if (nickname === "" || isSelected === "#fff") {
      Swal.fire("닉네임, 퍼스널 컬러를 모두 입력해주세요!");
      return;
    }
    setIsNext(2);
  };

  const submitSolo = () => {
    if (gender === "" || age === "") {
      Swal.fire("정보를 모두 입력해주세요.");
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
      Swal.fire("정보를 모두 입력해주세요.");
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
      Swal.fire("정보를 모두 입력해주세요.");
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
                    <Text body3 margin="0px 15px">
                      {showName}
                    </Text>
                  </Preview>

                  <NickBox>
                    <div style={{ display: "flex" }}>
                      <Input
                        padding="11px 15px"
                        margin="0px"
                        placeholder="닉네임 3자-10자 이내 입력"
                        maxlength="10"
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

                    {isCheck && nickErr === true ? (
                      <Text sub7 textAlign="left" margin="15px" color="#50BA94">
                        사용 가능한 닉네임입니다.
                      </Text>
                    ) : null}
                    {isCheck && nickErr === false ? (
                      <Text sub7 textAlign="left" margin="15px" color="#D53253">
                        사용할 수 없는 닉네임입니다.
                      </Text>
                    ) : null}
                    {isCheck === false ? (
                      <Text sub7 textAlign="left" margin="15px">
                        영문, 한글, 숫자조합 3~10자 이내로 입력해 주세요
                      </Text>
                    ) : null}
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
                  <Arrow
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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                    <GridInputBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="age"
                          value="20대 초반"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
                          20대 후반
                        </Text>
                      </CheckBox>
                      <CheckBox>
                        <input
                          type="radio"
                          name="age"
                          value="30대 초반"
                          onChange={(e) => {
                            setAge(e.target.value);
                          }}
                        />
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
                          30대 후반
                        </Text>
                      </CheckBox>
                    </GridInputBox>
                  </LineBox>

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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                        <Text sub6 color="#333333" margin="0px 10px">
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
                              value="연하"
                              onChange={(e) => {
                                setLoveType(e.target.value);
                              }}
                            />
                            <Text sub6 color="#333333" margin="0px 10px">
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
                            <Text sub6 color="#333333" margin="0px 10px">
                              동갑
                            </Text>
                          </CheckBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="loveType"
                              value="연상"
                              onChange={(e) => {
                                setLoveType(e.target.value);
                              }}
                            />
                            <Text sub6 color="#333333" margin="0px 10px">
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
                        <GridInputBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="lovePeriod"
                              value="6개월 미만"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text sub6 color="#333333" margin="0px 10px">
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
                            <Text sub6 color="#333333" margin="0px 10px">
                              6개월 ~ 2년
                            </Text>
                          </CheckBox>
                          <CheckBox>
                            <input
                              type="radio"
                              name="lovePeriod"
                              value="2년 이상"
                              onChange={(e) => {
                                setLovePeriod(e.target.value);
                              }}
                            />
                            <Text sub6 color="#333333" margin="0px 10px">
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
                            <Text sub6 color="#333333" margin="0px 10px">
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
                            <Text sub6 color="#333333" margin="0px 10px">
                              해당없음
                            </Text>
                          </CheckBox>
                        </GridInputBox>
                      </LineBox>
                      {/* <SecondLine>
                        <InputBox>
                          
                        </InputBox>
                      </SecondLine> */}
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
                </InfoContainer>
                <MobileButton
                  onClick={() => {
                    submit(dating);
                  }}
                >
                  <Text body4 color="#fff" textAlign="center">
                    디어 시작하기
                  </Text>
                </MobileButton>
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
  box-sizing: border-box;
  padding: 70px 40px;
  background-color: #fff;
  border-radius: 20px;
  @media ${({ theme }) => theme.device.mobile} {
    position: relative;
    width: 360px;
    min-height: 592px;
    padding: 0px;
    padding-top: 45px;
    border-radius: 0px;
    overflow: scroll;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 360px;
  margin: auto;
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

const ArrowLine = styled.div`
  display: none;
  width: 360px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: flex-start;
    margin: 20px 20px;
  }
`;

const TitleBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    width: 200px;
    margin: auto;
    word-break: keep-all;
  }
`;

const LineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 480px;
  margin-top: 5px;
  margin-left: 15px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 15px;
    width: 360px;
    padding-left: 20px;
  }
`;

const Preview = styled.div`
  width: 280px;
  height: 92px;
  margin: 15px 0px;
  ${({ theme }) => theme.common.flexCenter};
  background: #f8f8f8;
  border-radius: 10px;
`;

const NickBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 280px;
`;

const ColorBox = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 30px);
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0px;
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
  display: flex;
  width: 70px;
  @media ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: flex-start;
    width: 70px;
  }
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 24px;
  margin: 8px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GridInputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 130px);
  flex-direction: column;
  width: 390px;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(2, 130px);
    padding-left: 20px;
  }
`;

const SubmitBox = styled.div`
  position: absolute;
  width: 350px;
  height: 36px;
  left: 150px;
  top: 540px;
  ${({ theme }) => theme.common.flexCenter};
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
    margin-top: 50px;
    display: flex;
  }
`;
