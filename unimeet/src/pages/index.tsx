import Link from "next/link";
import BubbleGround from "@/components/BubbleGround";
import { useEffect, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { Main } from "@/styles/DefaultStyle/flexStyle";
import {
  ButtonDiv,
  ButtonStyle,
  LoginBox,
  TextBox,
  UnimeetTitle,
} from "@/styles/pageStyle/MainloginStyle";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // 카카오 SDK 스크립트를 동적으로 추가합니다.
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js";
    script.async = true;
    script.integrity =
      "sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // 스크립트가 로드된 후에 초기화를 수행합니다.
    script.onload = () => {
      // 카카오 SDK를 초기화합니다.
      Kakao.init(`34defb948b2a4f4e9827e18b1c7240d7`);
    };
  }, []);

  function loginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("https://unimeet.duckdns.org/auth/sign-in", {
        email,
        password,
      })
      .then((res) => {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        setCookie(null, "accessToken", accessToken, {
          path: "/", // 쿠키 경로
        });
        setCookie(null, "refresh-token", refreshToken, {
          path: "/", // 쿠키 경로
        });
        router.push("/bulletinBoard");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function kakao_loginSubmit() {
    Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/auth/kakao/callback",
      scope:
        "profile_nickname, account_email, profile_image, gender, age_range, openid",
    });
  }

  return (
    <div className="main">
      <Main className="Mainlogin_mainDiv">
        <BubbleGround />
        <LoginBox>
          <UnimeetTitle>UNIMEET</UnimeetTitle>
          <form onSubmit={loginSubmit}>
            <TextBox>
              <AiOutlineUser color="gray" />
              <input
                placeholder="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </TextBox>
            <TextBox>
              <BiLockAlt color="gray" />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextBox>
            <ButtonDiv>
              <ButtonStyle type="submit">login</ButtonStyle>
              <Link href="/signup">
                <ButtonStyle>signup</ButtonStyle>
              </Link>
            </ButtonDiv>
          </form>
          <div onClick={kakao_loginSubmit}>
            <Image
              src="/kakao_login_medium_narrow.png"
              width={250}
              height={45}
              alt="Kakao Login"
            />
          </div>
        </LoginBox>
      </Main>
    </div>
  );
}
