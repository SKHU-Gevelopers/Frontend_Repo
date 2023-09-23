import axios from "axios";
import { parseCookies } from "nookies";
import { FormEvent, useState } from "react";
import { requestToken } from "./myPage";

interface Student {
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

export default function GuestBookUtil() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];
  const [token, setToken] = useState<string>("");

  const [studentData, setStudentData] = useState<Student | null>(null);
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);

  const [postGuestBookComment, setPostGuestBookComment] = useState<string>("");
  const [studentId, setStudentId] = useState<number | null>();

  // **************************************** next.js Link 태그로 인한 추가 클릭시 이 해당 id 전송되게 만들어주세욤
  // const router = useRouter();
  // const { writerId } = router.query;
  // ******************************************

  const getGuestBookUserData = async () => {
    try {
      setToken(accessToken || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          "https://unimeet.duckdns.org/users/1/my-page?page=1",
          // ********************************************************
          // `https://unimeet.duckdns.org/users/${writerId}/my-page?page=1`,
          // ******************************************************** 해당 writerId 사용한 url 은 writerId 받은 다음에 사용하려 합니담.
          {
            headers,
          }
        );
        setStudentData(response.data.data.student);
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

  const postGuestBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setToken(localStorage.getItem("login-token") || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const postData = {
          content: postGuestBookComment,
        };
        await axios.post(
          `https://unimeet.duckdns.org/users/${studentId}/guestbooks`,
          postData,
          { headers }
        );
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

  return {
    token,
    studentData,
    guestBookData,
    setPostGuestBookComment,
    setStudentId,
    getGuestBookUserData,
    postGuestBook,
  };
}
