import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  value: string;
  setValue: (newValue: string) => void;
}

const ContextA = createContext<ContextType | undefined>(undefined);

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
