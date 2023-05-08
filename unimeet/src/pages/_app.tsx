import type { AppProps } from "next/app";
import styled from "styled-components";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Bubble />
      <Component {...pageProps} />
    </>
  );
}

const Bubble = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(
    circle at 75% 30%,
    #ffffff3d 5px,
    #2300ff8a 8%,
    #00008b61 60%,
    #00ffff57 100%
  );
  box-shadow: inset 0 0 20px #ffffff8f, inset 10px 0 46px #d8d8d8bd,
    inset 88px 0px 60px #c2d8fea9, inset -20px -60px 100px #fde9ea91,
    inset 0 50px 140px #fde9ea3b, 0 0 90px #ffffffd6;
`;
