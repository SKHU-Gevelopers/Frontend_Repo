import axios from "axios";
import { access } from "fs";
import router from "next/router";
import { requestToken } from "../myPage";

export const Postting = async (
  accessToken: string,
  refreshToken: string,
  title: string,
  content: string,
  pictures: File[],
  maxPeople: number,
  gender: string
): Promise<any> => {
  
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("maxPeople", maxPeople.toString());
  formData.append("gender", gender);
  pictures.forEach((picture) => {
    formData.append(`postImages`, picture); // 각 파일을 formData에 추가
  });
  try {
    const response = await axios.post(
      "https://unimeet.duckdns.org/posts",
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
    console.log(formData.get("postImages"));
    if (err.response && err.response.status === 401) {
      try {
        const { newAccessToken, newRefreshToken } = await requestToken(
          refreshToken
        );
        return Postting(
          newAccessToken,
          newRefreshToken,
          title,
          content,
          pictures,
          maxPeople,
          gender
        );
      } catch (tokenErr: any) {
        alert("토큰 발급에 실패하셨습니다.");
        router.push("/");
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
};
