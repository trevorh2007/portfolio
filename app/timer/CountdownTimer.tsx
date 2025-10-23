"use client";

import React, { FC } from "react";
import { useTimer } from "react-timer-hook";
import styled from "styled-components";

const TimerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const TimerComponent: FC<TimerProps> = (props): JSX.Element => {
  const { seconds, minutes, hours, days, pause, resume } = useTimer({
    autoStart: true,
    expiryTimestamp: props.userTime,
    onExpire: () => {
      // Modern alternative to alert - could be replaced with a toast or modal
      console.warn("Timer is up!");
      // Or use a proper notification system
    },
  });

  return (
    <TimerInfoWrapper>
      <h1>
        {days !== 0 ? `${days.toString().padStart(2, "0")}h ` : ""}
        {hours !== 0 ? `${hours.toString().padStart(2, "0")}h ` : ""}
        {minutes !== 0 ? `${minutes.toString().padStart(2, "0")}m ` : ""}
        {seconds} seconds remaining
      </h1>
      <ButtonGroup>
        <button onClick={() => pause()}>Pause Timer</button>
        <button onClick={() => resume()}>Resume Timer</button>
        <button onClick={() => props.setResetTimer(false)}>Reset Timer</button>
      </ButtonGroup>
    </TimerInfoWrapper>
  );
};

interface TimerProps {
  userTime: Date;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default TimerComponent;
