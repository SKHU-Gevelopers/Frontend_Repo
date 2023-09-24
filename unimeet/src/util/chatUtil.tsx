import axios from "axios";
import { requestToken } from "@/util/myPage";

export  const chatGetData = async (
    accessToken: string,
    refreshToken: string
  ): Promise<any> => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get("https://unimeet.duckdns.org/dm", {
        headers,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        try {
          const { newAccessToken, newRefreshToken } = await requestToken(refreshToken);
          return chatGetData(newAccessToken, newRefreshToken)
        } catch (error: any) {
          console.log("Failed to refresh token:", error);
        }
      }
    }
  };
