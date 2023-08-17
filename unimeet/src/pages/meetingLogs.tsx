import styled from "styled-components";

// 조건부 렌더링
export default function MeetingLogs() {
  return (
    <>
      <SentRequests />
      <ReceivedRequests />
    </>
  );
}

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
