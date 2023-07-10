import styled from "styled-components";

interface Review {
  guestImage: string;
  reviewComment: string;
}

const review: Review[] = [
  { guestImage: "/..", reviewComment: "이분 완전 분위기 메이커 ㅋㅋㅋ" },
  { guestImage: "/..", reviewComment: "거의 말술.. 술 왜이렇게 잘 마셔요?" },
  { guestImage: "/..", reviewComment: "술 강요 안하는 모습 구웃" },
  { guestImage: "/..", reviewComment: "이분 완전 재밌음 ㅋㅋㅋㅋㅋㅋ" },
];

interface Hashtag {
  hashtagComment: string;
}

const hashtag: Hashtag[] = [
  { hashtagComment: "23년 분위기 메이커" },
  { hashtagComment: "알코올 파괴자" },
];

export default function GestBook() {
  return (
    <MainBox>
      <DmButton src="/dmButton.png" alt="dmButton" />
      <ProfileBox>
        <ProfileImageWrap>
          <ProfileImage></ProfileImage>
        </ProfileImageWrap>
        <Name>멍멍이</Name>
        <InformationBox>
          <Department>
            <p>소프트웨어공학</p>
          </Department>
          <Department>
            <p>컴퓨터공학</p>
          </Department>
        </InformationBox>
        <MBTI>
          <p>CUTE</p>
        </MBTI>
        <Introduce></Introduce>
      </ProfileBox>
      <ReviewBox>
        <HashtagBox>
          {hashtag.map((each, index) => {
            return (
              <EachHashtag key={index}>#{each.hashtagComment}</EachHashtag>
            );
          })}
        </HashtagBox>
        {review.map((each, index) => {
          return (
            <EachReview key={index}>
              <GuestImageWrap>{each.guestImage}</GuestImageWrap>
              <GuestComment>{each.reviewComment}</GuestComment>
            </EachReview>
          );
        })}
      </ReviewBox>
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

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2vh;
  padding-bottom: 2vh;

  width: 100%;
  height: 55vh;
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
