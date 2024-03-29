import { requestToken } from "../myPage";
import axios from "axios";

export const getMyGuestBookUserData = async (
  accessToken: string,
  refreshToken: string,
  page: number
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      `https://unimeet.duckdns.org/users/my-page-pub?page=${page}`,
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
        return getMyGuestBookUserData(newAccessToken, newRefreshToken, page);
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
