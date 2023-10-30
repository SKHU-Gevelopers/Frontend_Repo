import axios from "axios";
import { requestToken } from "@/util/myPage";

export const chatGetDataList = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      "https://unimeet.duckdns.org/dm/received",
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
        return chatGetDataList(newAccessToken, newRefreshToken);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const chatSentDataList = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get("https://unimeet.duckdns.org/dm/sent", {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return chatGetDataList(newAccessToken, newRefreshToken);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const chatDetailData = async (
  accessToken: string,
  refreshToken: string,
  dmId: number
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(`https://unimeet.duckdns.org/dm/${dmId}`, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return chatDetailData(newAccessToken, newRefreshToken, dmId);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
