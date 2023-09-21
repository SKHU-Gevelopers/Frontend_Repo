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
import { useState } from "react";
import UnderNav from "@/components/UnderNav";
import Comments from "@/components/Comments";
export default function DetailBoard() {
  const [imageSrc, setImageSrc] = useState("/dogImage.png");
  const [nickname, setNickname] = useState("배달원");

  const [nowStateBoolean, setNowStateBoolean] = useState(true);
  const [nowState, setNowState] = useState("모집중");
  const [recruitNum, setRecruitNum] = useState(0);
  const [place, setPlace] = useState("만남 장소가 미정입니다.");
  const [content, setContent] = useState("전달내용이 존재하지 않습니다.");

  const tableTitle = [
    { title: "모집 상태", value: nowState },
    { title: "모집 인원", value: recruitNum },
    { title: "민남 장소", value: place },
    { title: "전달 내용", value: content },
  ];

  return (
    <>
      <UnderNav />
      <DetailMain>
        <TopBox>
          <BacktoBoard href="/bulletinBoard">
            <IoIosArrowRoundBack size={40} />
            뒤로가기
          </BacktoBoard>
          <ProfileImageWrap className="profileDiv">
            <ProfileImageBox>
              <ProfileImage
                src={imageSrc}
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
            <InputTitle>글쓴이의 제목 부분</InputTitle>
            <DetailBtnBox>
              <DetailBtn>쪽지하기</DetailBtn>
              <DetailBtn>신청하기</DetailBtn>
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
          <ImageBox
            src={imageSrc}
            alt="profileImg"
            width={310}
            height={200}
          ></ImageBox>
        </DetailMainDiv>
        <Comments />
      </DetailMain>
    </>
  );
}
