import styled from "styled-components";

export const ButtonStyle = styled.button`
  width: fit-content;
  margin: 10px 0 0 10px;
  padding: 7px 20px;
  border-radius: 50px;
  border: none;
  background-color: #674ff4;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
  color: #fff9ed;

  &:hover {
    box-shadow: 0px 3px 10px #312576;
    transform: translateY(-3px);
    transition: all 1s;
  }
`;
export const ImageCoordinate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;

export const InputDiv = styled.textarea`
  font-size: 1.3em;
  font-family: monospace;
  width: 96%;
  height: 20vh;
  outline: none;
  border: 1px solid #674ff4;
  padding: 12px;
  margin: 20px 4px 0px 4px;
  background-color: #faebd700;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background-color: #e1c9ff;
  border-radius: 10px;
  &:focus {
    box-shadow: 0 2px 4px #312576;
    background-color: #c0b5ff42;
    transform: translateY(-1px);
    transition: all 1s;
  }
`;
export const FindImage = styled.div`
  width: 150px;
  height: 30px;
  background: #674ff4;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;
