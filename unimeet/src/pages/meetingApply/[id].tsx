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
import UnderNav from "../../components/UnderNav";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { meetingApplyFunc } from "@/util/meetingApply/apllyUtil";
import Link from "next/link";
import { ImageCoordinate } from "@/styles/mypageStyle";

export default function MeetingApply() {
  const router = useRouter();
  const { id } = router.query;
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");
  const [imageSrc, setImageSrc] = useState<string[]>(["/dogImage.png"]);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    if (!accessToken) {
      router.push("/");
    } else {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [router, setAccessToken, setRefreshToken]);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const image = event.target.files?.[0];
    if (!image) {
      alert("파일이 없습니다.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = (data) => {
      if (typeof data.target?.result === "string") {
        setImageSrc([data.target?.result]);
      }
    };
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    meetingApplyFunc(
      Number(id),
      accessToken,
      refreshToken,
      title,
      content,
      contact,
      imageSrc[0]
    )
      .then((res) => {
        router.push("/meetingLogs");
      })
      .catch((err) => {});
  };

  return (
    <>
      <UnderNav />
      <Main>
        <Box className="Maindiv">
          <Link href={`/detailBoard/${id}`}>
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
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setContent(e.target.value)}
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
                  onChange={(e) => setContact(e.target.value)}
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
                    src={imageSrc[0]}
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
