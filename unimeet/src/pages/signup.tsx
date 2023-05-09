import styled from "styled-components"
import { LoginBox } from "./MainLogin";


export default function Signup(){
  return(
    <MainBox>
      <SignupBox></SignupBox>
    </MainBox>
  )
}

const SignupBox = styled(LoginBox)`
background-color: #ffffff5e;

`;
const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;