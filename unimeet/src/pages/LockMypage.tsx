import InputBox from "@/components/InputBox";
import MypageInfoBox from "@/components/MypageInfoBox";
import Image from "next/image";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const LockMypage: React.FC = () => {
  const imageStyle = {
    borderRadius: "100px",
    border: "1px solid #fff",
  };
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [majors, setMajors] = useState("");
  const [information, setInformation] = useState("");

  return (
    <>
      <ImageBox>
        <ImageCoordinate>
          <Image
            src="/dogImage.png"
            width={150}
            height={150}
            alt="Picture of the author"
            style={imageStyle}
          />
        </ImageCoordinate>
        <FindImage className="button">
          <svg
            className="svg-icon"
            width="24"
            viewBox="0 0 24 24"
            height="24"
            fill="none"
          >
            <g
              stroke-width="2"
              stroke-linecap="round"
              stroke="#f9ebffcf"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path d="m3 7h17c.5523 0 1 .44772 1 1v11c0 .5523-.4477 1-1 1h-16c-.55228 0-1-.4477-1-1z"></path>
              <path d="m3 4.5c0-.27614.22386-.5.5-.5h6.29289c.13261 0 .25981.05268.35351.14645l2.8536 2.85355h-10z"></path>
            </g>
          </svg>
          <span className="lable">프로필 선택</span>
        </FindImage>
      </ImageBox>
      <InfoBox>
        <label>
          <span>이름:</span>
          <InputBox value={name} onChange={setName} defaultValue={name} />
        </label>
        <label>
          <span>나이:</span>
          <InputBox value={age} onChange={setAge} defaultValue={age} />
        </label>
        <label>
          <span>email:</span>
          <InputBox value={email} onChange={setEmail} defaultValue={email} />
        </label>
        <label>
          <span>mbti:</span>
          <InputBox value={majors} onChange={setMajors} defaultValue={majors} />
        </label>
        <FixBtn>수정하기</FixBtn>
      </InfoBox>
      <InfoBox>
        <MypageInfoBox
          value={information}
          defaultValue={information}
        />
      </InfoBox>
    </>
  );
};
export const FixBtn = styled.button`
  padding: 7px 20px;
  border-radius: 50px;
  border: none;
  background-color: #674ff4;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
  margin: 0.7em 0;
  color: #fff9ed;

  &:hover {
    box-shadow: 0px 3px 10px #312576;
    transform: translateY(-3px);
    transition: all 1s;
  }
`;

const InfoBox = styled.div`
  background-color: #ffffff66;
  box-shadow: 0px 0px 10px #ffffff66;
  border-radius: 10px;
  width: 30vw;
  min-width: fit-content;
  height: fit-content;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & > label {
    margin: 0.5rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    & > span {
      margin: 0px 10px;
      width: 45px;
      font-size: 120%;
    }
  }
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageCoordinate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem;
`;
const spin = keyframes`
0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;
const FindImage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 16px;
  gap: 8px;
  border: none;
  background-color: #674ff4;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #674ff4;
    box-shadow: 0px 3px 10px #312576;
    transform: translateY(-3px);
    transition: all 1s;
    & > .svg-icon {
      animation: ${spin} 1s linear infinite;
    }
  }
  & > .lable {
    margin-top: 1px;
    font-size: 19px;
    line-height: 22px;
    color: #e4e4e4;
    font-family: sans-serif;
    letter-spacing: 1px;
  }
`;

export default LockMypage;
