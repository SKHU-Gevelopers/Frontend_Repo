import axios from "axios";

export const authenticationRequest = (email: string) => {
  email === ""
    ? alert("이메일을 입력해주세요")
    : axios
        .post("https://unimeet.duckdns.org/auth/email", {
          email: email,
        })
        .then((res) => {
          alert("인증번호가 전송되었습니다.");
        })
        .catch((err) => console.log(err));
};
//  이메일 인증번호 정송 api
