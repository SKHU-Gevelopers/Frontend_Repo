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
import { Postting } from "@/util/post/postUtil";
import { parseCookies } from "nookies";
import router from "next/router";

export default function PostWrite() {
  const peopleNum = [1, 2, 3, 4, 5, 6, 7, 8, "9이상"];
  const [pictures, setPictures] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [maxPeople, setMaxPeople] = useState<number>(0);
  const [PeopleString, setPeopleString] = useState<string>("");
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
        setPictures([...pictures, image]);
      }
    };
  };
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const submitPost = (e: any) => {
    e.preventDefault();
    Postting(
      accessToken,
      refreshToken,
      title,
      content,
      pictures,
      maxPeople,
      gender
    )
      .then((res) => {
        router.push("/bulletinBoard");
      })
      .catch((err) => {
        alert("게시글 작성에 실패하셨습니다.");
      });
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onChangeMaxPeople = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const max = Number(event.target.value);
    setMaxPeople(max);
    console.log(max);
    const maxPeopleStr = max.toString();
    setPeopleString(maxPeopleStr);
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  return (
    <PostWirteMainDiv>
      <WrtieBox onSubmit={submitPost}>
        <BackBtn href="/bulletinBoard">
          <IoIosArrowRoundBack size={40} />
          뒤로가기
        </BackBtn>
        <PostInputBox>
          <label className="title">제목</label>
          <textarea
            name="title"
            rows={1}
            cols={33}
            onChange={onChangeTitle}
            value={title}
          ></textarea>
        </PostInputBox>
        <PostInputBox>
          <label className="content">게시글 내용</label>
          <textarea
            name="title"
            rows={4}
            cols={33}
            onChange={onChangeContent}
            value={content}
          ></textarea>
        </PostInputBox>
        <PostSelectBox>
          <label>최대 인원</label>
          <select onChange={onChangeMaxPeople} value={PeopleString}>
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
                onChange={handleGenderChange}
              />
              <span className="Women">Women</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="MALE"
                onChange={handleGenderChange}
              />
              <span className="Men">Men</span>
            </GenderLabel>
            <GenderLabel>
              <GenderInput
                type="radio"
                name="radio"
                value="NONE"
                onChange={handleGenderChange}
              />
              <span className="Divided">Divided</span>
            </GenderLabel>
          </div>
        </MyDict>
        <PostImg className="inputDiv">
          <ImageCoordinate>
            {pictures[0] && (
              <SendImg
                src={URL.createObjectURL(pictures[0])}
                width={150}
                height={110}
                alt="Picture of the author"
              />
            )}
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
        <button type="submit">작성하기</button>
      </WrtieBox>
      <UnderNav />
    </PostWirteMainDiv>
  );
}
