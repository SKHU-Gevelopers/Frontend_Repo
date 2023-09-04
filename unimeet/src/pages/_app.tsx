import type { AppProps } from "next/app";
import "../styles/global.css";
import { use, useEffect } from "react";
import router from "next/router";


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("login-token");
    if (!token) {
      router.push("/mainLogin");
    }

  }, []);

  return (
    <>
      <Component {...pageProps} />
      
    </>
  );
}
