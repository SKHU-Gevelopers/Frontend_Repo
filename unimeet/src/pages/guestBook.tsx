import UnderNav from "@/components/UnderNav";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { TbSend } from "react-icons/tb";
import DmModal from "@/components/DmModal";
import { getGuestBookUserData, postGuestBook } from "@/util/guestBookUtil";
import { parseCookies } from "nookies";

interface Student {
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

export default function GestBook() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [studentData, setStudentData] = useState<Student | null>(null);
  const [guestBookData, setGuestBookData] = useState<GuestBook[]>([]);

  const [postGuestBookComment, setPostGuestBookComment] = useState<string>("");
  const [studentId, setStudentId] = useState<number>();

  const [isDmModal, setIsDmModal] = useState(false);

  useEffect(() => {
    getGuestBookUserData(accessToken, refreshToken).then((res) => {
      setStudentData(res.data.student);
      setGuestBookData(res.data.guestBooks);
    });
  }, [accessToken]);

  // 방명록 작성 input 내용 저장
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPostGuestBookComment(e.target.value);
  };

  const openDmModal = () => {
    setIsDmModal(true);
  };

  return (
    <>
      <MainBox>
        <DmButtonWrap>
          <DmButton onClick={openDmModal} />
        </DmButtonWrap>
        {studentData && isDmModal && (
          <DmModal
            isOpen={isDmModal}
            onClose={() => setIsDmModal(false)}
            senderId={studentData?.id}
          ></DmModal>
        )}
        <ProfileBox>
          <ProfileImageWrap>
            <ProfileImage
              src={studentData?.profileImageUrl}
              alt="profileImage"
            ></ProfileImage>
          </ProfileImageWrap>
          <Name>{studentData?.nickname}</Name>
          <InformationBox>
            {/* {user?.majors.map((each, index) => (
            <Department key={index}>
              <p>{each.major}</p> */}
            <Department>{studentData?.department}</Department>
            {/* ))} */}
          </InformationBox>
          <MBTI>
            <p>{studentData?.mbti}</p>
          </MBTI>
          {/* <Introduce>{user?.introduction}</Introduce> */}
        </ProfileBox>
        <GuestBooks>
          <GuestBookForm
            onSubmit={async (e) => {
              if (
                studentId !== undefined &&
                postGuestBookComment.trim() !== ""
              ) {
                await postGuestBook(
                  e,
                  accessToken,
                  refreshToken,
                  postGuestBookComment,
                  studentId
                );
              }
            }}
            onClick={() => {
              setStudentId(studentData?.id);
            }}
          >
            <PostGuestBookCommentInputBox
              placeholder="방명록을 남겨보세요."
              onChange={onChange}
            ></PostGuestBookCommentInputBox>
          </GuestBookForm>
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

  padding-bottom: 2vh;

  width: 100%;
  height: 100vh;

  overflow: auto;
`;
const DmButtonWrap = styled.div`
  display: flex;
  justify-content: end;

  margin-top: 5%;
  padding-right: 3.5vh;

  width: 100%;
  height: 2.7em;
`;

const DmButton = styled(TbSend)`
  width: 2.7em;
  height: 100%;
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

  border-radius: 50%;
  border: solid 1px rgba(103, 79, 244, 0.8);
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

const Introduce = styled.div`
  margin-top: 1.5vh;
  padding-left: 2.5%;
  padding-right: 2.5%;

  width: 90%;
  height: 11vh;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;

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

const PostGuestBookCommentInputBox = styled.input`
  padding-left: 3%;

  width: 100%;
  height: 100%;

  border-radius: 1rem;
  border: none;
  outline: none;

  background-color: white;
  opacity: 0.7;

  font-size: 1rem;
  font-weight: 600;
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
