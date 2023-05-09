import styled, { keyframes } from "styled-components";

export default function BubbleGround() {
  return (
    <>
      <Bubble />
      <Bubble2 />
      <Bubble3 />
      <Bubble4 />
      <Bubble5 />
    </>
  );
}

const floating1 = keyframes`
    0% {
        transform: translateY(0);    
    }
    50% {
      transform: scale3d(1.1, 1.05, 1);
    }
    100% {
        transform: translateY(0);
    }
`;
const floating2 = keyframes`
    0% {
        transform: translateX(0);    
    }
    50% {
      transform: translate(-15px, -10px);
    }
    100% {
        transform: translateX(0);
    }
`;
const floating3 = keyframes`
    0% {
        transform: translateY(2px);    
    }
    50% {
      transform: scale3d(1.1, 1.1, 1.1);
}
    
    100% {
        transform: translateY(2px);
    }
`;
const floating4 = keyframes`
    0% {
        transform: translateY(0);    
    }
    50% {
      transform: translate(-15px, 15px);
    }
    100% {
        transform: translateY(0);
    }
`;

const Bubble = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  background: radial-gradient(
    circle at 75% 30%,
    #ffffff3d 5px,
    #2300ff8a 8%,
    #00008b61 60%,
    #00ffff57 100%
  );
  box-shadow: inset 0 0 20px #ffffff8f, inset 10px 0 46px #d8d8d8bd,
    inset 88px 0px 60px #c2d8fea9, inset -20px -60px 100px #fde9ea91,
    inset 0 50px 140px #fde9ea3b, 0 0 3px #ffffffd6;
  position: fixed;
  top: 8rem;
  left: 2rem;
  animation: ${floating1} 6s infinite;
`;
const Bubble2 = styled(Bubble)`
  height: 100px;
  width: 100px;
  top: 3rem;
  left: 15rem;
  animation: ${floating2} 7s infinite;
  box-shadow: inset 0 0 20px #ffffffbf, inset 10px 0 46px #d8d8d8bd,
    inset 88px 0px 60px #0003ff70, inset -20px -30px 50px #fde9eaed,
    inset 0 50px 140px #ffced042, 0 0 4px #ffffffd6;
`;
const Bubble3 = styled(Bubble)`
  top: 28rem;
  left: 1rem;
  width: 230px;
  height: 230px;
  animation: ${floating4} 4s infinite;
  background: radial-gradient(
    circle at 75% 30%,
    #ffffff3d 15px,
    #dc00ff8a 13%,
    #8b008561 100%,
    #00ffff57 100%
  );
`;
const Bubble4 = styled(Bubble)`
  top: 44rem;
  left: 8rem;
  width: 7rem;
  animation: ${floating2} 5s infinite;
  box-shadow: inset 0 0 20px #ffffff8f, inset 10px 0 46px #d8d8d8bd,
    inset 100px 0px 60px #ff77f76e, inset 0px 0px 100px #fde9ea91,
    inset 0 50px 140px #fde9ea3b, 0 0 3px #ffffffd6;
  height: 7rem;
`;
const Bubble5 = styled(Bubble4)`
  top: 37rem;
  left: 15.5rem;
  width: 8rem;
  height: 8rem;
  animation: ${floating3} 5s infinite;
`;
