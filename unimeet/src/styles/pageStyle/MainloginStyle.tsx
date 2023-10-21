import styled, { keyframes } from "styled-components";

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
export const ButtonDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const ButtonStyle = styled.button`
  width: 6rem;
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
export const TextBox = styled.div`
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
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
  flex-direction: column;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px #8d8d8d;
`;

export const UnimeetTitle = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bolder;
  font-size: xx-large;
  color: aliceblue;
  text-shadow: 2px 3px 3px slategray;
`;
