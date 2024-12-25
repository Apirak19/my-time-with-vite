import { useState } from "react";
import "./App.css";
import TimerOOP from "./components/TimerOOP";

function App() {
  return (
    <>
      <main>
        <TimerOOP timerName="NameA" timerType="normal" />
        <form onSubmit={() => {}}>
          <input type="text" />
          <input type="text" />
          <button type="submit">create a timer</button>
        </form>
      </main>
    </>
  );
}

export default App;
