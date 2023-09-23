import { parseCookies } from "nookies";
import { useState } from "react";
import { requestToken } from "./myPage";
import axios from "axios";

interface MyData {
  id: number;
  profileImageUrl: string;
  nickname: string;
  department: string;
  mbti: string;
}

interface GuestBook {
  writerId: number;
  profileImageUrl: string;
  content: string;
}

export default function MyGuestBookUtil() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];
  const [token, setToken] = useState<string>("");

  const [myData, setMyData] = useState<MyData | null>(null);
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);

  const getMyGuestBookUserData = async () => {
    try {
      setToken(accessToken || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          "https://unimeet.duckdns.org/users/my-page-pub",
          {
            headers,
          }
        );
        setMyData(response.data.data.student);
        setGuestBookData(response.data.data.guestBooks);
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

  return { token, myData, guestBookData, getMyGuestBookUserData };
}
