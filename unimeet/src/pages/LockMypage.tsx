import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MypageRequest, handleSubmit } from "@/util/myPage";
import { skhuMajor } from "@/constants/department";
import { mbtilist } from "@/constants/mbtilist";
import UnderNav from "@/components/UnderNav";
import {
  ButtonStyle,
  FindImage,
  ImageCoordinate,
  InputDiv,
} from "@/styles/mypageStyle";
import { destroyCookie, parseCookies } from "nookies";
import { LogoutDiv } from "@/styles/DivStyle/bulletinBoardDivStyle";
import router from "next/router";
import { Logout } from "@/util/auth/userUtil";

interface MajorsType {
  id: number;
  majors: string;
  requestText: string;
  key: number;
}

export default function LockMypage() {
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
  const [imageFile, setImageFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>("");
  const [name, setName] = useState("");
  const [mbti, setMbti] = useState("");
  const [major1, setMajor1] = useState("");
  const [major2, setMajor2] = useState("");
  const [gender, setGender] = useState("");
  const [information, setInformation] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [kakaoId, setKaKaoId] = useState("");

  const skhuMajors: MajorsType[] = skhuMajor.flat().map((major) => ({
    id: major.id,
    majors: major.majors,
    requestText: major.requestText,
    key: major.key,
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
        setKaKaoId(res.data.kakaoId);
        setInformation(res.data.introduction);
        setImageFile(res.data.profileImageUrl);
        setImageURL(res.data.profileImageUrl);
      });
    } else {
      alert("다시 로그인을 해주세요.");
    }
  }, [accessToken]);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) {
      alert("파일이 없습니다.");
      return;
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = (data) => {
        if (typeof data.target?.result === "string") {
          setImageFile(image);
        }
      };
    }
  };

  const submitOn = (e: any) => {
    e.preventDefault();
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    setAccessToken(accessToken);
    const refreshToken = cookies["refresh-token"];
    setRefreshToken(refreshToken);
    if (imageFile) {
      handleSubmit(
        accessToken,
        refreshToken,
        name,
        mbti,
        imageFile,
        information,
        major1,
        major2,
        kakaoId
      )
        .then((res) => {})
        .catch((err) => {});
    }
  };

  function deleteCookie() {
    Logout(accessToken, refreshToken).then((res) => {

      router.push("/");
    });
  }
  return (
    <LockMainDiv>
      <UnderNav />
      <ImageBox>
        <LogoutDiv onClick={deleteCookie}>로그아웃</LogoutDiv>

        <ImageCoordinate>
          {imageFile && (
            <Image
              src={imageURL}
              width={50}
              height={50}
              alt="Picture of the author"
              style={imageStyle}
              priority={false}
            />
          )}
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
              <option key={mbtis.id} value={mbtis.mbti}>
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
              <option key={major.key} value={major.majors}>
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
            onChange={(e) => {
              setMajor2(e.target.value);
            }}
          >
            {skhuMajors.map((major) => (
              <option key={major.key} value={major.majors}>
                {major.majors}
              </option>
            ))}
          </SelectStyle>
        </label>
        <label>
          <span>카카오톡 ID:</span>
          <InputStyle
            value={kakaoId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setKaKaoId(e.target.value);
            }}
          />
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
}

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
