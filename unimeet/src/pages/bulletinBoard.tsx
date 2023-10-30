import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import UnderNav from "@/components/UnderNav";
import Link from "next/link";
import { clickLike, getPostsData } from "@/util/bulletinBoardUtil";
import { parseCookies } from "nookies";
import { ImDrawer2 } from "react-icons/Im";
import { HiOutlinePencilAlt } from "react-icons/Hi";

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
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    getPostsData(accessToken, refreshToken).then((res) => {
      res && setData(res.data.posts);
    });
  }, [accessToken, refreshToken]);

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault();
    try {
      await clickLike(accessToken, refreshToken, postId);
      const updatedData = await getPostsData(accessToken, refreshToken);
      if (updatedData) {
        setData(updatedData.data.posts);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <>
      <MainBox>
        <Article>
          {data &&
            data.map((each, index) => {
              return (
                <Post key={index}>
                  {each.state === "DONE" && (
                    <DoneState>
                      <MatchComplete>매칭 완료!</MatchComplete>
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
                        <HeartWrap>
                          <StyledHeartIcon />
                          <LikesCount>{each.likes}</LikesCount>
                        </HeartWrap>
                      </ReactionBox>
                    </DoneState>
                  )}
                  {each.state !== "DONE" && (
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
                        <HeartWrap onClick={(e) => handleLikeClick(e, each.id)}>
                          <StyledHeartIcon />
                          <LikesCount>{each.likes}</LikesCount>
                        </HeartWrap>
                      </ReactionBox>
                    </Link>
                  )}
                </Post>
              );
            })}
        </Article>
        <PostWriteLink href="/post/postWrite">
          <PostWriteIconWrap>
            <PostWriteIcon></PostWriteIcon>
          </PostWriteIconWrap>
        </PostWriteLink>
        <GatheringUpLink href={"/bulletinBoardGatheringUp"}>
          <GetheringUpWrap>
            <GetheringUpIcone></GetheringUpIcone>
          </GetheringUpWrap>
        </GatheringUpLink>
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
`;

const Post = styled.div`
  width: 100%;
  height: auto;

  border-bottom: solid 1px #bb8dfb;
`;

const DoneState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: gray;
  opacity: 0.5;

  position: relative;
`;

const MatchComplete = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: white;
  font-size: 3rem;
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

const LikesCount = styled.div`
  margin-left: 0.5%;
  font-size: 1rem;
`;

const PostWriteIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  position: fixed;
  background-color: #674ff4;
  color: white;
  border: 1px solid #ddd6ff;
  border-radius: 10px;
  right: 4%;
  top: 3em;
`;

const PostWriteIcon = styled(HiOutlinePencilAlt)`
  width: 80%;
  height: 80%;
`;

const PostWriteLink = styled(Link)``;

const GetheringUpWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 10px 10px;

  width: 50px;
  height: 50px;

  position: fixed;
  background-color: #674ff4;
  color: white;
  border: 1px solid #ddd6ff;
  border-radius: 10px;
  right: 4%;
  top: 6.5em;
`;

const GetheringUpIcone = styled(ImDrawer2)`
  width: 100%;
  height: 100%;
`;

const GatheringUpLink = styled(Link)``;
