import React, { useEffect } from "react";
import { MainBox, MainUl, MainLink, MainImg } from "@/styles/UnderNavbarStyle";
import { FaDog } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const UnderNav = () => {
  const router = useRouter();
  const Linked = (link: string) => {
    router.push(link);
  };
  useEffect(() => {
    const token = localStorage.getItem("login-token");
    if (!token) {
      router.push("/mainLogin");
    }
  });

  return (
    <>
      <MainBox>
        <MainUl>
          <li>
            <MainLink href="/lockMypage">
              <MainImg src="/user.png" width="25" height="25" alt={""} />
              <span>내정보</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/guestBook">
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
            <MainLink href="/chat">
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
