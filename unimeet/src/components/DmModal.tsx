import styled from "styled-components";
import UnderNav from "./UnderNav";
import axios from "axios";
import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { parseCookies } from "nookies";
import { requestToken } from "@/util/myPage";
import router from "next/router";

interface DmModalProps {
  isOpen: boolean;
  onClose: () => void; // 모달을 닫는 함수를 받도록 수정
  senderId: number;
}

const DmModal = ({ isOpen, onClose, senderId }: DmModalProps) => {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  if (!isOpen) {
    return null;
  }

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length >= 20) {
      alert("글자수를 초과했습니다.");
      setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const DmPost = async (
    accessToken: string,
    refreshToken: string
  ): Promise<any> => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const Dmdata = { title, content };
      await axios.post(
        `https://unimeet.duckdns.org/users/${senderId}/dm`,
        Dmdata,
        {
          headers,
        }
      );
      alert("전송했습니다.");
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          const { newAccessToken, newRefreshToken } = await requestToken(
            refreshToken
          );
          return DmPost(newAccessToken, newRefreshToken);
        } catch (error: any) {
          alert("다시 로그인을 해주세요.");
          router.push("/");
        }
      }
    }
  };

  return (
    <>
      <DmModalWrap>
        <Main>
          <Action>
            <DeleteModalWrap>
              <DeleteModal onClick={onClose}>X</DeleteModal>
            </DeleteModalWrap>
            <SendWrap>
              <Send onClick={() => DmPost(accessToken, refreshToken)}></Send>
            </SendWrap>
          </Action>
          <DmInputData>
            <TitleInput
              placeholder="제목을 입력하세요.(최대 20자)"
              value={title}
              onChange={changeTitle}
            ></TitleInput>
            <ContentInput
              placeholder="쪽지 내용을 입력하세요."
              value={content}
              onChange={changeContent}
            ></ContentInput>
          </DmInputData>
        </Main>
        <UnderNav></UnderNav>
      </DmModalWrap>
    </>
  );
};

const DmModalWrap = styled.div`
  display: flex;
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

const Main = styled.div`
  width: 90%;
  height: 80%;

  background-color: rgba(255, 255, 255, 0.7);

  border-radius: 2em;
`;

const Action = styled.div`
  display: flex;

  padding-top: 1em;

  width: 100%;
  height: 3em;

  align-items: center;
`;

const DeleteModalWrap = styled.div`
  margin-left: 8%;
  width: 50%;
`;

const DeleteModal = styled.div`
  font-weight: 900;
  font-size: 2em;
`;

const SendWrap = styled.div`
  display: flex;
  justify-content: right;

  margin-right: 5%;
  width: 50%;
`;

const Send = styled(TbSend)`
  width: 2em;
  height: 2em;
`;

const DmInputData = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2vh;
  padding-left: 8%;
  padding-right: 8%;
`;

const TitleInput = styled.textarea`
  padding: 0.5em;

  width: 100%;
  height: 9vh;
  resize: none;

  background-color: rgba(255, 255, 255, 0);

  font-size: 1.2rem;
  font-weight: 900;

  border: none;
  outline: solid 5px rgba(198, 141, 245, 0.37);
  border-radius: 0.8em;

  overflow: hidden;
`;

const ContentInput = styled.textarea`
  padding: 0.5em;
  margin-top: 3vh;

  width: 100%;
  height: 55vh;
  resize: none;

  background-color: rgba(255, 255, 255, 0);

  font-size: 1rem;

  border: none;
  outline: solid 5px rgba(198, 141, 245, 0.37);
  border-radius: 0.8em;

  overflow: hidden;
`;

export default DmModal;
