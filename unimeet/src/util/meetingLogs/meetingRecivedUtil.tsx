import { requestToken } from "@/util/myPage";
import axios from "axios";

export const getRecivedApplication = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      `https://unimeet.duckdns.org/meet-ups/received`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return getRecivedApplication(newAccessToken, newRefreshToken);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const acceptApplication = async (
  accessToken: string,
  refreshToken: string,
  applicationId: number
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    await axios.post(
      `https://unimeet.duckdns.org/meet-ups/${applicationId}/accept`,
      "수락하기",
      { headers }
    );
    alert("수락했습니다.");
  } catch (error: any) {
    if (error.response && error.response.status === 400)
      alert("이미 수락했습니다.");
    else if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return acceptApplication(
          newAccessToken,
          newRefreshToken,
          applicationId
        );
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
