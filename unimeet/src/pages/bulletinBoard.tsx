import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import UnderNav from "@/components/UnderNav";
import Link from "next/link";
import { clickLike, getPostsData } from "@/util/bulletinBoardUtil";
import { parseCookies } from "nookies";
import { PostWriteBtn, PostWriteLink } from "@/styles/postStyle/postStyle";
import { useRouter } from "next/router";
// import { ImDrawer2 } from "react-icons/Im";

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
  const router = useRouter();
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [data, setData] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  useEffect(() => {
    getPostsData(accessToken, refreshToken).then((res) => {
      res && setData(res.data.posts);
    });
  }, []);

  return (
    <>
      <MainBox>
        <Article>
          {data &&
            data.map((each, index) => {
              return (
                <Post key={index}>
                  <Link href={`/detailBoard/${each.id}`}>
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
                    <ReactionBox>
                      <HeartWrap
                        onClick={(e) =>
                          clickLike(
                            accessToken,
                            refreshToken,
                            e,
                            each.id,
                            likedPosts,
                            setLikedPosts
                          )
                        }
                      >
                        {likedPosts.includes(each.id) ? (
                          <StyledLikedHeartIcon />
                        ) : (
                          <StyledHeartIcon />
                        )}
                        <LikesCount>{each.likes}</LikesCount>
                      </HeartWrap>
                      {/* <CommentWrap>
                    <Comment src="/comment.png" alt="댓글" />
                  </CommentWrap> */}
                    </ReactionBox>
                  </Link>
                </Post>
              );
            })}
          <PostWriteLink href="/post/postWrite">
            <PostWriteBtn>게시물 작성하기</PostWriteBtn>
          </PostWriteLink>
        </Article>
      </MainBox>
      <UnderNav />
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  align-content: center;

  margin-top: 5vh;
  padding-bottom: 10vh;

  width: 100%;
  height: auto;

  background-color: #efe3ff67;
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

const HeartWrap = styled.button`
  display: flex;
  align-items: center;

  margin-left: 3%;

  width: 11%;
  height: 3.8vh;

  background-color: #a52a2a00;
  border: none;
`;

const StyledHeartIcon = styled(AiOutlineHeart)`
  font-size: 2.5rem;
`;

const StyledLikedHeartIcon = styled(AiFillHeart)`
  font-size: 2.5rem;
`;

const LikesCount = styled.div`
  margin-left: 0.5%;
  font-size: 1rem;
`;

// const CommentWrap = styled.div`
//   margin-left: 3%;

//   width: 7%;
//   height: 3.5vh;
// `;

// const Comment = styled.img`
//   width: 100%;
//   height: 100%;
// `;
