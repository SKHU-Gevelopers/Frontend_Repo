import Modal from "@/components/Modal";
import UnderNav from "@/components/UnderNav";
import {
  acceptApplication,
  getRecivedApplication,
  getRecivedApplicationDetailVersion,
} from "@/util/meetingReciveUtil";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function MeetingLogs() {
  const [selectedBtn, setSelectedBtn] = useState("");

  const switchiBtn = (BtnName: string) => {
    setSelectedBtn(BtnName);
  };

  return (
    <>
      <Main>
        <SwitchDiv>
          <ReceivedRequestsBtn onClick={() => switchiBtn("received")}>
            받은 신청함
          </ReceivedRequestsBtn>
          <SentRequestsBtn onClick={() => switchiBtn("sent")}>
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
interface Application {
  id: number;
  title: string;
  sender: { id: number; nickname: string };
}

interface ApplicationDetail {
  title: string;
  content: string;
  meetUpImages: [];
  sender: {
    id: number;
    nickname: string;
  };
  targetPostId: number;
}

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
  }, [accessToken, refreshToken]);

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
                    <ModalWrap>
                      {listData && (
                        <Modal isOpen={isOpen}>
                          <DeleteModal onClick={() => setIsOpen(false)}>
                            닫기
                          </DeleteModal>
                          <ModalContent>
                            <DetailTitle>{detailData?.title}</DetailTitle>
                            <DetailContent>{detailData?.content}</DetailContent>
                            {/* <div>이미지 사진</div> */}
                            <SenderNickname>
                              <DetailCategory>신청자</DetailCategory>
                              {detailData?.sender?.nickname}
                            </SenderNickname>
                          </ModalContent>
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
                        </Modal>
                      )}
                    </ModalWrap>
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
  return (
    <MainBox>
      <Article></Article>
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

const ModalWrap = styled.div`
  margin-top: 8vh;

  width: 100%;
  height: 82vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #feeffe;
  border: 0.2rem solid #bb8dfb;
`;

const DeleteModal = styled.div`
  padding-top: 2vh;
  padding-left: 84%;

  font-weight: 800;
  font-size: 1.3rem;
`;

const ModalContent = styled.div`
  width: 100%;
  height: 60vh;

  padding-top: 4vh;

  display: flex;
  flex-direction: column;

  padding-left: 6%;
`;

const DetailTitle = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const DetailContent = styled.div`
  margin-top: 3vh;
  padding: 0.4rem;

  width: 94%;
  height: 15vh;

  border: 0.2rem solid #bb8dfb;

  font-size: 1.2rem;
  font-weight: 700;
`;

const DetailCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.4rem;
  height: 4vh;

  background-color: #bb8dfb;
  border-radius: 3px;
`;

const SenderNickname = styled.div`
  display: flex;
  align-items: center;

  gap: 1rem;
  margin-top: 2vh;

  font-size: 1.2rem;
  font-weight: 700;
`;

const AcceptButton = styled.div`
  margin-left: 5%;
  margin-left: 5%;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 5vh;

  background-color: #bb8dfb;
  border-radius: 3px;

  font-size: 1.5rem;
  font-weight: 700;
`;
