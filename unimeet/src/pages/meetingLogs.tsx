import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 조건부 렌더링
export default function MeetingLogs() {
  const [selectedBtn, setSelectedBtn] = useState("");

  const switchiBtn = (BtnName: string) => {
    setSelectedBtn(BtnName);
  };

  return (
    <>
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
    </>
  );
}

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

interface Application {
  id: number;
  title: string;
  sender: { id: number; nickname: string };
}

// 받은 신청함
function ReceivedRequests() {
  const [data, setData] = useState<Application[]>([]);
  const [token, setToken] = useState("");
  const searchUrl = "https://unimeet.duckdns.org/meet-ups";

  useEffect(() => {
    const getRecivedApplication = async () => {
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
          setData(response.data.data.meetUps);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRecivedApplication();
  }, [token]);

  return (
    <MainBox>
      <Article>
        {data &&
          data.map((each, index) => {
            return (
              <Application key={index}>
                <Title>{each.title}</Title>
                <Nickname>{each.sender.nickname}</Nickname>
                <Button>
                  <ViewDetails>상세보기</ViewDetails>
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
  display: flex;
  align-content: center;

  width: 100%;
  height: 77vh;

  background-color: #efe3ff;
  opacity: 0.97;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const Application = styled.div`
  width: 100%;
  height: auto;

  border-bottom: solid 1px #bb8dfb;
  font-size: 2rem;
`;

const Title = styled.div``;

const Nickname = styled.div``;

const Button = styled.div``;

const ViewDetails = styled.div``;
