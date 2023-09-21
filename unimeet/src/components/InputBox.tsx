import React, { useState } from "react";
import styled from "styled-components";

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChange,
  defaultValue,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <InputDiv
        type="text"
        value={inputValue}
        onChange={handleChange}
        required
      />
    </>
  );
};

const InputDiv = styled.input`
  font-family: monospace;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #674ff4;
  padding: 10px;
  background-color: #faebd700;
  transition: 0.3s;
  color: #5b5b5b;
  &:focus {
    box-shadow: 0 2px 4px #312576;
    background-color: #c0b5ff42;
    transform: translateY(-1px);
    transition: all 1s;
  }
`;

export default InputBox;
