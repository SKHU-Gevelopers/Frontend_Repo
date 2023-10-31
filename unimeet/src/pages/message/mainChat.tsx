import UnderNav from "@/components/UnderNav";
import { chatGetDataList } from "@/util/chat/chatUtil";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { HiPaperAirplane } from "react-icons/hi";
import SentDataList from "@/components/chat/SentDataList";
import GetDataList from "@/components/chat/GetDataList";

const MainChat = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [selectedBtn, setSelectedBtn] = useState<string>("received");

  const switchBtn = (BtnName: string) => {
    setSelectedBtn(BtnName);
  };

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      router.push("/");
    } else {
      chatGetDataList(accessToken, refreshToken);
    }
  }, [accessToken, refreshToken, router]);

  return (
    <>
      <Main>
        <SwitchDiv>
          <RecivedButtonWrap>
            <RecivedButton
              isSelected={selectedBtn === "received"}
              onClick={() => switchBtn("received")}
            ></RecivedButton>
          </RecivedButtonWrap>

          <SendButtonWrap>
            <SendButton
              isSelected={selectedBtn === "sent"}
              onClick={() => switchBtn("sent")}
            ></SendButton>
          </SendButtonWrap>
        </SwitchDiv>

        {selectedBtn === "received" ? (
          <GetDataList />
        ) : selectedBtn === "sent" ? (
          <SentDataList />
        ) : null}
      </Main>
      <UnderNav />
    </>
  );
};

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

const RecivedButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-left: 4%;

  width: 45%;
  height: 5vh;
`;

const SendButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-left: 4%;

  width: 45%;
  height: 5vh;
`;

const RecivedButton = styled(HiPaperAirplane)<{ isSelected: boolean }>`
  width: 3em;
  height: 100%;
  transform: rotate(180deg);

  color: white;

  ${(props) =>
    props.isSelected &&
    css`
      color: #bb8dfb;
    `}
`;

const SendButton = styled(HiPaperAirplane)<{ isSelected: boolean }>`
  width: 3em;
  height: 100%;

  color: white;

  ${(props) =>
    props.isSelected &&
    css`
      color: #bb8dfb;
    `}
`;

const MainBox = styled.div`
  width: 100%;
  height: 100vh;
`;

export default MainChat;
