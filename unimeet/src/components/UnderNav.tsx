import React, { useEffect } from "react";
import { MainBox, MainUl, MainLink, MainImg } from "@/styles/UnderNavbarStyle";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const UnderNav = () => {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    if (!accessToken || !refreshToken) {
      router.push("/");
    }
  });

  return (
    <>
      <MainBox>
        <MainUl>
          <li>
            <MainLink href="/LockMypage">
              <MainImg src="/user.png" width="25" height="25" alt={""} />
              <span>내정보</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/myGuestBook">
              <MainImg src="/agenda.png" width="25" height="25" alt={""} />
              <span>방명록</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/bulletinBoard">
              <MainImg src="/network.png" width="25" height="25" alt={""} />
              <span>미팅룸</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/message/mainChat">
              <MainImg src="/chat.png" width="25" height="25" alt={""} />
              <span>쪽지함</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/meetingLogs">
              <MainImg src="/image.png" width="25" height="25" alt={""} />
              <span>신청함</span>
            </MainLink>
          </li>
        </MainUl>
      </MainBox>
    </>
  );
};

export default UnderNav;
