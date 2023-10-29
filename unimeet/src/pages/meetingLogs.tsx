import Modal from "@/components/Modal";
import UnderNav from "@/components/UnderNav";
import { getApplicationDetailVersion } from "@/util/meetingLogs/meetingApplcationDetail";
import {
  acceptApplication,
  getRecivedApplication,
} from "@/util/meetingLogs/meetingRecivedUtil";
import { getSentApplication } from "@/util/meetingLogs/meetingSentUtil";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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
    profileImageUrl: string;
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
          <ReceivedRequestsBtn
            isSelected={selectedBtn === "received"}
            onClick={() => switchBtn("received")}
          >
            받은 신청함
          </ReceivedRequestsBtn>

          <SentRequestsBtn
            isSelected={selectedBtn === "sent"}
            onClick={() => switchBtn("sent")}
          >
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
  background-color: #efe3ff67;

  overflow: hidden;
`;

const SwitchDiv = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 8vh;

  padding-top: 2vh;

  background-color: #faf9fcba;

  gap: 1vh;
  margin-top: 8vh;
  padding-left: 2%;
  padding-right: 2%;
`;

const ReceivedRequestsBtn = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1vh;
  margin-left: 4%;

  width: 45%;
  height: 4vh;
  background-color: #c1c1c2;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #bb8dfb;
    `}
`;

const SentRequestsBtn = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1vh;
  margin-right: 4%;

  width: 45%;
  height: 4vh;
  background-color: #c1c1c2;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #bb8dfb;
    `}
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
      getApplicationDetailVersion(
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
      <RequestBox>
        <Article>
          {listData &&
            listData.map((each, index) => {
              return (
                <Application key={index}>
                  <Title>{each.title}</Title>
                  <Nickname>
                    <ApplicantImageWrap>
                      {each?.sender?.profileImageUrl && (
                        <Link
                          href={{
                            pathname: "/yourGuestBook",
                            query: { writerId: each.id },
                          }}
                        >
                          <ApplicantImage
                            src={each.sender.profileImageUrl}
                            alt="신청자 사진"
                          ></ApplicantImage>
                        </Link>
                      )}
                    </ApplicantImageWrap>
                    {each.sender.nickname}
                  </Nickname>
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
                                <DetailCategory>
                                  <SenderNickname>
                                    신청자:
                                    <ApplicantImageWrap>
                                      {detailData?.sender.profileImageUrl && (
                                        <Link
                                          href={{
                                            pathname: "/yourGuestBook",
                                            query: { writerId: each.id },
                                          }}
                                        >
                                          <ApplicantImage
                                            src={
                                              detailData.sender.profileImageUrl
                                            }
                                            alt="신청자 사진"
                                          ></ApplicantImage>
                                        </Link>
                                      )}
                                    </ApplicantImageWrap>
                                    {detailData?.sender?.nickname}
                                  </SenderNickname>
                                </DetailCategory>
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
                                    // setIsOpen(false);
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
      </RequestBox>
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
      getApplicationDetailVersion(
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
      <RequestBox>
        <Article>
          {listData &&
            listData.map((each, index) => {
              return (
                <Application key={index}>
                  <Title>{each.title}</Title>
                  <Nickname>
                    <ApplicantImageWrap>
                      {each?.sender?.profileImageUrl && (
                        <Link
                          href={{
                            pathname: "/yourGuestBook",
                            query: { writerId: each.id },
                          }}
                        >
                          <ApplicantImage
                            src={each.sender.profileImageUrl}
                            alt="신청자 사진"
                          ></ApplicantImage>
                        </Link>
                      )}
                    </ApplicantImageWrap>
                    {each.sender.nickname}
                  </Nickname>
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
                                <DetailCategory>
                                  <SenderNickname>
                                    신청자:
                                    <ApplicantImageWrap>
                                      {detailData?.sender.profileImageUrl && (
                                        <Link
                                          href={{
                                            pathname: "/yourGuestBook",
                                            query: { writerId: each.id },
                                          }}
                                        >
                                          <ApplicantImage
                                            src={
                                              detailData.sender.profileImageUrl
                                            }
                                            alt="신청자 사진"
                                          ></ApplicantImage>
                                        </Link>
                                      )}
                                    </ApplicantImageWrap>
                                    {detailData?.sender?.nickname}
                                  </SenderNickname>
                                </DetailCategory>
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
                                  <ShowIAppliedPost>게시글</ShowIAppliedPost>
                                </Link>
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
      </RequestBox>
    </MainBox>
  );
}

// SentRequests, ReceivedRequests 함수 공동 부분 CSS
const MainBox = styled.div`
  width: 100%;
  height: 100vh;
`;

const RequestBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2vh;

  position: relative;

  display: flex;
  align-content: center;

  width: 100%;
  height: 75vh;
  background-color: #faf9fcba;
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
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 2vh;

  width: 88%;
  height: auto;

  border: solid 2px #bb8dfb;
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Nickname = styled.div`
  display: flex;
  align-items: center;
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

  border: 2px solid #bb8dfb;

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
  height: 75vh;

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
  margin-top: 4vh;

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
  margin-bottom: 1.5vh;

  font-size: 1.2rem;
  font-weight: 700;
`;

const ApplicantImageWrap = styled.div`
  margin-left: 1vw;
  margin-right: 1vw;

  width: 50px;
  height: 6vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
`;

const ApplicantImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
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
  margin-top: 6vh;
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

const ShowIAppliedPost = styled.div`
  margin-top: 12vh;
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
