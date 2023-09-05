import styled from "styled-components";

export const ProfileImage = styled.img`
  border-radius: 50%;
  border: 1px solid #674ff4;
`;
export const DetailMain = styled.div`
  margin-top: 5vh;
  background-color: #ffffff64;
  height: 90vh;
  padding: 1rem;
`;
export const BacktoBoard = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
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
export const ProfileImageBox = styled(ProfileImageWrap)`
  justify-content: center;
`;
export const DetailBtn = styled.button`
  border-radius: 10px;
  padding: 3%;
  border: none;
  font-size: 1rem;
  background-color: #6f2dff;
  color: white;
  margin: 0 0.5rem;
  width: 4.5rem;
`;
export const DetailBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const InputTitle = styled.div`
  font-size: 1.4rem;
  padding: 0.3rem;
  border-bottom: 1px solid #7e37ff;
`;
export const DetailMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;
export const DetailTable = styled.table`
  margin: 0.4rem;
  padding: 0.5rem;
  & > tbody > tr > th {
    width: 4rem;
    font-weight: 500;
    color: #674ff4;
  }
  &>tbody>tr>td{
    padding: 6px;
    }
`;
