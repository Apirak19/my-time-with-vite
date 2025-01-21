import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import TimerOOP, { TimerProps } from "./components/TimerOOP";
import TopMenu from "./components/TopMenu";
import { useContextA } from "./context/ContextA";

function App() {  
  const { items } = useContextA();
  return (
    <main>
      <TopMenu />
      <div className="flex flex-col place-items-center py-8 gap-8">
        {items.map((item, index) => (
          <TimerOOP
            key={index}
            id={item.id}
            timerName={item.timerName}
            timerType={item.timerType}
          />
        ))}
      </div>

      
    </main>
  );
}

export default App;
