import { chatGetDataList } from "@/util/chat/chatUtil";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DmData {
  id: number;
  title: string;
  sender: UserInfo;
  receiver: UserInfo;
  sentAt: string;
}

interface UserInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

interface DmListResponse {
  dmList: DmData[];
}

const GetDataList = () => {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [sentDmList, setSentDmList] = useState<DmData[]>([]);

  useEffect(() => {
    if (accessToken) {
      chatGetDataList(accessToken, refreshToken).then((res) => {
        res && setSentDmList(res.data.dmList);
      });
    }
  }, [accessToken, refreshToken]);
  return (
    <MainBox>
      <RequestBox>
        <Article>
          {sentDmList &&
            sentDmList.map((each, index) => {
              return (
                <Application key={index}>
                  <Content>
                    <ApplicantImageWrap>
                      {each?.sender?.profileImageUrl && (
                        <Link
                          href={{
                            pathname: "/yourGuestBook",
                            query: { writerId: each.sender.id },
                          }}
                        >
                          <ApplicantImage
                            src={each.sender.profileImageUrl}
                            alt="신청자 사진"
                          ></ApplicantImage>
                        </Link>
                      )}
                    </ApplicantImageWrap>
                    {each.sender.nickname}: {each.title}
                  </Content>
                </Application>
              );
            })}
        </Article>
      </RequestBox>
    </MainBox>
  );
};

// SentRequests, ReceivedRequests 함수 공동 부분 CSS
const MainBox = styled.div`
  width: 100%;
  height: 100vh;
`;

const RequestBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 2vh;

  position: relative;

  display: flex;
  align-content: center;

  width: 100%;
  height: 75vh;
  background-color: #faf9fcba;
  opacity: 0.97;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const Application = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 2vh;

  width: 88%;
  height: auto;

  border: solid 2px #bb8dfb;
  border-radius: 50px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const ApplicantImageWrap = styled.div`
  margin-left: 1vw;
  margin-right: 1vw;

  width: 50px;
  height: 6vh;

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);

  background-color: white;
`;

const ApplicantImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

export default GetDataList;
