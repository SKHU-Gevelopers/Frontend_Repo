import axios from "axios";
export const authenticationRequest = (email: string) => {
  return email === ""
    ? Promise.reject(new Error("이메일을 입력해주세요")) // 빈 이메일 처리
    : axios.post("https://unimeet.duckdns.org/auth/email", { email: email });
};
//  이메일 인증번호 정송 api

