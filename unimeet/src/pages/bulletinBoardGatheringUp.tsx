import UnderNav from "@/components/UnderNav";
import { BacktoBoard } from "@/styles/detailBoardStyle";
import {
  clickLike,
  getBulletinBoardGatheringUp,
} from "@/util/bulletinBoardUtil";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowRoundBack } from "react-icons/io";
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
  writerId: number;
  likes: number;
  liked: boolean;
}

export default function BulletinBoardGatheringUp() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getBulletinBoardGatheringUp(accessToken, refreshToken)
      .then((res) => {
        res && setData(res.data.posts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [accessToken, refreshToken]);

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: number
  ) => {
    e.preventDefault();
    if (confirm("모아보기에서 삭제할까요?")) {
      try {
        await clickLike(accessToken, refreshToken, postId);
        const updatedData = await getBulletinBoardGatheringUp(
          accessToken,
          refreshToken
        );
        if (updatedData) {
          setData(updatedData.data.posts);
        }
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    } else return;
  };

  return (
    <>
      <MainBox>
        <BackBtnWrap>
          <BacktoBoard href="/bulletinBoard">
            <IoIosArrowRoundBack size={40} />
            뒤로가기
          </BacktoBoard>
        </BackBtnWrap>
        <Article>
          {loading ? (
            <LoadingDiv>Loading...</LoadingDiv>
          ) : (
            data &&
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
                        <HeartWrap onClick={(e) => handleLikeClick(e, each.id)}>
                          <StyledHeartIcon />
                          <LikesCount>{each.likes}</LikesCount>
                        </HeartWrap>
                      </ReactionBox>
                    </DoneState>
                  )}
                  {each.state !== "DONE" && (
                    <Link href={`/detailBoard/${each.id}`}>
                      <Writer>
                        <Link
                          href={{
                            pathname: "/yourGuestBook",
                            query: { writerId: each.writerId },
                          }}
                        >
                          <ProfileImageWrap>
                            <ProfileImage
                              src={each.profileImageUrl}
                              alt="작성자 이미지 사진"
                            ></ProfileImage>
                          </ProfileImageWrap>
                        </Link>
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
            })
          )}
        </Article>
      </MainBox>
      <UnderNav />
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;

  margin-top: 5vh;
  padding-bottom: 10vh;

  width: 100%;
  height: auto;

  background-color: #efe3ff67;
`;

const BackBtnWrap = styled.div`
  display: flex;
  padding-top: 2vh;

  width: 100%;
  height: 4vh;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 95vh;
`;

const LoadingDiv = styled.div`
  padding-top: 1rem;
  font-size: 20pt;
  color: #5a20aa;
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
