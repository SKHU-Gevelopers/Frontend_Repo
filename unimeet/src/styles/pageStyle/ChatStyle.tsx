import styled from "styled-components";
import Image from "next/image";
import { Colum_flex, Main, MainBox } from "../DefaultStyle/flexStyle";

export const ProfileImage_Chat = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff;
  overflow: hidden;
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #488bffa7;
`;
export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .Sender {
    font-size: 1.2rem;
    font-weight: 900;
    padding: 5px 5px 0 5px;
  }
  .Value {
    font-size: 1rem;
    font-weight: 400;
    padding: 0 5px 5px 5px;
    width: 60vw;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ChatParentBox = styled(Colum_flex)`
  width: 100%;
  background-color: #ffffffcd;
  border-radius: 10px;
  margin-bottom: 10px;
`;
export const MainBox_Chat = styled(MainBox)`
  border-radius: 10px;
`;
export const ChatPage_Main = styled(Main)`
  height: 110vh;
  align-items: flex-start;
  padding-top: 2.7em;
`
