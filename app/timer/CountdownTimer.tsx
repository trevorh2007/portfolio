"use client";

import React, { FC } from "react";
import { useTimer } from "react-timer-hook";

const TimerComponent: FC<TimerProps> = (props): JSX.Element => {
  const { seconds, minutes, hours, days, pause, resume } = useTimer({
    autoStart: true,
    expiryTimestamp: props.userTime,
    onExpire: () => {
      // Modern alternative to alert - could be replaced with a toast or modal
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("Timer is up!");
      }
      // Or use a proper notification system
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl font-bold mb-6">
        {days !== 0 ? `${days.toString().padStart(2, "0")}h ` : ""}
        {hours !== 0 ? `${hours.toString().padStart(2, "0")}h ` : ""}
        {minutes !== 0 ? `${minutes.toString().padStart(2, "0")}m ` : ""}
        {seconds} seconds remaining
      </h1>
      <div className="flex gap-4 w-full justify-center items-center">
        <button
          onClick={() => pause()}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          Pause Timer
        </button>
        <button
          onClick={() => resume()}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          Resume Timer
        </button>
        <button
          onClick={() => props.setResetTimer(false)}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
};

interface TimerProps {
  userTime: Date;
  setResetTimer: React.Dispatch<React.SetStateAction<boolean>>;
}

export default TimerComponent;
