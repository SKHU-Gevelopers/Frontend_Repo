import { requestToken } from "@/util/myPage";
import axios from "axios";

export const getRecivedApplicationDetailVersion = async (
  accessToken: string,
  refreshToken: string,
  applicationId: number
): Promise<any> => {
  try {
    if (applicationId !== null) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(
        `https://unimeet.duckdns.org/meet-ups/${applicationId}`,
        { headers }
      );
      return response.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return getRecivedApplicationDetailVersion(
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
