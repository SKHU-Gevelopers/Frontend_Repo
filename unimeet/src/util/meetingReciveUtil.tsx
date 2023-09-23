import { useState } from "react";
import { requestToken } from "@/util/myPage";
import axios from "axios";
import { parseCookies } from "nookies";

interface Application {
  id: number;
  title: string;
  sender: { id: number; nickname: string };
}

interface ApplicationDetail {
  title: string;
  content: string;
  meetUpImages: [];
  sender: {
    id: number;
    nickname: string;
  };
  targetPostId: number;
}

export default function MeetingReciveUtil() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];
  const [token, setToken] = useState("");

  const [listData, setListData] = useState<Application[]>([]);
  const [detailData, setDetailData] = useState<ApplicationDetail>();

  const [applicationId, setApplicationId] = useState<number | null>(null);
  const searchUrl = "https://unimeet.duckdns.org/meet-ups";

  const getRecivedApplication = async () => {
    try {
      setToken(accessToken || " ");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${searchUrl}`, {
          headers,
        });
        setListData(response.data.data.meetUps);
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

  const getRecivedApplicationDetailVersion = async () => {
    try {
      if (applicationId !== null) {
        setToken(accessToken || "");
        if (token) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get(
            `https://unimeet.duckdns.org/meet-ups/${applicationId}`,
            { headers }
          );
          setDetailData(response.data.data.meetUp);
        }
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

  const acceptApplication = async () => {
    try {
      setToken(accessToken || "");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          `https://unimeet.duckdns.org/meet-ups/${applicationId}/accept`,
          "수락하기",
          { headers }
        );
        alert("수락했습니다.");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 400)
        alert("이미 수락된 상태입니다.");
      else if (error.response && error.response.status === 401) {
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
    detailData,
    listData,
    setApplicationId,
    applicationId,
    getRecivedApplication,
    getRecivedApplicationDetailVersion,
    acceptApplication,
  };
}
