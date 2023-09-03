import { Dispatch, ReactNode } from "react";

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
    <div className="modal">
      <div className="modal -content">{children}</div>
      <button onClick={() => setIsOpen(false)}>닫기</button>
    </div>
  );
};

export default Modal;
