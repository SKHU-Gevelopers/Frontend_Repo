import UnderNav from "@/components/UnderNav";
import { getMyGuestBookUserData } from "@/util/myGuestBookUtil";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

export default function MyGuestBook() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [myData, setMyData] = useState<MyData | null>(null);
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);

  useEffect(() => {
    getMyGuestBookUserData(accessToken, refreshToken).then((res) => {
      setMyData(res.data.student);
      setGuestBookData(res.data.guestBooks);
    });
  }, [accessToken]);

  return (
    <>
      <MainBox>
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
        <GuestBooks>
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
  align-content: center;

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
  height: 46vh;
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
  padding-bottom: 7vh;

  width: 100%;
  height: 85vh;

  border-radius: 50%;
`;

const GuestBookForm = styled.form`
  margin-bottom: 2vh;

  width: 90%;
  height: 13vh;
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

  width: 90%;
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
