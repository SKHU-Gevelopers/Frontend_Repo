import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

interface ResponseType {
  ok: boolean;
  error?: any;
}

const Kakao: NextPage = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      // 백엔드에 전송
      const response: ResponseType = await fetch("/api/users/kakao-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authCode: code,
        }),
      }).then((res) => res.json());

      if (response.ok) {
        // 성공하면 홈으로 리다이렉트
        router.push("/");
      } else {
        // 실패하면 에러 페이지로 리다이렉트
        router.push("/notifications/authentication-failed");
      }
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push("/notifications/authentication-failed");
      alert("카카오 로그인에 실패하였습니다. 개발자에게 인가코드 관련하여 문의부탁드립니다");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;