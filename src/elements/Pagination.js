import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPage, setPage }) => {
  console.log(totalPage, setPage);

  return (
    <PaginationDiv>
      <PageBtnContainer>
        <PrevPage />
        {[...Array(totalPage)].map((p, idx) => (
          <PageBtn data-index={idx + 1} onClick={() => setPage(idx + 1)}>
            {idx + 1}
          </PageBtn>
        ))}
        <NextPage />
      </PageBtnContainer>
    </PaginationDiv>
  );
};

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 84px;
  /* border: 1px solid red; */
`;

const PageBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #948a9e;
  /* margin-bottom: 14px; */
`;

const PageBtn = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 15px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  color: #948a9e;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const NextPage = styled(PageBtn)`
  display: flex;
  justify-content: center;
  margin: 0 16px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  background: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 26%;
    height: 4%;
    top: 41%;
    left: 52%;
    background: #000;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all 0.2s linear;
  }

  &::after {
    z-index: 3;
    top: 59%;
    left: 52%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const PrevPage = styled(NextPage)`
  transform: rotate(180deg);
`;

export default Pagination;
