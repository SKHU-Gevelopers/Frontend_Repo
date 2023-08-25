import { Box, Main } from "@/styles/applyStyle";
import Image from "next/image";

export default function meetingApply() {
  return (
    <Main>
      <Box className="Maindiv">
        <button>뒤로가기</button>
        <div>
          <Image src="/dogImage.png" width="100" height="100" alt={""} />
          <div>이름</div>
        </div>
        <div className="innerBox">
          <button>뒤로가기</button>
          <div>만남 신청</div>
          <form>
            <input type="text" placeholder="제목" />
            <input type="text" placeholder="전달할 내용" />
            <input type="text" placeholder="인스타 아이디" />
            <input type="text" placeholder="사진" />
          </form>
        </div>
        <div></div>
      </Box>
    </Main>
  );
}
