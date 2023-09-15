import Modal from "@/components/Modal";
import { useState } from "react";
import styled from "styled-components";

export default function ModalTest() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DmModalWrap>
        <Main>
          <Modal isOpen={isOpen}>
            <DeleteModal onClick={() => setIsOpen(false)}>X</DeleteModal>
            <div>hi</div>
          </Modal>
        </Main>
      </DmModalWrap>
    </>
  );
}

const DmModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: fixed; /* 모달을 화면에 고정 */
  top: 0;
  left: 0;
  background: linear-gradient(220deg, #3246ff, #e3ceff, #ff46d1);
  z-index: 9999; /* 다른 요소 위에 나타나도록 z-index 설정 */
`;

const Main = styled.div`
  width: 90%;
  height: 90%;

  background-color: rgba(255, 255, 255, 0.7);

  border-radius: 2em;
`;

const DeleteModal = styled.div`
  padding-top: 2vh;
  padding-left: 84%;

  font-weight: 800;
  font-size: 1.3rem;
`;
