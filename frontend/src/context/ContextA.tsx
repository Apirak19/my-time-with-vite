import React, { createContext, useContext, ReactNode } from "react";
import { TimerProps } from "../components/TimerOOP";
import useTimerState from "../hooks/useTimerState";

interface TimerArray {
  items: TimerProps[];
  addTimer: (timer: { timerName: string; timerType: string }) => void;
  removeTimer: (id: number) => void;
}

const ContextA = createContext<TimerArray | undefined>(undefined);

const ContextAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { items, addTimer, removeTimer } = useTimerState();

  return (
    <ContextA.Provider value={{ items, addTimer, removeTimer }}>
      {children}
    </ContextA.Provider>
  );
};

const useContextA = () => {
  const context = useContext(ContextA);
  if (!context) {
    throw new Error("useContextA must be used within a ContextAProvider");
  }
  return context;
};

export { ContextAProvider, useContextA };
