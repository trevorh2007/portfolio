"use client";

import styled from "styled-components";
import TimerComponent from "./CountdownTimer";
import { useState } from "react";

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;

  input {
    height: 50px;
    font-size: 36px;
  }

  button {
    background-color: #e3e3e3;
    margin-left: 25px;
    height: 50px;
    width: 150px;
  }
`;

const Timer = () => {
  const [userTime, setUserTime] = useState<Date>(new Date());
  const [resetTimer, setResetTimer] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const userDate = new Date();
    userDate.setSeconds(
      userDate.getSeconds() + parseInt(event.currentTarget.value)
    );
    setUserTime(userDate);
  };

  return (
    <TimerWrapper>
      {!resetTimer ? <input onChange={(e) => handleChange(e)} /> : <></>}
      {resetTimer ? (
        <TimerComponent userTime={userTime} setResetTimer={setResetTimer} />
      ) : (
        <div></div>
      )}
      {!resetTimer ? (
        <button onClick={() => setResetTimer(true)}>Start Timer</button>
      ) : (
        <></>
      )}
    </TimerWrapper>
  );
};

export default Timer;
