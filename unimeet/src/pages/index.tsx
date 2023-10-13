import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import Link from "next/link";
import BubbleGround from "@/components/BubbleGround";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { Main } from "@/styles/DefaultStyle/flexStyle";
import {
  ButtonDiv,
  ButtonStyle,
  LoginBox,
  TextBox,
  UnimeetTitle,
} from "@/styles/pageStyle/MainloginStyle";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

  return (
    <div className="main">
      <Main className="Mainlogin_mainDiv">
        <BubbleGround />
        <LoginBox>
          <UnimeetTitle>unimeet</UnimeetTitle>
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
        </LoginBox>
      </Main>
    </div>
  );
}
