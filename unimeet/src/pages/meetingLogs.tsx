import styled from "styled-components";

// 조건부 렌더링
export default function MeetingLogs() {
  return (
    <>
      <SwitchDiv>
        <ReceivedRequestsBtn>받은 신청함</ReceivedRequestsBtn>
        <SentRequestsBtn>보낸 신청함</SentRequestsBtn>
      </SwitchDiv>
      <MainBox>
        <Article></Article>
      </MainBox>
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

  width: 50%;
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

  width: 50%;
  height: 5vh;

  border-radius: 1.1rem 1.1rem 0 0;

  background-color: #674ff4;

  color: white;

  font-size: 1.2rem;
  font-weight: 700;
`;

const MainBox = styled.div`
  display: flex;
  align-content: center;

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
  min-height: 78vh;
  // 0.몇으로 하면 자동적으로 길이가 길어짐에 따라(100vh를 넘었을 때) 색의 경계선이 보임
`;

// 보낸 신청함
function SentRequests() {
  return <Div>SentRequests</Div>;
}

// 받은 신청함
function ReceivedRequests() {
  return <Div>ReceivedRequests</Div>;
}

const Div = styled.div`
  font-size: 100px;
`;
