import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

// interface Review {
//   guestImage: string;
//   reviewComment: string;
// }

// const review: Review[] = [
//   { guestImage: "/..", reviewComment: "이분 완전 분위기 메이커 ㅋㅋㅋ" },
//   { guestImage: "/..", reviewComment: "거의 말술.. 술 왜이렇게 잘 마셔요?" },
//   { guestImage: "/..", reviewComment: "술 강요 안하는 모습 구웃" },
//   { guestImage: "/..", reviewComment: "이분 완전 재밌음 ㅋㅋㅋㅋㅋㅋ" },
// ];

// interface Hashtag {
//   hashtagComment: string;
// }

// const hashtag: Hashtag[] = [
//   { hashtagComment: "23년 분위기 메이커" },
//   { hashtagComment: "알코올 파괴자" },
// ];

interface User {
  nickname: string;
  age: number;
  gender: string;
  mbti: string;
  introduction: string;
  profileImageUrl: string;
  majors: [{ major: string }];
}

export default function GestBook() {
  const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string>(''); // 테스트용이 아니면 사용할 것

  useEffect(() => {
    const getUserData = async () => {
      try {
        const accessToken = "YOUR_ACCESS_TOKEN"; // 아직 로그인 구현이 안 끝난 것 같아, token 예시 원래 없을 문임
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          // "https://unimeet.duckdns.org/users/{writerId}/my-page"
          "https://unimeet.duckdns.org/users/1/my-page",
          config
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <MainBox>
      <DmButton src="/dmButton.png" alt="dmButton" />
      <ProfileBox>
        <ProfileImageWrap>
          <ProfileImage
            src={user.student.profileImageUrl}
            alt="profileImage"
          ></ProfileImage>
        </ProfileImageWrap>
        <Name>{user.student.nickname}</Name>
        <InformationBox>
          {/* {user?.majors.map((each, index) => (
            <Department key={index}>
              <p>{each.major}</p> */}
          <Department>{user.student.department}</Department>
          {/* ))} */}
        </InformationBox>
        <MBTI>
          <p>{user.student.mbti}</p>
        </MBTI>
        {/* <Introduce>{user?.introduction}</Introduce> */}
      </ProfileBox>
      <GuestBooks>
        {/* <HashtagBox>
          {hashtag.map((each, index) => {
            return (
              <EachHashtag key={index}>#{each.hashtagComment}</EachHashtag>
            ); 
          })}
        </HashtagBox> */}
        {user.guestBooks.map((each, Id) => {
          return (
            <EachReview key={`writer${Id}`}>
              <GuestImageWrap>{each.guestImage}</GuestImageWrap>
              <GuestComment>{each.reviewComment}</GuestComment>
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

  margin-top: 2vh;
  padding-bottom: 2vh;

  width: 100%;
  height: 100vh;
`;

const DmButton = styled.img`
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
  width: 40%;
  height: 18vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);
`;

const ProfileImage = styled.img`
  /* width: 40%;
  height: 18vh;

  border-radius: 50%; */
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
  padding-bottom: 2vh;

  width: 100%;
  height: 50vh;
`;

const HashtagBox = styled.div`
  display: flex;
  gap: 3%;

  margin-bottom: 3%;

  width: 90%;

  font-weight: 600;
`;

const EachHashtag = styled.div``;

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
