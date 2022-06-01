import React from "react";

//스타일
import styled, { keyframes } from "styled-components";
import { Text, Button, Modal } from "../elements";
//페이지
import NoMatch from "../components/alert/NoMatch";

function LoadingMatch({ informClose, leaveSession }) {
  const [locationKeys, setLocationKeys] = React.useState([]);

  const [modalOpen, setModalOpen] = React.useState(false);

  function openModal() {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const noMatch = () => {
    leaveSession();
    informClose();
  };

  //유저 매칭 대기시간
  React.useEffect(() => {
    setTimeout(openModal, 30000);
  }, []);

  return (
    <React.Fragment>
      <Background>
        <LoadWrapper>
          <LoaderBox>
            <Loader>
              <InnerSpinner>
                <Circle />
                <Circle />
                <Circle />
              </InnerSpinner>
            </Loader>
          </LoaderBox>

          <LineBox>
            <Text title color="#fff" margin="20px">
              매칭중입니다. <br />
              잠시만 기다려 주세요.
            </Text>
            <Button primaryDefault size="small" _onClick={noMatch}>
              나가기
            </Button>
          </LineBox>
        </LoadWrapper>
      </Background>
      {modalOpen ? (
        <Modal closeModal={closeModal}>
          <NoMatch noMatch={noMatch} />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default LoadingMatch;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100%;
  background: #bb9ed8;
  z-index: 100;
`;

const LoadWrapper = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  width: 300px;
  margin: auto;
`;

const LoaderBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  width: 200px;
`;

const Loader = styled.div`
  width: 100px;
  margin: auto;

  @keyframes {
    transform: translate(-50%, -50%);
  }
`;

const LineBox = styled.div`
  width: 300px;
  margin: auto;
`;

const InnerSpinner = styled.div`
  margin-left: 44px;
  margin-bottom: 20px;
  position: relative;
  -webkit-transform: translateY(-25px);
  transform: translateY(-25px);
`;

const MultipleBall = keyframes`
  0% {
    transform: scale(0.1);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    opacity: 0.0;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: -2px;
  left: -26px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid #fff;
  animation: ${MultipleBall} 1.25s 0s infinite;
  animation-duration: 1.25s;
  animation-timing-function: cubic-bezier(0.21, 0.53, 0.56, 0.8);
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: ${MultipleBall};
`;
