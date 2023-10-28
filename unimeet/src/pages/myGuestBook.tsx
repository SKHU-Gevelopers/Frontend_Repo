import UnderNav from "@/components/UnderNav";
import { getMyGuestBookUserData } from "@/util/guestBook/myGuestBookUtil";
import { destroyCookie, parseCookies } from "nookies";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LogoutDiv } from "@/styles/DivStyle/bulletinBoardDivStyle";
import { Logout } from "@/util/auth/signUtil";
import router from "next/router";

interface MyData {
  id: number;
  profileImageUrl: string;
  nickname: string;
  department: string;
  mbti: string;
}

interface GuestBook {
  writerId: number;
  profileImageUrl: string;
  content: string;
}

interface Page {
  currentPage: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  numberOfElements: number;
  first: boolean;
  last: boolean;
}

export default function MyGuestBook() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [myData, setMyData] = useState<MyData | null>(null);
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);
  const [pageData, setPageData] = useState<Page>({
    currentPage: 1,
    size: 0,
    hasNext: false,
    hasPrevious: false,
    numberOfElements: 0,
    first: true,
    last: false,
  });

  // const [studentId, setStudentId] = useState<number>();

  const isLoading = useRef(false); // 로딩 상태를 useRef로 관리
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const guestBookRef = useRef<HTMLDivElement | null>(null);

  const getMyGuestBookData = () => {
    if (isLoading.current) return;
    isLoading.current = true;

    getMyGuestBookUserData(accessToken, refreshToken, pageData?.currentPage)
      .then((res) => {
        if (res != null) {
          setMyData(res.data.student);
          setGuestBookData((prevData) => [...prevData, ...res.data.guestBooks]);
          setPageData(res.data.page);
          setIsScrollEnabled(!res.data.page.last);
        }
      })
      .finally(() => {
        isLoading.current = false;
      });
  };

  useEffect(() => {
    getMyGuestBookData();
  }, [accessToken, refreshToken, pageData.currentPage, isLoading]);

  function deleteCookie() {
    Logout(accessToken).then((res) => {
      destroyCookie(undefined, "refresh-token");
      destroyCookie(undefined, "accessToken");
      router.push("/");
    });
  }

  const handleScroll = useCallback(() => {
    if (isScrollEnabled && pageData?.hasNext) {
      const guestBookDiv = guestBookRef.current;

      if (guestBookDiv && !isLoading.current) {
        const scrollHeight = guestBookDiv.scrollHeight;
        const scrollTop = guestBookDiv.scrollTop;
        const clientHeight = guestBookDiv.clientHeight;

        if (scrollHeight - scrollTop <= clientHeight + 100) {
          setPageData((prevPageData) => ({
            ...prevPageData,
            currentPage: prevPageData.currentPage + 1,
          }));
          isLoading.current = false;
        }
      }
    }
  }, [isScrollEnabled, pageData]);

  useEffect(() => {
    const guestBookDiv = guestBookRef.current;

    if (guestBookDiv) {
      guestBookDiv.addEventListener("scroll", handleScroll);

      return () => {
        guestBookDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <>
      <MainBox>
        <LogoutDiv onClick={deleteCookie}>로그아웃</LogoutDiv>
        <ProfileBox>
          <ProfileImageWrap>
            <div className="profileImage">
              <ProfileImage
                src={myData?.profileImageUrl}
                alt="profileImage"
              ></ProfileImage>
            </div>
          </ProfileImageWrap>
          <Name>{myData?.nickname}</Name>
          <InformationBox>
            {/* {user?.majors.map((each, index) => (
            <Department key={index}>
              <p>{each.major}</p> */}
            <Department>{myData?.department}</Department>
            {/* ))} */}
          </InformationBox>
          <MBTI>
            <p>{myData?.mbti}</p>
          </MBTI>
          {/* <Introduce>{user?.introduction}</Introduce> */}
        </ProfileBox>
        <GuestBooks ref={guestBookRef}>
          {guestBookData?.map((each, Id) => {
            return (
              <EachReview key={`writer${Id}`}>
                <GuestImageWrap>
                  <GuestImage
                    src={each.profileImageUrl}
                    alt="profileImage"
                  ></GuestImage>
                </GuestImageWrap>
                <GuestComment>{each.content}</GuestComment>
              </EachReview>
            );
          })}
        </GuestBooks>
      </MainBox>
      <UnderNav />
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2.7em;
  padding-bottom: 2vh;

  width: 100%;
  height: 100vh;

  overflow: auto;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 35vh;
`;

const ProfileImageWrap = styled.div`
  width: 10rem;
  height: 18vh;
  display: flex;
  justify-content: center;

  border-radius: 50%;
  & > .profileImage {
    width: 8rem;
    height: 8rem;

    border-radius: 50%;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const Name = styled.div`
  padding-left: 5%;

  width: 100%;
  height: 4vh;

  border-radius: 4rem;

  font-size: 1.2rem;
  font-weight: 600;
`;

const InformationBox = styled.div`
  display: flex;
  gap: 3%;

  width: 90%;
  height: 5.5vh;
`;

const Department = styled.div`
  width: 100%;
  height: 4vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

  text-align: center;
  line-height: 4vh;

  font-weight: 600;
`;

const MBTI = styled.div`
  width: 90%;
  height: 4vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

  text-align: center;
  line-height: 4vh;

  font-weight: 600;
`;

const GuestBooks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2vh;

  width: 90%;
  height: 54vh;

  border-top: 3px solid white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const GuestImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const EachReview = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 3vh;

  width: 100%;
  height: 6vh;
`;

const GuestImageWrap = styled.div`
  width: 15%;
  height: 6vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
`;

const GuestComment = styled.div`
  display: flex;
  align-items: center;

  margin-left: 3%;
  padding-left: 3%;
  padding-right: 3%;

  width: 83%;
  height: 6vh;

  border-radius: 5rem;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
  box-shadow: 0px 3px #b085c9;

  font-weight: 500;
`;
