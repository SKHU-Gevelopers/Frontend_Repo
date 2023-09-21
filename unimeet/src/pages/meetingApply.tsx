import {
  Box,
  Main,
  BackButton,
  ProfilrImg,
  NameBox,
  ApplyInnerBox,
  ApplyForm,
  Input,
  LetterBox,
  InputDiv,
  LetterInput,
  FileInput,
  FindImage,
  PictureInput,
  ApplyButton,
  SendImg,
} from "@/styles/applyStyle";
import { MdArrowBack } from "react-icons/md";
import { ChangeEvent, useEffect, useState } from "react";
import { ImageCoordinate } from "./LockMypage";
import UnderNav from "@/components/UnderNav";
import { parseCookies } from "nookies";
import router from "next/router";
import { meetingApplyFunc } from "@/util/meetingApply/apllyUtil";
import Link from "next/link";

export default function meetingApply() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [meetingID, setMeetingID] = useState(0);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    if (!accessToken) {
      router.push("/MainLogin");
    } else {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  });
  const [image, setImage] = useState("/dogImage.png");
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    meetingApplyFunc(meetingID, accessToken, refreshToken)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(meetingID, accessToken, refreshToken);
      });
  };

  return (
    <>
      <UnderNav />
      <Main>
        <Box className="Maindiv">
          <Link href="">
            {/* 이부분에 link 등 한번 로직을 봐야할듯 */}
            <BackButton>
              <MdArrowBack size={20} />
            </BackButton>
          </Link>
          <NameBox>
            <ProfilrImg src="/dogImage.png" width="35" height="35" alt={""} />
            <div className="name">멈뭄미</div>
          </NameBox>
          <ApplyInnerBox className="innerBox">
            <h3>만남 신청</h3>
            <ApplyForm onSubmit={handleSubmit}>
              <InputDiv className="inputDiv">
                <div className="labelBox">
                  <div className="label">제목</div>
                </div>
                <Input
                  type="text"
                  placeholder="11글자 이내로 작성해주세요"
                  className="title"
                  name="title"
                />
              </InputDiv>
              <LetterInput className="inputDiv">
                <div className="labelBox">
                  <div className="label">전달할 내용</div>
                </div>
                <LetterBox
                  name="content"
                  id="letter"
                  rows={10}
                  cols={10}
                  placeholder="100자 이내로 작성 가능합니다."
                  className="input"
                />
              </LetterInput>
              <InputDiv className="inputDiv">
                <div className="labelBox">
                  <div className="label">인스타 아이디</div>
                </div>
                <Input
                  type="text"
                  placeholder="인스타 아이디"
                  className="input"
                  name="contact"
                />
              </InputDiv>
              <PictureInput className="inputDiv">
                <label htmlFor="file">
                  <FindImage className="upload">사진 선택하기</FindImage>
                </label>
                <FileInput
                  onChange={onChangeFile}
                  type="file"
                  name="meetUpImage=@"
                  id="file"
                />
                <ImageCoordinate>
                  <SendImg
                    src={image}
                    width={110}
                    height={110}
                    alt="Picture of the author"
                  />
                </ImageCoordinate>
              </PictureInput>
              <ApplyButton type="submit" className="submit">
                신청하기
              </ApplyButton>
            </ApplyForm>
          </ApplyInnerBox>
        </Box>
      </Main>
    </>
  );
}
