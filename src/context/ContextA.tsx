import React, { createContext, useContext, useState, ReactNode } from "react";
import TimerOOP, { TimerProps } from "../components/TimerOOP";

interface TimerArray {
  items: TimerOOP[];
  addTimer: (item: TimerOOP) => void;
  removeTimer: ()
}

const ContextA = createContext<TimerArray | undefined>(undefined);

const ContextAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState("hello");

  return (
    <ContextA.Provider value={{ value, setValue }}>
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

export default { ContextAProvider, useContextA };
