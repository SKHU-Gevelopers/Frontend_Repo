import {
  BacktoBoard,
  DetailBoxTitleBox,
  DetailBtn,
  DetailBtnBox,
  DetailMain,
  DetailMainDiv,
  DetailTable,
  ImageBox,
  InputTitle,
  ProfileImage,
  ProfileImageBox,
  ProfileImageWrap,
  TopBox,
} from "@/styles/detailBoardStyle";
import { IoIosArrowRoundBack } from "react-icons/io";
import { use, useEffect, useState } from "react";
import UnderNav from "@/components/UnderNav";
import Comments from "@/components/detailboard/[id]/Comments";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { checkDetail } from "@/util/boardUtil/detailBoardUtil";
import Link from "next/link";
import DmModal from "@/components/DmModal";
import { getcomments } from "@/util/boardUtil/commentUtil";

interface CommentsProps {
  id: number;
  content: string;
  student: {
    id: number;
    nickname: string;
  };
}
interface DetailPageProps {
  data: {
    id: number;
    title: string;
    tableTitle: string;
    imageSrc: string[];
    comments: Comment[];
  };
}

export default function DetailBoard({ data }: DetailPageProps) {
  const router = useRouter();
  const { id } = router.query;
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [nickname, setNickname] = useState("배달원");
  const [title, setTitle] = useState("제목이 존재하지 않습니다.");
  const [nowState, setNowState] = useState("모집중");
  const [content, setContent] = useState("전달내용이 존재하지 않습니다.");
  const [likes, setLikes] = useState(0);
  const [maxpeople, setMaxpeople] = useState(0);
  const [place, setPlace] = useState("만남 장소가 미정입니다.");
  const [gender, setGender] = useState("여자");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [comments, setComments] = useState<CommentsProps[]>([]);

  const [dm, setDm] = useState(false);

  const tableTitle = [
    { title: "모집 상태", value: nowState },
    { title: "최대 인원", value: maxpeople },
    { title: "모집 성별", value: gender },
    { title: "만남 장소", value: place },
    { title: "전달 내용", value: content },
  ];

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies["accessToken"];
    const refreshToken = cookies["refresh-token"];
    checkDetail(Number(id), accessToken, refreshToken)
      .then((res) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setGender(res.data.gender);
        setNickname(res.data.nickname);
        setTitle(res.data.title);
        setProfileImageUrl(res.data.profileImageUrl);
        setImageSrc(res.data.imageUrls);
        res.data.state === "IN_PROGRESS"
          ? setNowState("모집중")
          : setNowState("모집완료");
        setMaxpeople(res.data.maxPeople);
        setLikes(res.data.likes);
        setContent(res.data.content);
        //   res.data.meetingPlace === null
        //     ? setPlace("미정")
        //     : setPlace(res.data.meetingPlace);
        // 이부분 아직 반환 안되고 있음
      })
      .then(() => {
        getcomments(accessToken, refreshToken, Number(id)).then((res) => {
          setComments(res.data);
        });
      });
  }, []);

  return (
    <>
      <UnderNav />
      <DetailMain>
        {dm && (
          <DmModal
            isOpen={dm}
            onClose={() => setDm(!dm)}
            senderId={Number(id)}
          ></DmModal>
        )}
        <TopBox>
          <BacktoBoard href="/bulletinBoard">
            <IoIosArrowRoundBack size={40} />
            뒤로가기
          </BacktoBoard>
          <ProfileImageWrap className="profileDiv">
            <ProfileImageBox>
              <ProfileImage
                src={profileImageUrl}
                alt="profileImg"
                width={40}
                height={40}
              />
              <span>{nickname}</span>
            </ProfileImageBox>
          </ProfileImageWrap>
        </TopBox>
        <DetailMainDiv>
          <DetailBoxTitleBox>
            <InputTitle>{title}</InputTitle>
            <DetailBtnBox>
              <DetailBtn onClick={() => setDm(!dm)}> 쪽지하기</DetailBtn>
              <Link href={`/meetingApply/${id}`}>
                <DetailBtn>신청하기</DetailBtn>
              </Link>
            </DetailBtnBox>
          </DetailBoxTitleBox>
          <DetailTable>
            <tbody>
              {tableTitle.map((item, index) => {
                return (
                  <tr key={index}>
                    <th>{item.title}</th>
                    <td>{item.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </DetailTable>
          {imageSrc.map((item, index) => {
            return (
              <ImageBox
                src={item}
                alt="profileImg"
                width={310}
                height={200}
              ></ImageBox>
            );
          })}
        </DetailMainDiv>
        <Comments id={Number(id)} comments={comments} />
      </DetailMain>
    </>
  );
}
