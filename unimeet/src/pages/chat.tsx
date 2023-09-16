import UnderNav from "@/components/UnderNav";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DmModal from "@/components/DmModal";
import Link from "next/link";

interface DmData {
  id: number;
  title: string;
  sender: {
    id: number;
    nickname: string;
  };
  sentAt: string;
}

export default function Chat() {
  const [token, setToken] = useState<string>();
  const [data, setData] = useState<DmData[]>([]);

  const chatGetData = async () => {
    try {
      setToken(localStorage.getItem("login-token") || "");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("https://unimeet.duckdns.org/dm", {
          headers,
        });
        setData(response.data.data.dmList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatGetData();
  }, [token]);

  const [isDmModal, setIsDmModal] = useState(false);

  const openDmModal = () => {
    setIsDmModal(true);
  };

  return (
    <>
      <MainBox>
        <Article>
          {data &&
            data.map((each, index) => {
              return (
                <EachDm key={index}>
                  <RightWrap>
                    <DmAt>{each.sentAt}</DmAt>
                  </RightWrap>
                  <DmTitle>{each.title}</DmTitle>
                  <DmSenderNickname>{each.sender.nickname}</DmSenderNickname>
                  <RightWrap>
                    <Action>
                      <ReplyDm onClick={openDmModal}>답장</ReplyDm>
                      {isDmModal && (
                        <DmModal
                          isOpen={isDmModal}
                          onClose={() => setIsDmModal(false)}
                          senderId={each.sender.id}
                        ></DmModal>
                      )}
                      <Link
                        href={{
                          pathname: "/reciveDm",
                          query: { dmId: each.id },
                        }}
                      >
                        <Detail>상세보기</Detail>
                      </Link>
                    </Action>
                  </RightWrap>
                </EachDm>
              );
            })}
        </Article>
      </MainBox>
      <UnderNav />
    </>
  );
}

const MainBox = styled.div`
  margin-top: 5vh;

  display: flex;
  align-content: center;

  width: 100%;
  height: 95vh;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 15vh;

  width: 100%;
  max-height: 95vh;

  overflow-y: scroll;
  overflow-x: hidden;

  gap: 2rem;

  width: 100%;
`;

const EachDm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1.5rem 1.5rem 1.5rem 1.5rem;

  width: 92%;
  min-height: 16vh;
  max-height: 16vh;

  background-color: rgba(255, 255, 255, 0.7);

  border-radius: 0.7em;
`;

const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DmAt = styled.div`
  height: 2vh;

  font-weight: 400;
`;

const DmTitle = styled.div`
  height: 4vh;

  font-size: 1.2rem;
  font-weight: bolder;
`;

const DmSenderNickname = styled.div`
  height: 3vh;

  font-size: 1rem;
  font-weight: 800;
`;

const Action = styled.div`
  display: flex;
  gap: 0.3em;
`;

const ReplyDm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5rem;
  height: 3.5vh;

  border-radius: 0.5em;

  background-color: #674ff4;

  font-weight: 700;
  color: white;
`;

const Detail = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5rem;
  height: 3.5vh;

  border-radius: 0.5em;

  background-color: #674ff4;

  font-weight: 700;
  color: white;

  text-decoration-line: none;
  outline: none;
`;
