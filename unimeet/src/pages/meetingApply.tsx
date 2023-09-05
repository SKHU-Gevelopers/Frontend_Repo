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
import Image from "next/image";
import { MdArrowBack } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { ImageCoordinate } from "./lockMypage";
import UnderNav from "@/components/UnderNav";

export default function meetingApply() {
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
  return (
    <>
    <UnderNav />
      <Main>
        <Box className="Maindiv">
          <BackButton>
            <MdArrowBack size={20} />
          </BackButton>
          <NameBox>
            <ProfilrImg src="/dogImage.png" width="35" height="35" alt={""} />
            <div className="name">멈뭄미</div>
          </NameBox>
          <ApplyInnerBox className="innerBox">
            <h3>만남 신청</h3>
            <ApplyForm>
              <InputDiv className="inputDiv">
                <div className="labelBox">
                  <div className="label">제목</div>
                </div>
                <Input
                  type="text"
                  placeholder="11글자 이내로 작성해주세요"
                  className="title"
                />
              </InputDiv>
              <LetterInput className="inputDiv">
                <div className="labelBox">
                  <div className="label">전달할 내용</div>
                </div>
                <LetterBox
                  name="letter"
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
                />
              </InputDiv>
              <PictureInput className="inputDiv">
                <label htmlFor="file">
                  <FindImage className="upload">사진 선택하기</FindImage>
                </label>
                <FileInput
                  onChange={onChangeFile}
                  type="file"
                  name="file"
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
              <ApplyButton className="submit">신청하기</ApplyButton>
            </ApplyForm>
          </ApplyInnerBox>
        </Box>
      </Main>
    </>
  );
}
