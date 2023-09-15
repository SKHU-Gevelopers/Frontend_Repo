import { mbtilist } from "@/constants/mbtilist";
import { skhuDepartmentList, skhuMajor } from "@/constants/department";
import styled from "styled-components";
import { LoginBox } from "./mainLogin";
import BubbleGround from "@/components/BubbleGround";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { authenticationRequest } from "@/util/signUtil";

interface DepartmentType {
  id: number;
  department: string;
  requestText: string;
}
interface MajorsType {
  id: number;
  majors: string;
  requestText: string;
}

export default function Signup(this: any) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailVrfCode, setEmailVrfCode] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [mbti, setMbti] = useState("");
  const [department, setDepartment] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [departmentNum, setDepartmentNum] = useState(0);
  const [majors, setMajors] = useState(["", ""]);

  const handleOptionChange = (event: any) => {
    setGender(event.target.value);
  };

  const skhuMajors: MajorsType[] = skhuMajor.flat().map((major) => ({
    id: major.id,
    majors: major.majors,
    requestText: major.requestText,
  }));

  useEffect(() => {
    console.log(email),console.log(username)
  }, [email]);
  
  const emailFix = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
    const username = email.match(/^(.+)@[^@]+$/i)?.[1];
    setUsername(username || "");
  };

  const handleSendBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 동작 막기
    authenticationRequest(email, username)
      .then(() => {
        alert("인증번호가 전송되었습니다.");
      })
      .catch((err) => {
        alert(err.message);
        console.log(email, username); 
      });
  };

  async function SignupSubmit(e: any) {
    e.preventDefault();
    const data = {
      name: name,
      nickname: nickname,
      email: email,
      password: password,
      emailVrfCode: emailVrfCode,
      kakaoId,
      gender: gender,
      mbti: mbti,
      department: department,
      majors: majors,
    };

    try {
      const response = await fetch(
        "https://unimeet.duckdns.org/users/sign-up",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // 요청이 성공한 경우 추가로직 처리
        console.log("회원가입 성공!");
      } else {
        // 요청이 실패한 경우 처리
        console.error("회원가입 실패!");
        console.log(data);
      }
    } catch (error) {
      console.error("오류가 발생했습니다.", error);
    }
  }

  return (
    <MainBox>
      <BubbleGround />
      <SignupBox>
        <EmailForm onSubmit={handleSendBtnClick} >
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">이메일</span>
            <input
              id="myInput"
              className="input"
              value={email}
              onChange={emailFix}
              placeholder="이메일을 입력해주세요"
              type="text"
            />
          </LabelStyle>
          <SendBtn onClick={()=>handleSendBtnClick}>인증 요청</SendBtn>
        </EmailForm>
        <form method="post" onSubmit={SignupSubmit}>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">인증 번호</span>
            <input
              id="myInput"
              className="input"
              value={emailVrfCode}
              onChange={(e) => setEmailVrfCode(e.target.value)}
              placeholder="인증번호를 입력해주세요"
              type="type"
            />
          </LabelStyle>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">카카오톡 아이디</span>
            <input
              id="myInput"
              className="input"
              value={name}
              onChange={(e) => setKakaoId(e.target.value)}
              placeholder="카카오 아이디를 입력하세요"
              type="text"
            />
          </LabelStyle>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">이름</span>
            <input
              id="myInput"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              type="text"
            />
          </LabelStyle>
          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">닉네임</span>
            <input
              id="myInput"
              className="input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              type="text"
            />
          </LabelStyle>

          <LabelStyle htmlFor="myInput" className="label">
            <span className="label-title">비밀번호</span>
            <input
              id="myInput"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              type="password"
            />
          </LabelStyle>
          <MyDict className="mydict">
            <div>
              <GenderLabel>
                <GenderInput
                  type="radio"
                  name="radio"
                  value="FEMALE"
                  onChange={handleOptionChange}
                />
                <span className="Women">Women</span>
              </GenderLabel>
              <GenderLabel>
                <GenderInput
                  type="radio"
                  name="radio"
                  value="MALE"
                  onChange={handleOptionChange}
                />
                <span className="Men">Men</span>
              </GenderLabel>
              <GenderLabel>
                <GenderInput
                  type="radio"
                  name="radio"
                  value="NONE"
                  onChange={handleOptionChange}
                />
                <span className="Divided">Divided</span>
              </GenderLabel>
            </div>
          </MyDict>
          <SelectStyle>
            <span className="label-title">mbti</span>
            <select
              className="input"
              value={mbti}
              defaultValue={mbtilist[0].mbti}
              onChange={(e) => setMbti(e.target.value)}
            >
              {mbtilist.map((mbtis) => (
                <option key={mbtis.mbti} value={mbtis.mbti}>
                  {mbtis.mbti}
                </option>
              ))}
            </select>
          </SelectStyle>
          <SelectStyle>
            <span className="label-title">소속 학부</span>
            <select
              className="input"
              value={departmentNum}
              defaultValue={skhuDepartmentList[0].id}
              onChange={(e) => {
                const selectedValue = Number(e.target.value);
                const defaultDepartment = skhuDepartmentList[0].requestText;
                const selectedDepartment: string =
                  selectedValue === 0
                    ? defaultDepartment
                    : skhuDepartmentList.find(
                        (dept: DepartmentType) => dept.id === selectedValue
                      )?.requestText || defaultDepartment;
                const selectedMajors: string[] = [
                  majors[0] || skhuMajor[selectedValue][0].majors,
                  majors[1] || skhuMajor[selectedValue][0].majors,
                ];
                setDepartment(selectedDepartment);
                setDepartmentNum(Number(selectedValue));
                setMajors(selectedMajors);
              }}
            >
              {skhuDepartmentList.map((departments) => (
                <option key={departments.department} value={departments.id}>
                  {departments.department}
                </option>
              ))}
            </select>
          </SelectStyle>
          <SelectStyle>
            <span className="label-title">소속 학과 1</span>
            <select
              className="input"
              value={majors[0]}
              defaultValue={
                majors[0] || skhuMajor[departmentNum][0].requestText
              }
              onChange={(e) => {
                const selectedMajor = e.target.value;
                const updatedMajors = [...majors];
                updatedMajors[0] = selectedMajor;
                setMajors(updatedMajors);
              }}
            >
              {skhuMajor[departmentNum].map((major) => (
                <option key={major.id} value={major.requestText}>
                  {major.majors}
                </option>
              ))}
            </select>
          </SelectStyle>

          <SelectStyle>
            <span className="label-title">소속 학과 2</span>
            <select
              className="input"
              value={majors[1]}
              defaultValue={majors[1] || skhuMajor[departmentNum][0].majors}
              onChange={(e) => {
                const selectedMajor = e.target.value;
                const updatedMajors = [...majors];
                updatedMajors[1] = selectedMajor;
                setMajors(updatedMajors);
              }}
            >
              {skhuMajors.map((major) => (
                <option key={major?.majors} value={major.requestText}>
                  {major?.majors}
                </option>
              ))}
            </select>
          </SelectStyle>

          <SignBtn>Sign up to Unimeet</SignBtn>
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
  margin-top: 1rem;
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
  border-radius: 20px;
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
export const SelectStyle = styled(LabelStyle)``;

const SendBtn = styled.button`
  border: none;
  background-color: rgb(164, 179, 255);
  border-radius: 0.3em;
  font-size: 1em;
  width: -webkit-fill-available;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  margin: 2%;
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

const SignBtn = styled(SendBtn)`
  width: -webkit-fill-available;
`;
