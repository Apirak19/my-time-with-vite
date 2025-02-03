import { useState, useRef } from "react";
import { TimerState } from "../types/TimerTypes";

const useTimer = () => {
  const [state, setState] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    elapsedBeforePause: 0,
    startTime: 0,
    isPaused: true,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    const timeStart = Date.now() - (state.elapsedBeforePause || 0);
    setState((prevState) => ({
      ...prevState,
      startTime: timeStart,
      isPaused: false,
    }));

    intervalRef.current = setInterval(() => {
      setState((prevState) => {
        if (prevState.isPaused) return prevState;

        const elapsed = Date.now() - prevState.startTime;

        return {
          ...prevState,
          hours: Math.floor(elapsed / (1000 * 60 * 60)),
          minutes: Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((elapsed % (1000 * 60)) / 1000),
          milliseconds: elapsed % 1000,
        };
      });
    }, 50);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      setState((prevState) => ({
        ...prevState,
        isPaused: true,
        elapsedBeforePause: Date.now() - prevState.startTime,
      }));
    }
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      isPaused: true,
      elapsedBeforePause: 0,
      startTime: 0,
    });
  };

  return { state, startTimer, pauseTimer, resetTimer };
};

export default useTimer;
