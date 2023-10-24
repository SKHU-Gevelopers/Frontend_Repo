import Modal from "@/components/Modal";
import UnderNav from "@/components/UnderNav";
import { getRecivedApplicationDetailVersion } from "@/util/meetingLogs/meetingApplcationDetail";
import {
  acceptApplication,
  getRecivedApplication,
} from "@/util/meetingLogs/meetingRecivedUtil";
import { getSentApplication } from "@/util/meetingLogs/meetingSentUtil";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Application {
  id: number;
  title: string;
  sender: { id: number; nickname: string; profileImageUrl: string };
}

interface ApplicationDetail {
  title: string;
  content: string;
  meetUpImages: string[];
  sender: {
    id: number;
    nickname: string;
  };
  targetPostId: number;
}

export default function MeetingLogs() {
  const [selectedBtn, setSelectedBtn] = useState<string>("received");

  const switchBtn = (BtnName: string) => {
    setSelectedBtn(BtnName);
  };

  return (
    <>
      <Main>
        <SwitchDiv>
          <ReceivedRequestsBtn onClick={() => switchBtn("received")}>
            받은 신청함
          </ReceivedRequestsBtn>
          <SentRequestsBtn onClick={() => switchBtn("sent")}>
            보낸 신청함
          </SentRequestsBtn>
        </SwitchDiv>
        {selectedBtn === "received" ? (
          <ReceivedRequests />
        ) : selectedBtn === "sent" ? (
          <SentRequests />
        ) : (
          <ReceivedRequests />
        )}
      </Main>
      <UnderNav />
    </>
  );
}

const Main = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const SwitchDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5vh;
  gap: 2%;
  margin-top: 8vh;
  padding-left: 2%;
  padding-right: 2%;
`;

const ReceivedRequestsBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  height: 5vh;
  border-radius: 1.1rem 1.1rem 0 0;
  background-color: #674ff4;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
`;

const SentRequestsBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  height: 5vh;
  border-radius: 1.1rem 1.1rem 0 0;
  background-color: #674ff4;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
`;

// 받은 신청함

function ReceivedRequests() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [listData, setListData] = useState<Application[]>([]);
  const [detailData, setDetailData] = useState<ApplicationDetail>();

  const [applicationId, setApplicationId] = useState<number>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      getRecivedApplication(accessToken, refreshToken).then((res) => {
        setListData(res.data.meetUps);
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && applicationId !== undefined) {
      getRecivedApplicationDetailVersion(
        accessToken,
        refreshToken,
        applicationId
      ).then((res) => {
        setDetailData(res.data.meetUp);
      });
    }
  }, [accessToken, applicationId]);

  return (
    <MainBox>
      <Article>
        {listData &&
          listData.map((each, index) => {
            return (
              <Application key={index}>
                <Title>{each.title}</Title>
                <Nickname>{each.sender.nickname}</Nickname>
                <Button>
                  <ViewDetails
                    onClick={() => {
                      setIsOpen(true);
                      setApplicationId(each.id);
                    }}
                  >
                    상세보기
                  </ViewDetails>
                  {isOpen && (
                    <BackGround>
                      <ModalWrap>
                        {listData && (
                          <Modal isOpen={isOpen}>
                            <DeleteModal onClick={() => setIsOpen(false)}>
                              X
                            </DeleteModal>
                            <ModalContent>
                              <DetailTitle>{detailData?.title}</DetailTitle>
                              <SenderNickname>
                                <DetailCategory>
                                  신청자: {detailData?.sender?.nickname}
                                </DetailCategory>
                              </SenderNickname>
                              <DetailContent>
                                {detailData?.content}
                              </DetailContent>
                              <PictureWrap>
                                {detailData?.meetUpImages &&
                                  detailData?.meetUpImages.length > 0 && (
                                    <PictureImage
                                      src={detailData?.meetUpImages[0]}
                                      alt="게시글 첨부 사진"
                                    ></PictureImage>
                                  )}
                              </PictureWrap>
                              <Link
                                href={`/detailBoard/${detailData?.targetPostId}`}
                              >
                                <ShowPost>게시글</ShowPost>
                              </Link>
                              <AcceptButton
                                onClick={() => {
                                  if (applicationId !== undefined) {
                                    acceptApplication(
                                      accessToken,
                                      refreshToken,
                                      applicationId
                                    );
                                  }
                                  setIsOpen(false);
                                }}
                              >
                                수락하기
                              </AcceptButton>
                            </ModalContent>
                          </Modal>
                        )}
                      </ModalWrap>
                    </BackGround>
                  )}
                </Button>
              </Application>
            );
          })}
      </Article>
    </MainBox>
  );
}

// 보낸 신청함
function SentRequests() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [listData, setListData] = useState<Application[]>([]);
  const [detailData, setDetailData] = useState<ApplicationDetail>();

  const [applicationId, setApplicationId] = useState<number>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (accessToken) {
      getSentApplication(accessToken, refreshToken).then((res) => {
        setListData(res.data.meetUps);
      });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && applicationId !== undefined) {
      getRecivedApplicationDetailVersion(
        accessToken,
        refreshToken,
        applicationId
      ).then((res) => {
        setDetailData(res.data.meetUp);
      });
    }
  }, [accessToken, applicationId]);

  return (
    <MainBox>
      <Article>
        {listData &&
          listData.map((each, index) => {
            return (
              <Application key={index}>
                <Title>{each.title}</Title>
                <Nickname>{each.sender.nickname}</Nickname>
                <Button>
                  <ViewDetails
                    onClick={() => {
                      setIsOpen(true);
                      setApplicationId(each.id);
                    }}
                  >
                    상세보기
                  </ViewDetails>
                  {isOpen && (
                    <BackGround>
                      <ModalWrap>
                        {listData && (
                          <Modal isOpen={isOpen}>
                            <DeleteModal onClick={() => setIsOpen(false)}>
                              X
                            </DeleteModal>
                            <ModalContent>
                              <DetailTitle>{detailData?.title}</DetailTitle>
                              <SenderNickname>
                                <DetailCategory>
                                  신청자: {detailData?.sender?.nickname}
                                </DetailCategory>
                              </SenderNickname>
                              <DetailContent>
                                {detailData?.content}
                              </DetailContent>
                              <PictureWrap>
                                {detailData?.meetUpImages &&
                                  detailData?.meetUpImages.length > 0 && (
                                    <PictureImage
                                      src={detailData?.meetUpImages[0]}
                                      alt="게시글 첨부 사진"
                                    ></PictureImage>
                                  )}
                              </PictureWrap>
                              <Link
                                href={`/detailBoard/${detailData?.targetPostId}`}
                              >
                                <ShowPost>게시글</ShowPost>
                              </Link>
                              <AcceptButton
                                onClick={() => {
                                  if (applicationId !== undefined) {
                                    acceptApplication(
                                      accessToken,
                                      refreshToken,
                                      applicationId
                                    );
                                  }
                                  setIsOpen(false);
                                }}
                              >
                                수락하기
                              </AcceptButton>
                            </ModalContent>
                          </Modal>
                        )}
                      </ModalWrap>
                    </BackGround>
                  )}
                </Button>
              </Application>
            );
          })}
      </Article>
    </MainBox>
  );
}

// SentRequests, ReceivedRequests 함수 공동 부분 CSS
const MainBox = styled.div`
  position: relative;

  display: flex;
  align-content: center;

  width: 100%;
  height: 77vh;

  background-color: #efe3ff;
  opacity: 0.97;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const Application = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  width: 90%;
  height: auto;

  border-bottom: solid 1px #bb8dfb;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Nickname = styled.div`
  font-size: 1.3rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: right;
`;

const ViewDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 0.5rem;

  width: 5rem;
  height: 1.7rem;

  background-color: #bb8dfb;

  border-radius: 5px;
`;

const BackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(220deg, #3246ff, #e3ceff, #ff46d1);
  z-index: 9999; /* 다른 요소 위에 나타나도록 z-index 설정 */
`;

const ModalWrap = styled.div`
  margin-top: 8vh;
  margin-left: 3%;

  width: 94%;
  height: 78vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(255, 255, 255, 0.7);
  border: 0.2rem solid #b194dc;
  border-radius: 20px;
`;

const DeleteModal = styled.div`
  padding-top: 2.5vh;
  margin-left: 90%;

  font-weight: 800;
  font-size: 1.3rem;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 60vh;

  padding-top: 2vh;

  display: flex;
  flex-direction: column;

  padding-left: 6%;
`;

const DetailTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const DetailContent = styled.div`
  margin-top: 1.5vh;

  width: 94%;
  height: 14vh;

  font-size: 1.2rem;
  font-weight: 700;
`;

const DetailCategory = styled.div`
  width: 94%;
  height: 4vh;

  border-radius: 3px;
`;

const SenderNickname = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1.5vh;

  font-size: 1.2rem;
  font-weight: 700;
`;

const PictureWrap = styled.div`
  margin-bottom: 2%;
  margin-top: 3%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 94%;
  height: 18vh;
`;

const PictureImage = styled.img`
  width: 48%;
  height: 100%;

  border-radius: 5px;
`;

const AcceptButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 94%;
  height: 6vh;

  border: 2px solid #bb8dfb;
  border-radius: 6px;

  font-size: 1.5rem;
  font-weight: 700;
`;

const ShowPost = styled.div`
  margin-top: 3vh;
  margin-bottom: 1.5vh;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 94%;
  height: 6vh;

  border: 2px solid #bb8dfb;
  border-radius: 6px;

  font-size: 1.5rem;
  font-weight: 700;
`;
