import axios from "axios";
import { useEffect, useState } from "react";

interface DmData {
  title: string;
  sender: {
    id: number;
    nickname: string;
  };
  sentAt: Date;
}

export default function Chat() {
  const [token, setToken] = useState<string>();
  const [data, setData] = useState<DmData[]>([]);

  const chatGetData = async () => {
    try {
      setToken(localStorage.getItem("login-token") || "");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatGetData();
  }, [token]);

  return <></>;
}
