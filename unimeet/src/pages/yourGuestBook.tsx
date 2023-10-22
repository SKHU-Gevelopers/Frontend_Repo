import UnderNav from "@/components/UnderNav";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TbSend } from "react-icons/tb";
import DmModal from "@/components/DmModal";
import {
  getGuestBookUserData,
  postGuestBook,
} from "@/util/guestBook/yourGuestBookUtil";
import { parseCookies } from "nookies";

interface Student {
  id: number;
  profileImageUrl: string;
  nickname: string;
  department: string;
  mbti: string;
}

interface GuestBook {
  id: number;
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

export default function GestBook() {
  const cookies = parseCookies();
  const accessToken = cookies["accessToken"];
  const refreshToken = cookies["refresh-token"];

  const [studentData, setStudentData] = useState<Student | null>(null);
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

  const [postGuestBookComment, setPostGuestBookComment] = useState<string>("");
  const [studentId, setStudentId] = useState<number>();

  const isLoading = useRef(false); // 로딩 상태를 useRef로 관리
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const guestBookRef = useRef<HTMLDivElement | null>(null);

  const [isDmModal, setIsDmModal] = useState(false);

  const getYourGuestBookData = () => {
    if (isLoading.current) return;
    isLoading.current = true;

    getGuestBookUserData(accessToken, refreshToken, pageData?.currentPage)
      .then((res) => {
        if (res != null) {
          setStudentData(res.data.student);
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
    getYourGuestBookData();
  }, [accessToken, refreshToken, pageData.currentPage, isLoading]);

  // 스크롤 이벤트 핸들러 추가
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

  // 방명록 작성 input 내용 저장
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value;
    if (newComment.length >= 20) {
      alert("글자수를 초과했습니다.");
    } else {
      setPostGuestBookComment(newComment);
    }
  };

  const openDmModal = () => {
    setIsDmModal(true);
  };

  const handlePostGuestBook = async () => {
    if (postGuestBookComment.trim() !== "") {
      if (studentId !== undefined) {
        postGuestBook(
          accessToken,
          refreshToken,
          postGuestBookComment,
          studentId
        );
        alert("방명록이 등록되었습니다.");
        setPostGuestBookComment("");
        window.location.reload();
      }
    }
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
          <PostGuestBookForm>
            <GuestBookSubmitWrap>
              <PostGuestBookCommentInputBox
                placeholder="방명록을 남겨보세요."
                onChange={onChange}
                value={postGuestBookComment}
              ></PostGuestBookCommentInputBox>
              <SubmitWrap>
                <Submit
                  onClick={() => {
                    setStudentId(studentData?.id);
                    handlePostGuestBook();
                  }}
                >
                  전송
                </Submit>
              </SubmitWrap>
            </GuestBookSubmitWrap>
          </PostGuestBookForm>
          <GetGuestBook ref={guestBookRef}>
            <DivForScroll>
              {guestBookData?.map((each, id) => {
                return (
                  <EachReview key={id}>
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
            </DivForScroll>
          </GetGuestBook>
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

const PostGuestBookForm = styled.form`
  margin-bottom: 2vh;

  width: 90%;
  height: 13vh;
`;

const GuestBookSubmitWrap = styled.div`
  padding-bottom: 0.6em;

  width: 100%;
  height: 100%;

  border-radius: 1rem;

  background-color: white;
  opacity: 0.7;
`;

const PostGuestBookCommentInputBox = styled.input`
  padding-left: 3%;
  padding-top: 1.7em;

  width: 100%;
  height: 70%;

  border-radius: 1rem;
  border: none;
  outline: none;

  font-size: 1rem;
  font-weight: 600;
`;

const SubmitWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  padding-right: 0.5em;
  padding-bottom: 0.7em;

  width: 100%;
  height: 3em;
`;

const Submit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3em;
  height: 2em;

  background-color: white;
  border-radius: 1rem;
  border: solid 1px gray;
`;

const GetGuestBook = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 52vh;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const DivForScroll = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 53vh;
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

  font-size: 0.8em;
  font-weight: 500;
`;
