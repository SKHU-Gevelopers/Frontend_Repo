import axios from "axios";
import { requestToken } from "../myPage";

export const meetingApplyFunc = async (
  meetingId: number,
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  let formData = new FormData();
  formData.append("title", "title");
  formData.append("content", "content");
  formData.append("contact", "contact");
  formData.append("files", "image");
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
        return meetingApplyFunc(meetingId, newAccessToken, newRefreshToken);
      } catch (tokenErr: any) {
        console.log("Failed to refresh token:", tokenErr);
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};
