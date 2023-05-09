import type { AppProps } from "next/app";
import "../styles/global.css";
import MainLogin from "@/components/MainLogin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
