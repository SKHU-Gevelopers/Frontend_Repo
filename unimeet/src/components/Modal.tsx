import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode; // React 컴포넌트의 자식 요소로 사용할 수 있는 모든 타입을 포함하는 유연한 타입
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return <div>{children}</div>;
};

export default Modal;
