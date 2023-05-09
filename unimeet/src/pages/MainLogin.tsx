import styled, { keyframes } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import Link from "next/link";
import BubbleGround from "@/components/BubbleGround";


export default function MainLogin() {
  return (
    <Main>
      <BubbleGround />
      <LoginBox>
        <TextBox>
          <AiOutlineUser color="gray" />
          <input placeholder="username" />
        </TextBox>
        <TextBox>
          <BiLockAlt color="gray" />
          <input type="password" placeholder="password" />
        </TextBox>
        <ButtonDiv>
          <Button>login</Button>
          <Link href="/signup">
            <Button>signup</Button>
          </Link>
        </ButtonDiv>
      </LoginBox>
    </Main>
  );
}
const pulse = keyframes`
 0% {
  box-shadow: 0 0 0 0 #05bada66;
 }

 70% {
  box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
 }

 100% {
  box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
 }
`;
const ButtonDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Button = styled.button`
  border: none;
  color: #fff;
  background-image: linear-gradient(30deg, #a600ff, #4ce3f7);
  border-radius: 20px;
  background-size: 100% auto;
  font-family: inherit;
  font-size: 17px;
  padding: 0.6em 1.5em;
  &:hover {
    background-position: right center;
    background-size: 200% auto;
    -webkit-animation: pulse 2s infinite;
    animation: ${pulse} 1.5s infinite;
  }
`;
const TextBox = styled.div`
  width: 18rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 30px;
  border: 0px;
  margin-top: 1rem;
  padding: 0px 1rem;
  background: white;
  display: flex;
  align-items: center;

  & > input {
    border: 0px;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: 90%;
    width: 100%;
    padding: 0px 1rem;
    outline: none;
    background-color: white;
  }
`;
export const LoginBox = styled.div`
  width: 20rem;
  height: 25rem;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px #686868;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
