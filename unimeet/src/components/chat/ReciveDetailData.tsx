import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UnderNav from "../UnderNav";
import { chatDetailData } from "@/util/chat/chatUtil";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

interface Sender {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

interface DmData {
  title: string;
  content: string;
  sender: Sender;
  sentAt: string;
}

const ReciveDetailData = () => {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [dmDetail, setDmDetail] = useState<DmData | undefined>();

  const router = useRouter();
  const { dmId } = router.query;
  const dmIdAsNumber = Number(dmId);

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (accessToken) {
      chatDetailData(accessToken, refreshToken, dmIdAsNumber).then((res) => {
        res && setDmDetail(res.data.dm);
      });
    }
  }, [accessToken, refreshToken, dmIdAsNumber]);

  if (!dmDetail) {
    return <LoadingDiv>Loading...</LoadingDiv>; // 로딩 중이라는 텍스트를 반환합니다. 원하는 메시지로 대체할 수 있습니다.
  }

  return (
    <>
      <SentWrap>
        <TopBox>
          <BacktoBoard onClick={goBack}>
            <IoIosArrowRoundBack size={40} />
          </BacktoBoard>
        </TopBox>
        <Main>
          <DmData>
            <Title>{dmDetail?.title}</Title>
            <Content>{dmDetail?.content}</Content>
          </DmData>
        </Main>
        <Sender>
          <SenderImageWrap>
            {dmDetail.sender?.profileImageUrl && (
              <Link
                href={{
                  pathname: "/yourGuestBook",
                  query: { writerId: dmDetail.sender.id },
                }}
              >
                <SenderImage
                  src={dmDetail.sender.profileImageUrl}
                  alt="신청자 사진"
                ></SenderImage>
              </Link>
            )}
          </SenderImageWrap>
          <NicknameSpan>{dmDetail.sender.nickname}에게 답장</NicknameSpan>
        </Sender>
        <UnderNav></UnderNav>
      </SentWrap>
    </>
  );
};

export default ReciveDetailData;

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  color: white;

  position: fixed; /* 모달을 화면에 고정 */
  top: -3%;
  left: 0;
  background: linear-gradient(220deg, #3246ff, #e3ceff, #ff46d1);
  z-index: 9999; /* 다른 요소 위에 나타나도록 z-index 설정 */
`;

const SentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: fixed; /* 모달을 화면에 고정 */
  top: -3%;
  left: 0;
  background: linear-gradient(220deg, #3246ff, #e3ceff, #ff46d1);
  z-index: 9999; /* 다른 요소 위에 나타나도록 z-index 설정 */
`;
const TopBox = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
`;

const BacktoBoard = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const Sender = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  width: 100%;
  height: 10%;
`;

const SenderImageWrap = styled.div`
  margin-right: 1vw;

  width: 3em;
  height: 3em;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
`;

const SenderImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const SenderNickname = styled.div``;

const NicknameSpan = styled.div`
  font-size: 1em;
  color: white;
`;

const Main = styled.div`
  width: 60%;
  height: 40%;

  background-color: rgba(255, 255, 255, 0.7);

  border-radius: 0.5em;
`;

const DmData = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2vh;
  padding-left: 8%;
  padding-right: 8%;
`;

const Title = styled.textarea`
  padding: 0.5em;

  width: 100%;
  height: 6vh;
  resize: none;

  background-color: rgba(255, 255, 255, 0);

  font-size: 0.8rem;
  font-weight: 900;

  border: none;
  outline: solid 2px rgba(198, 141, 245, 0.37);

  overflow: hidden;
`;

const Content = styled.textarea`
  padding: 0.5em;
  margin-top: 3vh;

  width: 100%;
  height: 26vh;
  resize: none;

  background-color: rgba(255, 255, 255, 0);

  font-size: 0.8rem;
  font-weight: 900;

  border: none;
  outline: solid 2px rgba(198, 141, 245, 0.37);
  border-radius: 0.8em;

  overflow: hidden;
`;
