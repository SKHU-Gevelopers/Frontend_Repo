import { useState } from "react";
import styled from "styled-components";

export default function HeartCount() {
  const [like, setLike] = useState(0);

  return (
    <HeartWrap>
      <HeartImg src="/heart.png" alt="빈 하트 사진"></HeartImg>
    </HeartWrap>
  );
}

const HeartWrap = styled.div`
  margin-left: 3%;

  width: 7%;
  height: 4vh;
`;

const HeartImg = styled.img`
  margin-left: 3%;

  width: 100%;
  height: 100%;
`;
