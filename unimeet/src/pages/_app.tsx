import type { AppProps } from "next/app";
import "../styles/global.css";
import { useEffect } from "react";
import router from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/MainLogin");
    }
  });
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
