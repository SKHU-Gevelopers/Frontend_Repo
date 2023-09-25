import Image from "next/image";
import styled from "styled-components";

export const CommentInputForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 94%;
  margin: 3%;
`;
export const CommentBox = styled.div`
  background-color: white;
  width: 96%;
  height: fit-content;
  border-radius: 10px;
`;
export const CommentInput = styled.input`
  width: 70%;
  padding: 1% 0 1% 3%;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #674ff4;
  outline: none;
`;
export const CommentBtn = styled.button`
  width: 20%;
  margin-left: 3%;
  padding: 2%;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background-color: #674ff4;
  color: white;
`;
export const PeopleImage = styled(Image)`
  border-radius: 50%;
`;
export const UserProfileWrap = styled.div`
  padding: 1% 0 1% 3%;
  margin: 1% 0 3% 4%;
  display: flex;
  align-items: center;
  & > span {
    margin-left: 2%;
    font-size: 1rem;
  }
`;
export const CommentWrap = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  padding: 1% 8%;
  margin: 0 0 3% 4%;
  & > div {
    font-size: 1rem;
    max-width: 80%;
    overflow-wrap: break-word;
  }
  & > button {
    border: none;
    background-color: #674ff4;
    color: white;
    font-size: 1rem;
    border-radius: 10px;
    padding: 3%;
    height: fit-content;
    width: 18%;
    &:hover,
    &:focus {
      cursor: pointer;
      background-color: #ef4ff4;
      opacity: 0.8;
    }
  }
`;
