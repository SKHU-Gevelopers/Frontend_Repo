import { FixBtn } from "@/pages/LockMypage";
import React, { useState } from "react";
import styled from "styled-components";

interface InfoBoxProps {
  value: string;
  defaultValue: string;
}

const MypageInfoBox: React.FC<InfoBoxProps> = ({ value, defaultValue }) => {
  const [infoValue, setInfoValue] = useState(defaultValue);

  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch("/some-api", { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <>
      <FormBox method="post" onSubmit={handleSubmit}>
        <InputDiv name="infoBox" defaultValue={value} rows={4} cols={40} />
        <div>
          <ButtonStyle type="reset">초기화</ButtonStyle>
          <ButtonStyle type="submit">수정하기</ButtonStyle>
        </div>
      </FormBox>
    </>
  );
};
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  &>div{
    display: flex;
    justify-content: flex-end;
  }
`;
const ButtonStyle = styled(FixBtn)`
  width: fit-content;
  margin:10px 0 0 10px;
`;

const InputDiv = styled.textarea`
  font-family: monospace;
  width: 31vw;
  height: 20vh;
  outline: none;
  border: 1px solid #674ff4;
  padding: 5px;
  background-color: #faebd700;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  color: #3a3a3a;
  background-color: #e1c9ff;
  border-radius: 10px;
  &:focus {
    box-shadow: 0 2px 4px #312576;
    background-color: #c0b5ff42;
    transform: translateY(-1px);
    transition: all 1s;
  }
`;

export default MypageInfoBox;
