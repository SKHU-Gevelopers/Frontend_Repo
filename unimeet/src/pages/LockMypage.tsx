import InputBox from "@/components/InputBox";
import MypageInfoBox, { ButtonStyle } from "@/components/MypageInfoBox";
import Image from "next/image";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const LockMypage: React.FC = () => {
  const imageStyle = {
    borderRadius: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ffffff",
    width: "60%",
    height: "60%",
  };
  const filedisplay = {
    display: "none",
  }
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
        <label htmlFor="file">
          <FindImage className="btn-upload">파일 업로드하기</FindImage>
        </label>
        <input style={filedisplay} type="file" name="file" id="file" />
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
        <MypageInfoBox value={information} defaultValue={information} />
      </InfoBox>
    </>
  );
};
export const FixBtn = styled(ButtonStyle)`
  margin: 0.3em 0;
`;

const InfoBox = styled.div`
  background-color: #ffffff66;
  box-shadow: 0px 0px 10px #ffffff66;
  border-radius: 10px;
  min-width: fit-content;
  height: fit-content;
  margin: 0.5rem 1rem;
  padding: 0.7rem;
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
      width: 4em;
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
const FindImage = styled.div`
  width: 150px;
  height: 30px;
  background: #674ff4;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;


export default LockMypage;
