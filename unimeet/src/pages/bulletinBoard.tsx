import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  state: string;
  maxPeople: number;
  gender: string;
  profileImageUrl: string;
  nickname: string;
  likes: number;
}

export default function BulletinBoard() {
  const [data, setData] = useState<Post[]>([]);
  const [token, setToken] = useState("");
  const searchUrl = "https://unimeet.duckdns.org/posts";

  useEffect(() => {
    const getPostsData = async () => {
      try {
        setToken(localStorage.getItem("login-token") || " ");
        if (token) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(`${searchUrl}`, {
            headers,
          });
          setData(response.data.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPostsData();
  }, [token]);

  const ClickLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault();
    try {
      setToken(localStorage.getItem("login-token") || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await axios.put(
          `https://unimeet.duckdns.org/posts/${postId}/like`,
          "게시글 좋아요",
          { headers }
        );
        const updatedResponse = await axios.get(`${searchUrl}`, {
          headers,
        });
        setData(updatedResponse.data.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainBox>
      <Article>
        {data &&
          data.map((each, index) => {
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
                {/* <PictureWrap>
                  <PictureImage
                    src={each.imageUrl}
                    alt="게시글 첨부 사진"
                  ></PictureImage>
                </PictureWrap> */}
                <WritingBox>
                  <Title>{each.title}</Title>
                  <Text>{each.content}</Text>
                </WritingBox>
                <ReactionBox>
                  <HeartWrap onClick={(e) => ClickLike(e, each.id)}>
                    <HeartImg src="/heart.png" alt="빈 하트 사진"></HeartImg>
                  </HeartWrap>
                  <div>{each.likes}</div>
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

  border-radius: 50%;
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

const HeartWrap = styled.button`
  margin-left: 3%;

  width: 7%;
  height: 4vh;
`;

const HeartImg = styled.img`
  margin-left: 3%;

  width: 100%;
  height: 100%;
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
