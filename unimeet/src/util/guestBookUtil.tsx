import axios from "axios";
import { requestToken } from "./myPage";

// **************************************** next.js Link 태그로 인한 추가 클릭시 이 해당 id 전송되게 만들어주세욤
// const router = useRouter();
// const { writerId } = router.query;
// ******************************************

export const getGuestBookUserData = async (
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
      `https://unimeet.duckdns.org/users/1/my-page?page=${page}`,
      // ********************************************************
      // `https://unimeet.duckdns.org/users/${writerId}/my-page?page=1`,
      // ******************************************************** 해당 writerId 사용한 url 은 writerId 받은 다음에 사용하려 합니담.
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
        return getGuestBookUserData(newAccessToken, newRefreshToken, page);
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
