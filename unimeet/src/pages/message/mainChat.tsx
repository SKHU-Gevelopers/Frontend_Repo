import UnderNav from "@/components/UnderNav";
import PersonBox from "@/components/chat/PersonBox";
import { ChatPage_Main, MainBox_Chat } from "@/styles/pageStyle/ChatStyle";
import { chatGetData } from "@/util/chat/chatUtil";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

const MainChat = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];

    if (!accessToken || !refreshToken) {
      router.push("/");
    } else {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  }, [router, setAccessToken, setRefreshToken]);

  useEffect(() => {
    chatGetData(accessToken, refreshToken);
  }, [accessToken, refreshToken]);

  return (
    <ChatPage_Main>
      <MainBox_Chat>
        <Link href={"../chat/tempChat"}>
          <PersonBox />
        </Link>
      </MainBox_Chat>
      <UnderNav />
    </ChatPage_Main>
  );
};
export default MainChat;
