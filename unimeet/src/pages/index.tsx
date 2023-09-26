import { Inter } from "next/font/google";
import router from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/MainLogin");
    }
  });
  return( <div></div>);
}
