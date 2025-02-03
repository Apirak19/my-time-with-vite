import React from "react";
import useTimer from "../hooks/useTimer";
import { TimerProps } from "../types/TimerTypes";

const TimerOOP: React.FC<TimerProps> = ({
  timerName = "Noname",
  timerType = "NoTimerType",
}) => {
  const { state, startTimer, pauseTimer, resetTimer } = useTimer();

  return (
    <div className="timer w-[300px] flex flex-col gap-10 p-10 justify-center items-center border-4 rounded-3xl">
      {/* Timer name */}
      <div>
        <h1>{timerName}</h1>
        <h2>{timerType}</h2>
      </div>

      {/* Time display */}
      <div className="time-display flex justify-center items-center">
        <h1 className="hour-digit text-5xl font-bold">
          {state.hours < 10 ? "0" + state.hours : state.hours}
        </h1>
        <h1 className="text-5xl font-bold">:</h1>
        <h1 className="minute-digit text-5xl font-bold">
          {state.minutes < 10 ? "0" + state.minutes : state.minutes}
        </h1>
        <h1 className="text-5xl font-bold">:</h1>
        <h1 className="second-digit text-5xl font-bold">
          {state.seconds < 10 ? "0" + state.seconds : state.seconds}
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        <button
          className="bg-blue-400 w-full"
          onClick={state.isPaused ? startTimer : pauseTimer}
        >
          {state.isPaused
            ? state.milliseconds !== 0
              ? "Continue"
              : "Start"
            : "Pause"}
        </button>
        <button
          className={`${
            state.seconds === 0 && state.milliseconds === 0
              ? "bg-slate-800"
              : "bg-red-500"
          } w-full py-2`}
          onClick={resetTimer}
          disabled={state.milliseconds === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerOOP;
