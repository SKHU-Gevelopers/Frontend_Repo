import { FileInput, SendImg } from "@/styles/applyStyle";
import { GenderInput, GenderLabel, MyDict } from "../signup";
import {
  BackBtn,
  PostImg,
  PostInputBox,
  PostSelectBox,
  PostWirteMainDiv,
  WrtieBox,
} from "@/styles/postStyle/postStyle";
import UnderNav from "@/components/UnderNav";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ChangeEvent, useState } from "react";
import { FindImage, ImageCoordinate } from "@/styles/mypageStyle";

export default function PostWrite() {
  const peopleNum = [1, 2, 3, 4, 5, 6, 7, 8, "9이상"];
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [gender, setGender] = useState("");

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
        setPicture(data.target?.result);
      }
    };
  };
  
  return (
    <PostWirteMainDiv>
      <WrtieBox>
        <BackBtn href="/bulletinBoard">
          <IoIosArrowRoundBack size={40} />
          뒤로가기
        </BackBtn>
        <PostInputBox>
          <label className="title">제목</label>
          <textarea name="title" rows={1} cols={33}></textarea>
        </PostInputBox>
        <PostInputBox>
          <label className="content">게시글 내용</label>
          <textarea name="title" rows={4} cols={33}></textarea>
        </PostInputBox>
        <PostSelectBox>
          <label>최대 인원</label>
          <select>
            {peopleNum.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </PostSelectBox>
        <MyDict className="mydict">
          <div>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="FEMALE"
                //   onChange={handleOptionChange}
              />
              <span className="Women">Women</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="MALE"
                //   onChange={handleOptionChange}
              />
              <span className="Men">Men</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="NONE"
                //   onChange={handleOptionChange}
              />
              <span className="Divided">Divided</span>
            </GenderLabel>
          </div>
        </MyDict>
        <PostImg className="inputDiv">
          <ImageCoordinate>
            <SendImg
              src={picture}
              width={150}
              height={110}
              alt="Picture of the author"
            />
          </ImageCoordinate>
          <label htmlFor="file">
            <FindImage className="upload">사진 선택하기</FindImage>
          </label>
          <FileInput
            onChange={onChangeFile}
            type="file"
            name="meetUpImage=@"
            id="file"
          />
        </PostImg>
      </WrtieBox>
      <UnderNav />
    </PostWirteMainDiv>
  );
}
