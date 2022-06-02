import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import { history } from "../redux/configureStore";

const AlarmModal = (props) => {
  const { closeModal, children } = props;
  // 모달 오버레이에서 스크롤 방지
  React.useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const oncloseModal = (e) => {
    // console.log("e.target: ", e.target);
    // console.log("e.currentTarget: ", e.currentTarget);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Container>
      <Background onClick={oncloseModal} />
      <CgClose
        className="close"
        size={30}
        onClick={closeModal}
        style={{
          color: "white",
          position: "absolute",
          right: "20px",
          top: "-140px",
          cursor: "pointer",
        }}
      />
      <ModalBlock>
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  );
};

AlarmModal.defaultProps = {
  closable: true,
  maskClosable: true,
  visible: true,
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  /* backdrop-filter: blur(5px); */
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media ${({ theme }) => theme.device.isMobile} {
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
  }
`;

const ModalBlock = styled.div`
  position: fixed;
  display: block;
  top: 1rem;
  border-radius: 10px;
  padding: 1.5rem;
  /* background-color: white; */
  width: 600px;
  /* @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  } */
  min-height: 35rem;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    top: 0rem;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default AlarmModal;
