import axios from "axios";
import { parseCookies } from "nookies";
import { requestToken } from "@/util/myPage";
import { useState } from "react";

interface DmData {
  id: number;
  title: string;
  sender: {
    id: number;
    nickname: string;
  };
  sentAt: string;
}

export default function ChatUtil() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];
  const [token, setToken] = useState<string>();

  const [data, setData] = useState<DmData[]>([]);

  const chatGetData = async () => {
    try {
      setToken(accessToken || "");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("https://unimeet.duckdns.org/dm", {
          headers,
        });
        setData(response.data.data.dmList);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        try {
          const { newAccessToken } = await requestToken(refreshToken);
          setToken(newAccessToken);
        } catch (error: any) {
          console.log("Failed to refresh token:", error);
        }
      }
    }
  };

  return { data, token, chatGetData };
}
