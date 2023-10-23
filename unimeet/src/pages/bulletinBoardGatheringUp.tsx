import UnderNav from "@/components/UnderNav";
import { BacktoBoard, TopBox } from "@/styles/detailBoardStyle";
import { IoIosArrowRoundBack } from "react-icons/io";
import styled from "styled-components";

const ExampleData = [
  {
    profileImageUrl: "",
    nickname: "ㅎㅎ",
    imageUrl: "gg",
    title: "제목",
    content: "본문",
  },
  {
    profileImageUrl: "",
    nickname: "ㅎㅎ",
    imageUrl: "gg",
    title: "제목",
    content: "본문",
  },
  {
    profileImageUrl: "",
    nickname: "ㅎㅎ",
    imageUrl: "gg",
    title: "제목",
    content: "본문",
  },
];

export default function BulletinBoardGatheringUp() {
  return (
    <>
      <MainBox>
        <TopBox>
          <BacktoBoard href="/bulletinBoard">
            <IoIosArrowRoundBack size={40} />
            뒤로가기
          </BacktoBoard>
        </TopBox>
        <Article>
          {ExampleData &&
            ExampleData.map((each, index) => {
              return (
                <Post key={index}>
                  <Writer>
                    <ProfileImageWrap>
                      <ProfileImage
                        src={each.profileImageUrl}
                        alt="작성자 이미지 사진"
                      ></ProfileImage>
                    </ProfileImageWrap>
                    <Name>{each.nickname}</Name>
                  </Writer>
                  {each.imageUrl !== "" && (
                    <PictureWrap>
                      <PictureImage
                        src={each.imageUrl}
                        alt="게시글 첨부 사진"
                      ></PictureImage>
                    </PictureWrap>
                  )}
                  <WritingBox>
                    <Title>{each.title}</Title>
                    <Text>{each.content}</Text>
                  </WritingBox>
                </Post>
              );
            })}
        </Article>
        <UnderNav></UnderNav>
      </MainBox>
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 5vh;
  padding-bottom: 10vh;

  width: 100%;
  height: 100vh;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 90vh;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const Post = styled.div`
  width: 100%;
  height: auto;

  border-bottom: solid 1px #bb8dfb;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;

  padding-top: 2vh;
  padding-bottom: 1%;
  padding-left: 3%;

  width: 100%;
  height: 9vh;
`;

const ProfileImageWrap = styled.div`
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
  background-color: pink;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const Name = styled.div`
  padding-left: 2%;

  font-size: 1.2rem;
`;

const PictureWrap = styled.div`
  margin: auto;
  margin-bottom: 2%;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 93.5%;
  height: 18vh;
`;

const PictureImage = styled.img`
  width: 50%;
  height: 100%;

  border-radius: 5px;
`;

const WritingBox = styled.div`
  padding-top: 1%;
  padding-bottom: 1vh;

  padding-left: 3%;
  padding-right: 3%;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  padding: 1%;
  width: fit-content;
`;

const Text = styled.div`
  font-size: 1.1rem;
  margin-top: 0.5vh;
  background-color: #ffffff7d;
  padding: 2%;
  border-radius: 10px;
  border: 1px solid #bb8dfb;
`;

const ReactionBox = styled.div`
  display: flex;

  padding-bottom: 2vh;

  width: 100%;
  height: 6vh;
`;
