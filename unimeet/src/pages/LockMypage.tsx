import MypageInfoBox, { ButtonStyle } from "@/components/MypageInfoBox";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MypageRequest } from "@/util/myPage";
import { skhuDepartmentList, skhuMajor } from "@/constants/department";
import { mbtilist } from "@/constants/mbtilist";
import { SelectStyle } from "./signup";

const LockMypage: React.FC = () => {
  const imageStyle = {
    borderRadius: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ffffff",
    width: "7em",
    height: "7em",
  };
  const filedisplay = {
    display: "none",
  };
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");
  const [majors, setMajors] = useState(["",""]);
  const [gender, setGender] = useState("");
  const [information, setInformation] = useState("");
  const [token, setToken] = useState("");

  const [departmentNum, setDepartmentNum] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    setToken(token || " ");
  }, []);
  useEffect(() => {
    if (token) {
      MypageRequest(token).then((res) => {
        setData(res.data.data);
        // setName(data.nickname);
        // setMbti(data.mbti);
        // setMajors(data.majors);
        // setGender(data.gender);
        // setImage(data.profileImageUrl);
        // setInformation(data.introduction);
      });
    }
  }, [token]);
  console.log(data);
  
  const [image, setImage] = useState("/dogImage.png");
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    console.log(image);
    if (!image) {
      alert("파일이 없습니다.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = (data) => {
      if (typeof data.target?.result === "string") {
        setImage(data.target?.result);
      }
    };
  };

  const handleName = (value: string) => {
    setInformation(value);
  };
  return (
    <>
      <ImageBox>
        <ImageCoordinate>
          <Image
            src={image}
            width={150}
            height={150}
            alt="Picture of the author"
            style={imageStyle}
          />
        </ImageCoordinate>
        <label htmlFor="file">
          <FindImage className="btn-upload">파일 업로드하기</FindImage>
        </label>
        <input
          style={filedisplay}
          onChange={onChangeFile}
          type="file"
          name="file"
          id="file"
        />
      </ImageBox>
      <InfoBox>
        <label>
          <span>별명:</span>
          <InputStyle
            value={name}
            defaultValue={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              // value !== "" && setName(data.nickname);
            }}
          />
        </label>
        {/* <label>
          <span>나이:</span>
          <InputStyle
            value={age}
            defaultValue={age}
            onChange={() => {
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setAge(e.target.value);
              };
            }}
          />
        </label> */}
        <label>
          <span>성별:</span>
          <InputStyle
            value={gender}
            defaultValue={gender}
            onChange={() => {
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setGender(e.target.value);
              };
            }}
          />
        </label>
        <label>
          <span>mbti:</span>
          <InputStyle
            value={mbti}
            defaultValue={mbti}
            onChange={() => {
              (e: React.ChangeEvent<HTMLInputElement>) => {
                setMbti(e.target.value);
              };
            }}
          />
        </label>
        <label>
        <SelectStyle>
            <span className="label-title">소속 학과 1</span>
            <select
              className="input"
              value={majors[0]}
              defaultValue={
                majors[0] || skhuMajor[departmentNum][0].requestText
              }
              onChange={(e) => {
                const selectedMajor = e.target.value;
                const updatedMajors = [...majors];
                updatedMajors[0] = selectedMajor;
                setMajors(updatedMajors);
              }}
            >
              {skhuMajor[departmentNum].map((major) => (
                <option key={major.id} value={major.requestText}>
                  {major.majors}
                </option>
              ))}
            </select>
          </SelectStyle>
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

const InputStyle = styled.input`
  font-family: monospace;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #674ff4;
  padding: 5px;
  background-color: #faebd700;
  transition: 0.3s;
  color: #5b5b5b;
  &:focus {
    box-shadow: 0 2px 4px #312576;
    background-color: #c0b5ff42;
    transform: translateY(-1px);
    transition: all 1s;
  }
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
