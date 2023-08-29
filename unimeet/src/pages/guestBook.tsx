import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";

interface Student {
  profileImageUrl: string;
  nickname: string;
  department: string;
  mbti: string;
}

interface GuestBook {
  writerId: number;
  profileImageUrl: string;
  content: string;
}

export default function GestBook() {
  const [studentData, setStudentData] = useState<Student>();
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);
  const [token, setToken] = useState<string>("");
  const [postGuestBookComment, setPostGuestBookComment] = useState<string>("");

  // 공개 프로필 조회: 학생 정보와 학생의 방명록 불러오기
  useEffect(() => {
    const getGuestBookUserData = async () => {
      try {
        setToken(localStorage.getItem("login-token") || " ");
        if (token) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            "https://unimeet.duckdns.org/users/1/my-page?page=2", // 프로필 클릭시 users부분이 해당 학생 id로 바뀌게 수정 필요
            {
              headers,
            }
          );
          setStudentData(response.data.data.student);
          setGuestBookData(response.data.data.guestBooks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGuestBookUserData();
  }, [token]);

  // 방명록 작성 input 내용 저장
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostGuestBookComment(e.target.value);
  };

  // 방명록 작성해서 보내기
  const postGuestBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setToken(localStorage.getItem("login-token") || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const postData = {
          content: postGuestBookComment,
        };
        await axios.post(
          "https://unimeet.duckdns.org/users/1/guestbooks", // 프로필 클릭시 users부분이 해당 학생 id로 바뀌게 수정 필요
          postData,
          { headers }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainBox>
      <DmButton src="/dmButton.png" alt="dmButton" />
      <ProfileBox>
        <ProfileImageWrap>
          <ProfileImage
            src={studentData?.profileImageUrl}
            alt="profileImage"
          ></ProfileImage>
        </ProfileImageWrap>
        <Name>{studentData?.nickname}</Name>
        <InformationBox>
          {/* {user?.majors.map((each, index) => (
            <Department key={index}>
              <p>{each.major}</p> */}
          <Department>{studentData?.department}</Department>
          {/* ))} */}
        </InformationBox>
        <MBTI>
          <p>{studentData?.mbti}</p>
        </MBTI>
        {/* <Introduce>{user?.introduction}</Introduce> */}
      </ProfileBox>
      <GuestBooks>
        <GuestBookForm onSubmit={postGuestBook}>
          <PostGuestBookCommentInputBox
          placeholder="방명록을 남겨보세요."
            onChange={onChange}
          ></PostGuestBookCommentInputBox>
        </GuestBookForm>
        {guestBookData?.map((each, Id) => {
          return (
            <EachReview key={`writer${Id}`}>
              <GuestImageWrap>
                <GuestImage
                  src={each.profileImageUrl}
                  alt="profileImage"
                ></GuestImage>
              </GuestImageWrap>
              <GuestComment>{each.content}</GuestComment>
            </EachReview>
          );
        })}
      </GuestBooks>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;

  padding-bottom: 2vh;

  width: 100%;
  height: 100vh;

  overflow: auto;
`;

const DmButton = styled.img`
  margin-top: 2vh;
  margin-left: 85%;

  width: 8%;
  height: 4vh;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 46vh;
`;

const ProfileImageWrap = styled.div`
  width: 10rem;
  height: 18vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const Name = styled.div`
  padding-left: 5%;

  width: 100%;
  height: 4vh;

  border-radius: 4rem;

  font-size: 1.2rem;
  font-weight: 600;
`;

const InformationBox = styled.div`
  display: flex;
  gap: 3%;

  width: 90%;
  height: 5.5vh;
`;

const Department = styled.div`
  width: 48.5%;
  height: 4vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

  text-align: center;
  line-height: 4vh;

  font-weight: 600;
`;

const MBTI = styled.div`
  width: 90%;
  height: 4vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

  text-align: center;
  line-height: 4vh;

  font-weight: 600;
`;

const Introduce = styled.div`
  margin-top: 1.5vh;
  padding-left: 2.5%;
  padding-right: 2.5%;

  width: 90%;
  height: 11vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

  font-weight: 600;
`;

const GuestBooks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2vh;

  width: 100%;
  height: 70vh;

  border-radius: 50%;
`;

const GuestBookForm = styled.form`
  margin-bottom: 2vh;

  width: 90%;
  height: 20vh;
`;

const PostGuestBookCommentInputBox = styled.input`
  padding-left: 3%;

  width: 100%;
  height: 100%;

  border-radius: 1rem;
  border: none;
  outline: none;

  background-color: white;
  opacity: 0.7;

  font-size: 1rem;
  font-weight: 600;
`;

const GuestImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const EachReview = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 3vh;

  width: 90%;
  height: 6vh;
`;

const GuestImageWrap = styled.div`
  width: 15%;
  height: 6vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
`;

const GuestComment = styled.div`
  display: flex;
  align-items: center;

  margin-left: 3%;
  padding-left: 3%;
  padding-right: 3%;

  width: 83%;
  height: 6vh;

  border-radius: 5rem;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
  box-shadow: 0px 3px #b085c9;

  font-weight: 500;
`;
