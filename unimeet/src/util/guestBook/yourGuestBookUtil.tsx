import axios from "axios";
import { requestToken } from "../myPage";

export const getYourGuestBookUserData = async (
  accessToken: string,
  refreshToken: string,
  writerId: number,
  page: number
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      `https://unimeet.duckdns.org/users/${writerId}/my-page?page=${page}`,
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
        return getYourGuestBookUserData(
          newAccessToken,
          newRefreshToken,
          writerId,
          page
        );
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};

export const postGuestBook = async (
  accessToken: string,
  refreshToken: string,
  postGuestBookComment: string,
  studentId: number
): Promise<void> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const postData = {
      content: postGuestBookComment,
    };
    await axios.post(
      `https://unimeet.duckdns.org/users/${studentId}/guestbooks`,
      postData,
      { headers }
    );
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return postGuestBook(
          newAccessToken,
          newRefreshToken,
          postGuestBookComment,
          studentId
        );
      } catch (error: any) {}
    } else {
      throw error;
    }
  }
};
