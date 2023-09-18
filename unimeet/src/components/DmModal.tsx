import styled from "styled-components";
import UnderNav from "./UnderNav";
import axios from "axios";
import { useState } from "react";
import { TbSend } from "react-icons/tb";

interface DmModalProps {
  isOpen: boolean;
  onClose: () => void; // 모달을 닫는 함수를 받도록 수정
  senderId: number;
}

const DmModal = ({ isOpen, onClose, senderId }: DmModalProps) => {
  const [token, setToken] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  if (!isOpen) {
    return null;
  }

  const changeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const DmPost = async () => {
    try {
      setToken(localStorage.getItem("login-token") || "");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const Dmdata = { title, content };
        await axios.post(
          `https://unimeet.duckdns.org/users/${senderId}/dm`,
          Dmdata,
          {
            headers,
          }
        );
        onClose();
        alert("전송했습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DmModalWrap>
        <Main>
          <Action>
            <DeleteModal onClick={onClose}>X</DeleteModal>
            <StyledSend onClick={DmPost}></StyledSend>
          </Action>
          <DmInputData>
            <TitleInput
              placeholder="제목을 입력하세요."
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

  align-items: center;

  gap: 65%;
`;

const DeleteModal = styled.div`
  padding-top: 2vh;
  padding-left: 8%;

  font-weight: 900;
  font-size: 2rem;
`;

const StyledSend = styled(TbSend)`
  margin-top: 5%;

  width: 2.7em;
  height: 2.7em;
`;

const DmInputData = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 3vh;
  padding-left: 8%;
  padding-right: 8%;
`;

const TitleInput = styled.textarea`
  width: 100%;
  height: 8vh;

  background-color: rgba(255, 255, 255, 0);

  font-size: 1.6rem;
  font-weight: 900;

  border: none;

  textarea&:focus {
    outline: solid 2px white;
    border-radius: 0.5rem;
  }

  overflow: hidden;
`;

const ContentInput = styled.textarea`
  margin-top: 1vh;

  width: 100%;
  height: 55vh;

  background-color: rgba(255, 255, 255, 0);

  font-size: 1rem;

  border: none;

  textarea&:focus {
    outline: solid 2px white;
    border-radius: 0.5rem;
  }

  overflow: hidden;
`;

export default DmModal;
