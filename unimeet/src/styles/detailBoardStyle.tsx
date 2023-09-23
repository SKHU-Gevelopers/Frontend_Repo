import styled from "styled-components";
import Image from "next/image";

export const ProfileImage = styled.img`
  border-radius: 50%;
  border: 1px solid #674ff4;
`;
export const DetailMain = styled.div`
  margin-top: 5vh;
  background-color: #ffffff64;
  padding: 1rem;
  border-radius: 10px;
  min-height: 135vh;
  max-height: max-content;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const TopBox = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  width: 100%;

`;
export const BacktoBoard = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  padding-left: 1rem;
`;
export const ProfileImageWrap = styled.div`
  padding-left: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
`;
export const DetailBoxTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const ImageBox = styled(Image)`
  border-radius: 5%;
  border: 1px solid #674ff4;
`;
export const ProfileImageBox = styled(ProfileImageWrap)`
  justify-content: center;
`;
export const DetailBtn = styled.button`
  border-radius: 10px;
  padding: 3%;
  border: none;
  font-size: 0.9rem;
  background-color: #6f2dff;
  color: white;
  margin: 0 0.5rem;
  width: 4rem;
`;
export const DetailBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const InputTitle = styled.div`
  font-size: 1.1rem;
  padding: 0.3rem;
`;
export const DetailMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
`;
export const DetailTable = styled.table`
  margin: 0.4rem;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #674ff4;
  background-color: #ffffff37;
  width: 100%;
  height: fit-content;
  & > tbody > tr > th {
    width: 4rem;
    font-weight: 500;
    color: #674ff4;
  }
  & > tbody > tr > td {
    padding: 6px;
  }
`;
