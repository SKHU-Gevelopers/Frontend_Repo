import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { requestToken } from "./myPage";

interface GetDmData {
  title: string;
  content: string;
}

export default function ReciveDmUtil() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];
  const [token, setToken] = useState<string>();

  const [DmData, setDmData] = useState<GetDmData>();
  const router = useRouter();
  const { dmId } = router.query;

  const getDmData = async () => {
    try {
      setToken(accessToken || "");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          `https://unimeet.duckdns.org/dm/${dmId}`,
          {
            headers,
          }
        );
        setDmData(response.data.data.dm);
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

  return { token, DmData, getDmData };
}
