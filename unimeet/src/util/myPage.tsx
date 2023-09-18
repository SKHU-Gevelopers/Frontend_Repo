import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();
export const accesstoken = cookies["accessToken"];

export const requestToken = (email: string, password: string) => {
  axios
    .post(
      `https://unimeet.ducdns.org/token/reissue`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const MypageRequest = (token: string): Promise<any> => {
  return axios
    .get("https://unimeet.duckdns.org/users/my-page", {
      headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      // err.statusCode === 401 && requestToken
    });
};

export function handleSubmit(
  token: string,
  nickname: string,
  mbti: string,
  profileImgXXX: string,
  introduction: string,
  major1: string,
  major2: string
): Promise<any> {
  const formData = new FormData();
  formData.append("nickname", nickname);
  formData.append("mbti", mbti);
  formData.append("profileImg", profileImgXXX);
  formData.append("introduction", introduction);
  formData.append("majors", major1);
  formData.append("majors", major2);

  return axios.post("https://unimeet.duckdns.org/users/my-page", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
