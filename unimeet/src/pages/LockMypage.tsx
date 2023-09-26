import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MypageRequest, handleSubmit } from "@/util/myPage";
import { skhuMajor } from "@/constants/department";
import { mbtilist } from "@/constants/mbtilist";
import UnderNav from "@/components/UnderNav";
import { ButtonStyle, InputDiv } from "@/styles/mypageStyle";
import { parseCookies } from "nookies";

interface MajorsType {
  id: number;
  majors: string;
  requestText: string;
}

const LockMypage: React.FC = () => {
  const imageStyle = {
    borderRadius: "100%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#ffffff",
    width: "5.5em",
    height: "5.5em",
  };
  const filedisplay = {
    display: "none",
  };

  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");
  const [major1, setMajor1] = useState("");
  const [major2, setMajor2] = useState("");
  const [gender, setGender] = useState("");
  const [information, setInformation] = useState("");
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const skhuMajors: MajorsType[] = skhuMajor.flat().map((major) => ({
    id: major.id,
    majors: major.majors,
    requestText: major.requestText,
  }));

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    if (accessToken) {
      MypageRequest(accessToken, refreshToken).then((res) => {
        setName(res.data.nickname);
        setMbti(res.data.mbti);
        setMajor1(res.data.majors[0]);
        setMajor2(res.data.majors[1]);
        setGender(res.data.gender);
        setInformation(res.data.introduction);
        setImage(res.data.profileImageUrl);
      });
    } else {
      alert("다시 로그인을 해주세요.");
    }
  }, [accessToken]);

  const [image, setImage] = useState("/dogImage.png");
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
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

  const submitOn = (e: any) => {
    e.preventDefault();
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    handleSubmit(
      accessToken,
      refreshToken,
      name,
      mbti,
      image,
      information,
      major1,
      major2
    )
      .then((res) => {
      })
      .catch((err) => {
      });
  };

  return (
    <LockMainDiv>
      <UnderNav />
      <ImageBox>
        <ImageCoordinate>
          <Image
            src={image}
            width={50}
            height={50}
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
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          <span>성별:</span>
          <SelectStyle
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option key={0}>{"남성"}</option>
            <option key={1}>{"여성"}</option>
          </SelectStyle>
        </label>
        <label>
          <span className="label-title">mbti: </span>
          <SelectStyle
            className="input"
            value={mbti}
            onChange={(e) => setMbti(e.target.value)}
          >
            {mbtilist.map((mbtis) => (
              <option key={mbtis.mbti} value={mbtis.mbti}>
                {mbtis.mbti}
              </option>
            ))}
          </SelectStyle>
        </label>
        <label>
          <span>소속 학과 1:</span>
          <SelectStyle
            className="class1"
            value={major1}
            onChange={(e) => {
              setMajor1(e.target.value);
            }}
          >
            {skhuMajors.map((major) => (
              <option key={major.requestText} value={major.majors}>
                {major.majors}
              </option>
            ))}
          </SelectStyle>
        </label>
        <label>
          <span>소속 학과 2:</span>
          <SelectStyle
            className="input"
            value={major2}
            defaultValue={major2}
            onChange={(e) => {
              setMajor2(e.target.value);
            }}
          >
            {skhuMajors.map((major) => (
              <option key={major.requestText} value={major.majors}>
                {major.majors}
              </option>
            ))}
          </SelectStyle>
        </label>
        <InputDiv
          value={information}
          onChange={(e) => setInformation(e.target.value)}
          name="infoBox"
          rows={4}
          cols={40}
        />
        <div>
          <ButtonStyle onClick={submitOn} type="submit">
            수정하기
          </ButtonStyle>
        </div>
      </InfoBox>
    </LockMainDiv>
  );
};

export const FixBtn = styled(ButtonStyle)`
  margin: 0.3em 0;
`;

const LockMainDiv = styled.div`
  height: 100vh;
  padding-top: 2rem;
`;

const InfoBox = styled.div`
  background-color: #ffffff66;
  box-shadow: 0px 0px 10px #ffffff66;
  border-radius: 10px;
  margin: 0.5rem 1rem;
  padding: 0.4rem;
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
      width: 5em;
      font-size: 120%;
    }
  }
`;
export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputStyle = styled.input`
  font-family: monospace;
  width: 10rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #674ff4;
  padding: 5px;
  background-color: #faebd700;
  transition: 0.3s;
  color: #000000;
  &:focus {
    box-shadow: 0 2px 4px #312576;
    background-color: #c0b5ff42;
    transform: translateY(-1px);
    transition: all 1s;
  }
`;

export const ImageCoordinate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;
const SelectStyle = styled.select`
  font-family: monospace;
  width: 10rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #674ff4;
  padding: 5px;
  background-color: #faebd700;
  -webkit-transition: 0.3s;
  transition: 0.3s;
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
export const FindImage = styled.div`
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
