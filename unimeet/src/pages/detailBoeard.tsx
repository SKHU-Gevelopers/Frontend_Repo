import {
  BacktoBoard,
  DetailBtn,
  DetailMain,
  ProfileImage,
  ProfileImageWrap,
} from "@/styles/detailBoardStyle";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import Image from "next/image";
export default function DetailBoard() {
  const [imageSrc, setImageSrc] = useState("/dogImage.png");
  const [nickname, setNickname] = useState("배달원");
  const tableTitle = [
    { title: "현재 인원", value: "여자 2명" },
    { title: "모집 인원", value: "남자 2명" },
    { title: "민남 장소", value: "역곡역 크라운호프" },
    { title: "전달 내용", value: "안녕하세요. 왈왈왈왈 개 될 준비 되었나~" },
  ];

  return (
    <DetailMain>
      <BacktoBoard href="/bulletinBoard">
        <IoIosArrowRoundBack size={40} />
        뒤로가기
      </BacktoBoard>
      <ProfileImageWrap className="profileDiv">
        <ProfileImage src={imageSrc} alt="profileImg" width={40} height={40} />
        <span>{nickname}</span>
        <DetailBtn>쪽지하기</DetailBtn>
        <DetailBtn>신청하기</DetailBtn>
      </ProfileImageWrap>
      <div>
        <div>글쓴이의 제목 부분</div>
        <table>
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
        </table>
        <Image src={imageSrc} alt="profileImg" width={300} height={200}></Image>
      </div>
    </DetailMain>
  );
}
