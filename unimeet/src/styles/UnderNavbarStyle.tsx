import styled from "styled-components";
import Image from "next/image";

export const MainBox = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff7ff;
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0px 8px 15px gray;
`;

export const MainUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  list-style: none;
`;

export const MainLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  outline: none;
  color: #000000;
  text-decoration: none;
`;

export const MainImg = styled(Image)`
  margin-bottom: 0.3rem;
`;
