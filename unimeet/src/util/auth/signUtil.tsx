import axios from "axios";
export const authenticationRequest = (email: string, username: string): Promise<any> => {
  if (email === "") {
    return Promise.reject(new Error("이메일을 입력해주세요")); // 빈 이메일 처리
  } else if (!/^[^@.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email)) {
    return Promise.reject(new Error("이메일 형식이 올바르지 않습니다.")); // 이메일 형식 처리
  } else {
    return axios.post("https://unimeet.duckdns.org/auth/email", {
      emailPrefix: username,
    });
  }
};
//  이메일 인증번호 정송 api

export const authenticationConfirm = (
  email: string,
  code: string
): Promise<any> => {
  if (code === "") {
    return Promise.reject(new Error("인증번호를 입력해주세요")); // 빈 인증번호 처리
  } else {
    return axios.post("https://unimeet.duckdns.org/auth/email/confirm", {
      email: email,
      code: code,
    });
  }
}
export const Logout = (accessToken: string): Promise<any> => {
  return axios.post("https://unimeet.duckdns.org/sign-out", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
}