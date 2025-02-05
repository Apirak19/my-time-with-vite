import React, { createContext, useContext, ReactNode } from "react";
import { TimerArray } from "../types/TimerTypes";
import useTimerState from "../hooks/useTimerState";

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
