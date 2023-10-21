import styled from "styled-components";
import { PictureInput } from "../applyStyle";
import { BacktoBoard } from "../detailBoardStyle";

export const PostWriteBtn = styled.button`
  width: fit-content;
  height: fit-content;
  border: 1px solid #ddd6ff;
  background-color: #674ff4;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 15px;
  position: fixed;
  bottom: 10%;
`;

export const PostWriteLink = styled.a`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostWirteMainDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PostImg = styled(PictureInput)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  padding-bottom: 5%;
  width: 100%;
  border: 1px solid #674ff4;
`;
export const WrtieBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ffffff66;

  padding: 1rem;
  border-radius: 10px;
  height: 80%;
`;
export const PostInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  & > textarea {
    border: 1px solid #674ff4;
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    background-color: #ffffffa4;
    outline: none;
    font-size: large;
    padding: 3%;
  }
  & > label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    padding-left: 2%;
  }
`;
export const PostSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > label {
    font-size: 1.2rem;
    padding-left: 2%;
    padding-right: 5%;
  }
  & > select {
    border: 1px solid #674ff4;
    border-radius: 10px;
    padding: 0.5rem;
    background-color: #ffffffa4;
    width: 20%;
    padding-left: 5%;
    outline: none;
  }
`;

export const BackBtn = styled(BacktoBoard)`
  padding-left: 0;
`;
