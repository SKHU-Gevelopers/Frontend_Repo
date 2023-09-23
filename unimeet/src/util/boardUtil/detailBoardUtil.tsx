import axios from "axios";
import { requestToken } from "../myPage";
import { access } from "fs";

export const checkDetail = async (
  meetingId: number,
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `https://unimeet.duckdns.org/posts/${meetingId}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
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
        return checkDetail(meetingId, newAccessToken, newRefreshToken);
      } catch (tokenErr: any) {
        console.log("Failed to refresh token:", tokenErr);
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};

export const postcomments = async (
  accessToken: string,
  refreshToken: string,
  meetingId: number,
  content: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `https://unimeet.duckdns.org/posts/${meetingId}/comments`,
      content,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
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
        return postcomments(
          newAccessToken,
          newRefreshToken,
          meetingId,
          content
        );
      } catch (tokenErr: any) {
        console.log("Failed to refresh token:", tokenErr);
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};
