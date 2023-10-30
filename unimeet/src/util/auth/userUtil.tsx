import axios from "axios";
import { requestToken } from "../myPage";

export const Logout = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
  const response = await axios.post(
    `https://unimeet.duckdns.org/sign-out`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return Logout(newAccessToken, newRefreshToken);
      } catch (tokenErr: any) {
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};
