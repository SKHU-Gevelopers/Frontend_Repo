import axios from "axios";
import { requestToken } from "./myPage";

export const getDmData = async (
  accessToken: string,
  refreshToken: string,
  dmId: string
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
        return getDmData(newAccessToken, newRefreshToken, dmId);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
