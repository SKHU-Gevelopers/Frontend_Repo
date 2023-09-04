import Link from "next/link";
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
  padding-left: 1rem;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  & > span {
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
`;
export const DetailBtn = styled.button`
  border-radius: 10px;
  padding: 2%;
  border: none;
  background-color: #6f2dff;
  color: white;
`;
