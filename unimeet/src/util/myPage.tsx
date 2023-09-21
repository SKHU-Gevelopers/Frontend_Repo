import axios from "axios";
import { parseCookies, setCookie } from "nookies";

// const cookies = parseCookies();
// export const accesstoken = cookies["accessToken"];
// export const refreshtoken = cookies["refresh-token"];
// 매 페이지 마다 리로드 될 떄 token이 변경될 수 있다.
export const requestToken = async (
  token: string,
  retryCount: number = 0 // 재시도 횟수를 초기화합니다.
): Promise<{ newAccessToken: string; newRefreshToken: string }> => {
  try {
    const response = await axios.post(
      `https://unimeet.ducdns.org/token/reissue`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data.data);
    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;
    setCookie(null, "accessToken", newAccessToken, {
      maxAge: 30 * 24 * 60 * 60, // 30일
      path: "/", // 쿠키 경로
    });
    setCookie(null, "refresh-token", newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60, // 30일
      path: "/", // 쿠키 경로
    });
    return { newAccessToken, newRefreshToken };
  } catch (err: any) {
    console.log(token);
    if (err.response && err.response.status === 401) {
      if (retryCount < 3) {
        // 최대 3번 재시도하도록 설정
        const { newAccessToken, newRefreshToken } = await requestToken(
          token,
          retryCount + 1
        ); // 재귀 호출 시 재시도 횟수를 증가
        return { newAccessToken, newRefreshToken };
      } else {
        throw new Error("너무 많이 재요청되었습니다."); // 재시도 횟수가 너무 많아지면 오류 처리
      }
    }
    throw err;
  }
};

export const MypageRequest = async (
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    const response = await axios.get(
      "https://unimeet.duckdns.org/users/my-page",
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
        return MypageRequest(newAccessToken, newRefreshToken);
      } catch (tokenErr: any) {
        console.log("Failed to refresh token:", tokenErr);
        throw tokenErr;
      }
    } else {
      throw err;
    }
  }
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
