import axios from "axios";
import { FormEvent } from "react";
import { requestToken } from "./myPage";

// **************************************** next.js Link 태그로 인한 추가 클릭시 이 해당 id 전송되게 만들어주세욤
// const router = useRouter();
// const { writerId } = router.query;
// ******************************************

export const getGuestBookUserData = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.get(
      "https://unimeet.duckdns.org/users/1/my-page?page=1",
      // ********************************************************
      // `https://unimeet.duckdns.org/users/${writerId}/my-page?page=1`,
      // ******************************************************** 해당 writerId 사용한 url 은 writerId 받은 다음에 사용하려 합니담.
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return getGuestBookUserData(newAccessToken, newRefreshToken);
      } catch (error: any) {
        console.log("Failed to refresh token:", error);
      }
    }
  }
};

export const postGuestBook = async (
  e: FormEvent<HTMLFormElement>,
  accessToken: string,
  refreshToken: string,
  postGuestBookComment: string,
  studentId: number
): Promise<void> => {
  e.preventDefault();
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
    console.log(error);
    if (error.response && error.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return postGuestBook(
          e,
          newAccessToken,
          newRefreshToken,
          postGuestBookComment,
          studentId
        );
      } catch (error: any) {
        console.log("Failed to refresh token:", error);
      }
    }
  }
};
