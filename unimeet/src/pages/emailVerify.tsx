import styled from "@emotion/react";

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
`;

const LogoContainer = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormGroupLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const FormGroupInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  padding: 10px;
`;

const FormSubmitBtn = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0069d9;
  }
`;

const SignupLink = styled.a`
  align-self: center;
  font-weight: 500;
  width: auto;
`;

const SignupLinkText = styled.span`
  font-weight: 400;
`;

export default function emailVerify() {
  return (
    <Body className="body">
      <FormContainer className="form-container">
        <LogoContainer className="logo-container">
          비밀번호 재발급하기
        </LogoContainer>

        <Form className="form">
          <FormGroup className="form-group">
            <FormGroupLabel htmlFor="email">Email</FormGroupLabel>
            <FormGroupInput
              type="text"
              id="email"
              name="email"
              placeholder="이메일을 작성해주세요"
            />
          </FormGroup>

          <FormSubmitBtn type="submit" className="form-submit-btn">
            새로운 비밀번호 요청
          </FormSubmitBtn>
        </Form>

        <SignupLink className="signup-link">
          계정이 없으신가요?
          <SignupLinkText>회원가입</SignupLinkText>
        </SignupLink>
      </FormContainer>
    </Body>
  );
}
