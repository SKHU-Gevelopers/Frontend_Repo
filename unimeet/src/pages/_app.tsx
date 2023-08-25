import type { AppProps } from "next/app";
import "../styles/global.css";
import UnderNav from "@/components/UnderNav";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <UnderNav />
    </>
  );
}
