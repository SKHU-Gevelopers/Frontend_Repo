import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  background-image: linear-gradient(45deg, #ffffffa1, #a0d3ffa8);
  border-radius: 2.5em;
  padding: 30px;
  width: 94%;
  height: 90vh;
  position: relative; /* Required for ::before pseudo-element */
`;


const Input = styled.input`
  width: calc(100% - 10px);
  padding: 8px;
  margin-bottom: 4%;
  border: 1px solid #66da4300;
  border-bottom: 1px solid white;
  outline: none;
  background-color: transparent;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.2s;
  font-size: 1em;

  &:focus {
    border: 1px solid #66da4300;
    border-bottom: 1px solid #0400ff;
    background-color: transparent;
    color: white;
  }

  &::placeholder {
    color: #9b725b;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  background: #b600ff94;
  color: white;
  padding: 0.7em 5.5em;
  display: flex;
  align-items: center;
  border: 2px solid #66da4300;
  border-radius: 5em;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border: 2px solid #a200ff;
    background: #00000000;
    color: #a200ff;
  }

  &:active {
    border: 2px solid #66da4300;
    background: #a200ff;
    color: black;
  }
`;

const signup = () => {
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailVrfCode, setEmailVrfCode] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mbti, setMbti] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [major, setMajor] = React.useState("");

  return (
    <>
      <Global styles={globalStyles} />
      <div className="body">
        <FormContainer className="form">
          <Input type="text" placeholder="이름을 적어주세요" />
          <Input type="text" placeholder="닉네임을 적어주세요" />
          <Input type="email" placeholder="이메일을 적어주세요" />
          <Input type="password" placeholder="비밀번호를 적어주세요" />
          <Input type="password" placeholder="비밀번호를 적어주세요" />
          <Input type="text" placeholder="성별을 선택해주세오" />
          <Input type="text" placeholder="mbti를 선택해주세요" />
          <Input type="text" placeholder="E-Mail I.D." />
          <center>
            <Button>Submit</Button>
          </center>
        </FormContainer>
      </div>
    </>
  );
};

export default signup;
