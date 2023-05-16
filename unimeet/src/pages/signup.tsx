import { mbtilist, skhuDepartmentList } from "@/constants/mbtilist";
import styled from "styled-components";
import { LoginBox } from "./MainLogin";
import BubbleGround from "@/components/BubbleGround";
import { keyframes } from "@emotion/react";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  function handleSubmit(e: any) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch("https://unimeet.duckdns.org/users/sign-up", {
      method: form.method,
      body: formData,
    });

  }
  return (
    <MainBox>
      <BubbleGround />
      <SignupBox>
        <form method="post" onSubmit={handleSubmit}>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">이름</span>
            <input
              id="myInput"
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              type="text"
            />
          </LabelStyle>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">닉네임</span>
            <input
              id="myInput"
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="닉네임을 입력하세요"
              type="text"
            />
          </LabelStyle>
          <EmailForm>
            <LabelStyle htmlFor="myInput" className="label">
              <span className="label-title">이메일</span>
              <input
                id="myInput"
                className="input"
                name="text"
                placeholder="인증 받았던 이메일을 입력해주세요"
                type="text"
              />
            </LabelStyle>
            <SendBtn>인증 요청</SendBtn>
          </EmailForm>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">인증 번호</span>
            <input
              id="myInput"
              className="input"

              placeholder="인증번호를 입력해주세요"
              type="type"
            />
          </LabelStyle>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">비밀번호</span>
            <input
              id="myInput"
              className="input"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
            />
          </LabelStyle>
          <MyDict className="mydict">
            <div>
              <GenderLabel>
                <GenderInput type="radio" name="radio" />
                <span className="Women">Women</span>
              </GenderLabel>
              <GenderLabel>
                <GenderInput type="radio" name="radio" />
                <span className="Men">Men</span>
              </GenderLabel>
              <GenderLabel>
                <GenderInput type="radio" name="radio" />
                <span className="Divided">Divided</span>
              </GenderLabel>
            </div>
          </MyDict>
          <SelectStyle>
            <span className="label-title">mbti</span>
            <select className="input">
              {mbtilist.map((mbtis) => (
                <option key={mbtis.id}>{mbtis.mbti}</option>
              ))}
            </select>
          </SelectStyle>
          <SelectStyle>
            <span className="label-title">소속 학부</span>
            <select className="input">
              {skhuDepartmentList.map((departments) => (
                <option key={departments.id}>{departments.department}</option>
              ))}
            </select>
          </SelectStyle>
          <BtnDiv>
            <SubmitBtn>Sign up to Unimeet</SubmitBtn>
          </BtnDiv>
        </form>
      </SignupBox>
    </MainBox>
  );
}
const glowing = keyframes`
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
`;
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitBtn = styled.button`
  width: 80%;
  height: 100%;
  padding: 1rem;
  margin: 1rem;
  border: none;
  outline: none;
  color: #fff;
  background: rgb(164, 179, 255);
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  font-weight: 600;
  &::before {
    content: "";
    background: linear-gradient(45deg, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowing} 20s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }
  &:active {
    color: #000;
  }
  &:active::after {
    background: transparent;
  }
  &:hover::before {
    opacity: 1;
  }
  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: none;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;
const LabelStyle = styled.label`
  --border: rgb(66 66 66 / 0%);
  --bgLabel: rgb(120 120 120 / 0%);
  --bgInput: rgba(255, 255, 255, 1);
  --color-light: rgb(98, 0, 255);
  --color-light-a: rgb(133, 123, 150);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  background: var(--bgLabel);
  margin-top: 1.5rem;
  border-radius: 30px;
  font-size: 0.65rem;
  width: 70vw;
  font-size: 0.65rem;
  transition: all 0.3s ease-out;
  & > .label-title {
    border: 1px solid var(--color-light);
    color: var(--color-light);
    box-shadow: 0 2px 2px rgba(120, 120, 120, 0.25);
    padding: 0.25em 0.5em;
    background-color: var(--bgInput);
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    position: relative;
    border-radius: 4px;
    translate: 10px -10px;
    transition: all 0.5s ease-out 0.5s;
    z-index: 10;
    width: max-content;
  }
  &:focus .input,
  &:focus-within .input {
    background-color: var(--bgInput);
    padding: 1em;
    color: var(--color-light);
    border: 2px solid var(--color-light);
    outline: 2px solid var(--color-light);
    outline-offset: -2px;
    border-radius: 12px;
    box-shadow: 0 5px 10px rgba(98, 0, 255, 0.25),
      0 -5px 20px rgba(98, 0, 255, 0.1);
    scale: 1.15;
    transition: all 0.5s cubic-bezier(0, 1.46, 1, 1.62) 0.3s;
  }
  &:focus,
  &:focus-within .label-title {
    translate: 10px -20px;
    border-radius: 4px 4px 0 0;
    z-index: 0;
    transition: all 0.3s cusbic-bezier(0, 1.46, 1, 1.62);
  }
  & > .input {
    appearance: none;
    border: 1px solid var(--color-light);
    border-radius: 10px;
    background-color: #fdfdfd00;
    caret-color: var(--color-light);
    min-width: 200px;
    padding: 1em 1em 0.5em;
    outline: 0px solid var(--color-light);
    grid-column: 1/-1;
    grid-row: 1 / -1;
    position: relative;
    transition: all 0.3s cubic-bezier(0.5, 0.6, 0.5, 0.62);
    z-index: 0;
    &::placeholder {
      color: var(--color-light-a);
    }
  }
`;
const SignupBox = styled(LoginBox)`
  background-color: #ffffff5e;
  height: max-content;
  width: fit-content;
  display: flex;
  background: #fdfdfd97;
  align-items: center;
  justify-content: center;
`;
const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const MyDict = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 0.5rem;
  justify-content: center;
  &:focus {
    outline: 0;
    border-color: #2260ff;
    box-shadow: 0 0 0 4px #b5c9fc;
  }
  & > div {
    display: flex;
  }
`;

const GenderInput = styled.input.attrs({ type: "radio" })`
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:checked + span {
    box-shadow: 0 0 0 0.0625em #0043ed;
    background-color: #dee7ff;
    z-index: 1;
    color: #0043ed;
  }
`;

const GenderLabel = styled.label`
  span {
    display: block;
    cursor: pointer;
    background-color: #fff;
    padding: 0.375em 0.75em;
    position: relative;
    margin-left: 0.0625em;
    box-shadow: 0 0 0 0.0625em #b5bfd9;
    letter-spacing: 0.05em;
    color: #3e4963;
    text-align: center;
    transition: background-color 0.5s ease;

    &.Women {
      border-radius: 0.375em 0 0 0.375em;
    }

    &.Divided {
      border-radius: 0 0.375em 0.375em 0;
    }
  }
`;
const SelectStyle = styled(LabelStyle)``;

const SendBtn = styled.button`
  border: none;
  background-color: rgb(164, 179, 255);
  border-radius: 0.3em;
  font-size: 1em;
  width: auto;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  margin: 3%;
  color: #fff;
  font-weight: 500;
  transition: all ease-in-out 0.2s;
  &:hover {
    background-color: #3052ff;
  }
`;
const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
`;
