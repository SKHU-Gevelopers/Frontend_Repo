import React from "react";
import { MainBox, MainUl, MainLink } from "@/styles/UnderNavbarStyle";
import { FaDog } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

const UnderNav = () => {
  const router = useRouter();
  const Linked = (link: string) => {
    router.push(link);
  };
  return (
    <>
      <MainBox>
        <MainUl>
          <li>
            <MainLink href="/mainLogin">
              <FaDog size={30} />
              <span>내정보</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/bulletinBoard">
              <FaDog size={30} />
              <span>방명록</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/meetingRoom">
            <FaDog size={30} />
            <span>미팅룸</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/chat">
            <FaDog size={30} />
            <span>쪽지함</span>
            </MainLink>
          </li>
          <li>
            <MainLink href="/feed">
            <FaDog size={30} />
            <span>피드</span>
            </MainLink>
          </li>
        </MainUl>
      </MainBox>
    </>
  );
};

export default UnderNav;
