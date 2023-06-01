import styled from "styled-components";

export default function Post() {
  return (
    <Main>
      <Writer>
        <ProfileImageWrap>
          <ProfileImage src="" alt="작성자"></ProfileImage>
        </ProfileImageWrap>
        <Name>작성자</Name>
      </Writer>
      <Title></Title>
      <Details>
        <WriterOfDetailsBox>
          <Detail>작성자</Detail>
          <div></div>
        </WriterOfDetailsBox>
        <ParticipantBox>
          <Detail>참여자</Detail>
          <div></div>
        </ParticipantBox>
        <RecruiterBox>
          <Detail>모집</Detail>
          <div></div>
        </RecruiterBox>
        <MeetingPlaceBox>
          <Detail>만남장소</Detail>
          <div></div>
        </MeetingPlaceBox>
        <ContentBox>
          <Detail>내용</Detail>
          <div></div>
        </ContentBox>
      </Details>
      <AddImage></AddImage>
      <Apply>신청하기</Apply>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  margin-top: 5vh;

  width: 100%;
  min-height: 100vh;

  background-color: #efe3ff;
  opacity: 0.97;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;

  padding-top: 2vh;
  padding-bottom: 1vh;
  padding-left: 3%;

  width: 100%;
  height: 9vh;
`;

const ProfileImageWrap = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  background-color: pink;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Name = styled.div`
  padding-left: 2%;

  font-size: 1.2rem;
  font-weight: 600;
`;

const Title = styled.div`
  width: 90%;
  height: 5vh;
`;

const Details = styled.div`
  width: 90%;
  height: 30vh;

  background-color: white;

  border: solid 1px rgba(103, 79, 244, 0.8);
`;

const WriterOfDetailsBox = styled.div`
  width: 100%;
  height: 5vh;

  border-bottom: solid 1px rgba(103, 79, 244, 0.8);
`;

const ParticipantBox = styled.div`
  width: 100%;
  height: 5vh;

  border-bottom: solid 1px rgba(103, 79, 244, 0.8);
`;

const RecruiterBox = styled.div`
  width: 100%;
  height: 5vh;

  border-bottom: solid 1px rgba(103, 79, 244, 0.8);
`;

const MeetingPlaceBox = styled.div`
  width: 100%;
  height: 5vh;

  border-bottom: solid 1px rgba(103, 79, 244, 0.8);
`;

const ContentBox = styled.div`
  width: 100%;
  height: 10vh;
`;

const Detail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22%;
  height: 100%;

  border-right: solid 1px rgba(103, 79, 244, 0.8);

  font-weight: 700;
`;

const AddImage = styled.div``;

const Apply = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2vh;

  width: 90%;
  height: 5vh;

  background-color: rgba(103, 79, 244);
  color: white;

  font-size: 1.5rem;
`;
