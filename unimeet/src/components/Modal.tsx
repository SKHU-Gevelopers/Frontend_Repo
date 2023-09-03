import { Dispatch, ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>; // TypeScript에서 상태 업데이트 함수의 타입을 명시적으로 정의하는 데 사용
  children: ReactNode; // React 컴포넌트의 자식 요소로 사용할 수 있는 모든 타입을 포함하는 유연한 타입
}

const Modal = ({ isOpen, setIsOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBox className="modal">
      <div className="modal -content">{children}</div>
      <DeleteModal onClick={() => setIsOpen(false)}>닫기</DeleteModal>
    </ModalBox>
  );
};

export default Modal;

const ModalBox = styled.div`
  width: 100%;
  height: 98%;

  background-color: #feeffe;
  border: 0.2rem solid #bb8dfb;
`;

const DeleteModal = styled.div`
  padding-top: 2vh;
  padding-left: 84%;

  font-weight: 800;
  font-size: 1.3rem;
`;
