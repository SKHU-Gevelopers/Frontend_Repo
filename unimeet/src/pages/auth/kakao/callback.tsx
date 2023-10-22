import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { Main } from "@/styles/DefaultStyle/flexStyle";

interface ResponseType {
  ok: boolean;
  error?: any;
}

const Callback: NextPage = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code: string | string[]) => {
      // 백엔드에 전송
      await fetch("https://unimeet.duckdns.org/auth/kakao/callback?code=" + code,
        {}
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.statusCode === 200) {
            console.log(res);
            // res 데이터에서 accessToken, refreshToken을 받아온다.
            const accessToken = res.data.accessToken;
            setCookie(null, "accessToken", accessToken, {
              path: "/", // 쿠키 경로
            });
            const refreshToken = res.data.refreshToken;
            setCookie(null, "refresh-token", refreshToken, {
              path: "/", // 쿠키 경로
            });
            if (res.data.firstSignIn) {
              router.push("/LockMypage");
            } else {
              router.push("/bulletinBoard");
            }
          } else {
            alert("카카오 로그인에 실패하였습니다.");
            router.push("/");
          }
        });
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      alert("카카오 로그인에 실패하였습니다." + kakaoServerError);
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <Main>카카오 로그인 중 입니다...</Main>;
};

export default Callback;
