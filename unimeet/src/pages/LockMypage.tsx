import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { MypageRequest, handleSubmit } from "@/util/myPage";
import { skhuDepartmentList, skhuMajor } from "@/constants/department";
import { mbtilist } from "@/constants/mbtilist";
import { ButtonStyle, InputDiv } from "@/styles/mypageStyle";

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

  const skhuMajors: MajorsType[] = skhuMajor.flat().map((major) => ({
    id: major.id,
    majors: major.majors,
    requestText: major.requestText,
  }));

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    setToken(token || " ");
  }, []);
  useEffect(() => {
    if (token) {
      MypageRequest(token).then((res) => {
        console.log(res.data.data);
        setName(res.data.data.nickname);
        setMbti(res.data.data.mbti);
        setMajor1(res.data.data.majors[0]);
        setMajor2(res.data.data.majors[1]);
        setGender(res.data.data.gender);
        setInformation(res.data.data.introduction);
        setImage(res.data.data.profileImageUrl);
      });
    }
  }, [token]);

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

  const submitOn = (e: any) => {
    e.preventDefault();
    handleSubmit(token, name, mbti, image, information, major1, major2)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(token, name, mbti, image, information, major1, major2);
      });
  };

  return (
    <>
      <ImageBox>
        <ImageCoordinate>
          <Image
            src={image}
            width={100}
            height={100}
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
        <label>
          <span>성별:</span>
          <SelectStyle
            className="input"
            value={mbti}
            defaultValue={mbtilist[0].mbti}
            onChange={(e) => setGender(e.target.value)}
          >
            <option key={0} value="남성">
              {"남성"}
            </option>
            <option key={1} value={"여성"}>
              {"여성"}
            </option>
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
          <ButtonStyle type="reset">초기화</ButtonStyle>
          <ButtonStyle onClick={submitOn} type="submit">
            수정하기
          </ButtonStyle>
        </div>
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
  margin: 1rem;
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
