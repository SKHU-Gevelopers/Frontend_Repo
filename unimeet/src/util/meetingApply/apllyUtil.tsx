import axios from "axios";
import { requestToken } from "../myPage";
import router from "next/router";

export const meetingApplyFunc = async (
  meetingId: number,
  accessToken: string,
  refreshToken: string,
  title: string,
  content: string,
  contact: string,
  image: string
): Promise<any> => {
  let formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("contact", contact);
  formData.append("meetUpImage=@", image);
  try {
    const response = await axios.post(
      `https://unimeet.duckdns.org/posts/${meetingId}/meet-ups`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
        return meetingApplyFunc(
          meetingId,
          newAccessToken,
          newRefreshToken,
          title,
          content,
          contact,
          image
        );
      } catch (tokenErr: any) {
        alert("다시 로그인을 해주세요.");
        router.push("/MainLogin");
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};
