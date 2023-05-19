import Heart from "@/components/HeartCount";
import styled from "styled-components";

// 데이터라 가정
interface Post {
  profileImage: string;
  name: string;
  picture: string;
  title: string;
  text: string;
}

const post: Post[] = [
  {
    profileImage: "",
    name: "콩떡이",
    picture: "../",
    title: "제목을 적어요~",
    text: "글 어쩌구 저쩌구 어쩌구 저쩌구구",
  },
  {
    profileImage: "",
    name: "배달원",
    picture: "../",
    title: "제목을 적어요~",
    text: "글만 적은 게시글 사진 없이",
  },
  {
    profileImage: "",
    name: "콩떡이",
    picture: "../",
    title: "제목을",
    text: "글 어쩌구 저쩌구",
  },
  {
    profileImage: "",
    name: "콩떡이",
    picture: "../",
    title: "제목을",
    text: "글 어쩌구 저쩌구",
  },
];
export default function BulletinBoard() {
  return (
    <MainBox>
      <Article>
        {post.map((each, index) => {
          return (
            <Post key={index}>
              <Writer>
                <ProfileImageWrap>
                  <ProfileImage
                    src={each.profileImage}
                    alt="작성자 이미지 사진"
                  ></ProfileImage>
                </ProfileImageWrap>
                <Name>{each.name}</Name>
              </Writer>
              <PictureWrap>
                <PictureImage
                  src={each.picture}
                  alt="게시글 첨부 사진"
                ></PictureImage>
              </PictureWrap>
              <WritingBox>
                <Title>{each.title}</Title>
                <Text>{each.text}</Text>
              </WritingBox>
              <ReactionBox>
                <Heart />
                <CommentWrap>
                  <Comment src="/comment.png" alt="댓글" />
                </CommentWrap>
              </ReactionBox>
            </Post>
          );
        })}
      </Article>
    </MainBox>
  );
}

const MainBox = styled.div`
  display: flex;
  align-content: center;

  margin-top: 5vh;

  width: 100%;
  height: auto;

  background-color: #efe3ff;
  opacity: 0.97;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 95vh;
  // 0.몇으로 하면 자동적으로 길이가 길어짐에 따라(100vh를 넘었을 때) 색의 경계선이 보임
`;

const Post = styled.div`
  width: 100%;
  height: auto;

  border-top: solid 1px #bb8dfb;
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

const PictureWrap = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 20vh;
`;

const PictureImage = styled.img`
  width: 93.5%;
  height: 100%;

  border-radius: 5px;

  background-color: blue;
`;

const WritingBox = styled.div`
  padding-top: 2vh;
  padding-bottom: 2vh;

  padding-left: 3%;
  padding-right: 3%;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`;

const Text = styled.div`
  margin-top: 0.5vh;
`;

const ReactionBox = styled.div`
  display: flex;

  padding-bottom: 3%;

  width: 100%;
  height: 7vh;
`;

const CommentWrap = styled.div`
  margin-left: 3%;

  width: 7%;
  height: 3.5vh;
`;

const Comment = styled.img`
  width: 100%;
  height: 100%;
`;
