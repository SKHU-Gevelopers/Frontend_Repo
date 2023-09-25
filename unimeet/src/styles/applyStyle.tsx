import styled from "styled-components";
import Image from "next/image";

export const Input = styled.input`
  width: 11rem;
  height: 1.5rem;
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 10px;
  overflow: scroll;
`;
export const Box = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 100%;
  height: 94%;
  list-style: none;
  background-color: #ffffff79;
  padding: 1rem;
`;
export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const BackButton = styled.button`
  width: auto;
  height: 2rem;
  margin-bottom: 0.3rem;
  padding: 0.5rem 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0);
  &:hover {
    cursor: pointer;
    background-color: #f5bcff9f;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 15px;
  }
`;

export const ProfilrImg = styled(Image)`
  border-radius: 50%;
  margin-right: 0.5rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #ffffff;
`;

export const NameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > .name {
    font-size: 1.2rem;
  }
`;

export const ApplyInnerBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #fca8ff;
  justify-content: center;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 1rem 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

export const ApplyForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LetterBox = styled.textarea`
  width: 11rem;
  height: 5rem;
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 10px;
  overflow: scroll;
`;

export const InputDiv = styled.div`
  width: 80vw;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.5rem;
  background: linear-gradient(
    to bottom,
    rgb(227, 213, 255),
    rgb(255, 231, 231)
  );
  border-radius: 10px;
  border: 1px solid #fca8ff;
  overflow: hidden;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
  margin: 0.5rem 0;
  & > .labelBox {
    width: 6rem;
    display: flex;
    justify-content: flex-start;
    & > .label {
      width: fit-content;
      height: 1.5rem;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 0.8rem;
      padding: 0 0.5rem;
    }
  }
`;

export const LetterInput = styled(InputDiv)`
  height: 6rem;
`;

export const PictureInput = styled(LetterInput)`
  height: 8rem;
`;

export const FileInput = styled.input`
  display: none;
`;
export const FindImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 1.7rem;
  border: 1px solid #e496ff9c;
  outline: none;
  background-color: white;
  border-radius: 10px;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const ApplyButton = styled.button`
  width: 10rem;
  height: 1.7rem;
  border: 1px solid #e496ff9c;
  outline: none;
  background-color: white;
  border-radius: 10px;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  &:hover {
    cursor: pointer;
    background-color: #e187ff9c;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const SendImg = styled(Image)`
  border: 1px solid #e496ff9c;
`;
