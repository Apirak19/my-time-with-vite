import React, { createContext, useContext, useState, ReactNode } from "react";
import TimerOOP, { TimerProps } from "../components/TimerOOP";

interface TimerArray {
  items: TimerProps[];
  addTimer: (timer: { timerName: string; timerType: string }) => void;
  removeTimer: (id: number) => void;
}

const ContextA = createContext<TimerArray | undefined>(undefined);

const ContextAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <ContextA.Provider value={{ items, addTimer, removeTimer }}>
      {children}
    </ContextA.Provider>
  );
};

const useContextA = () => {
  const context = useContext(ContextA);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export { ContextAProvider, useContextA };
