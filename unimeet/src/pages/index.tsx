import { Inter } from "next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <GlobalStyle></GlobalStyle>;
}
const GlobalStyle = styled.div`
  width: 100%;
  height: 100vh;
`;
