import { useState } from "react";
import { TimerProps } from "../types/TimerTypes";

const useTimerState = () => {
  const [items, setItems] = useState<TimerProps[]>([]);
  const [nextId, setNextId] = useState(1);

  const addTimer = (timer: { timerName: string; timerType: string }) => {
    const newTimer: TimerProps = {
      id: nextId,
      timerName: timer.timerName,
      timerType: timer.timerType,
    };

    setItems((prev) => [...prev, newTimer]);
    setNextId((prevId) => prevId + 1);
  };

  const removeTimer = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, addTimer, removeTimer };
};

export default useTimerState;
