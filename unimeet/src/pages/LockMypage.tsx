import Image from "next/image";
import styled from "styled-components";

export default function LockMypage() {
  const imageStyle = {
    borderRadius: "100px",
    border: "1px solid #fff",
  };

  return (
    <>
      <DefaultCoordinate>
        <Image
          src="/dogImage.png"
          width={200}
          height={200}
          alt="Picture of the author"
          style={imageStyle}
        />
      </DefaultCoordinate>
    </>
  );
}

const DefaultCoordinate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
