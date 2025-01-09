import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import TimerOOP, { TimerProps } from "./components/TimerOOP";
import TopMenu from "./components/TopMenu";
import { useContextA } from "./context/ContextA";

function App() {
  const [timerName, setTimerName] = useState<string | undefined>(undefined);
  const [timerType, setTimerType] = useState<string | undefined>(undefined);
  const { items, addTimer, removeTimer } = useContextA();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (timerName && timerType) {
      addTimer({ timerName: timerName, timerType: timerType });
    }
  };
  return (
    <main>
      <TopMenu />
      <div className="flex flex-col place-items-center">
        {items.map((item, index) => (
          <TimerOOP
            key={index}
            id={item.id}
            timerName={item.timerName}
            timerType={item.timerType}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-400 p-4 rounded-lg"
      >
        <input
          type="text"
          name="timerName"
          placeholder="Timer Name"
          value={timerName}
          onChange={(e) => setTimerName(e.target.value)}
          required
        />
        <input
          type="text"
          name="timerType"
          placeholder="Timer Type"
          value={timerType}
          onChange={(e) => setTimerType(e.target.value)}
          required
        />
        <button type="submit">create a timer</button>
      </form>
    </main>
  );
}

export default App;
