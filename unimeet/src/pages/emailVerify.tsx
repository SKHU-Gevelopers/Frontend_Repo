import styled from "@emotion/styled";
import BubbleGround from "@/components/BubbleGround";
import { useState } from "react";
import { useRouter } from "next/router";
import { authenticationRequest } from "@/util/signUtil";

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 20rem;
  height: 25rem;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 16px #848484;
`;

const LogoContainer = styled.div`
  font-size: 24px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  width: 18rem;
  height: 3rem;
  border-radius: 30px;
  border: 0px;
  margin: 5% 0% 3% 0%;
  padding: 0px 1rem;
  background: white;
  display: flex;
  align-items: center;
  & > input {
    border: 0px;
    height: -webkit-max-content;
    height: -moz-max-content;
    height: 90%;
    width: 100%;
    padding: 0px 1rem;
    font-size: 1.1rem;
    outline: none;
    background-color: white;
  }
`;
const CodeGroup = styled(FormGroup)`
  width: 10rem;
  margin: 0;
  & > input {
    text-align: center;
  }
`;

const FormSubmitBtn = styled.button`
  border: none;
  color: #fff;
  background-image: linear-gradient(25deg, #c965ff, #6c70ffcf);
  border-radius: 20px;
  background-size: 100% auto;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.6em 1.5em;
  margin: 5% 0%;
  width: 100%;
  height: 2.5rem;

  &:hover {
    background-image: linear-gradient(25deg, #bd4afb, #4c52ffcf);
  }
`;
const CodeBtn = styled(FormSubmitBtn)`
  width: 7em;
  height: 3rem;
  border-radius: 30px;
  margin: 0;
`;
const CodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const SignupLink = styled.a`
  align-self: center;
  width: auto;
  color: black;
  text-decoration: none;
  padding: 4%;
  margin-top: 6%;
  &:hover {
    color: #6c70ffcf;
  }
`;

export default function emailVerify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  const EmailSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (router) {
      authenticationRequest(email)
        .then((res) => {
          alert("인증번호가 전송되었습니다.");
          console.log(res);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  
  return (
    <div>
      <BubbleGround />
      <Body className="body">
        <FormContainer className="form-container">
          <LogoContainer className="logo-container">
            Email 인증하기
          </LogoContainer>

          <Form className="form" onSubmit={EmailSend}>
            <FormGroup className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 작성해주세요"
              />
            </FormGroup>

            <FormSubmitBtn type="submit" className="form-submit-btn" onSubmit={EmailSend}>
              인증번호 요청
            </FormSubmitBtn>

            <CodeBox>
              <CodeGroup className="form-group">
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="인증번호"
                />
              </CodeGroup>
              <CodeBtn type="submit" className="form-submit-btn">
                인증확인
              </CodeBtn>
            </CodeBox>
          </Form>

          <SignupLink className="signup-link" href="/MainLogin">
            계정이 있으신가요? 로그인 하러가기
          </SignupLink>
        </FormContainer>
      </Body>
    </div>
  );
}
