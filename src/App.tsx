import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import TimerOOP, { TimerProps } from "./components/TimerOOP";
import TopMenu from "./components/TopMenu";

function App() {
  const [allTimers, setAllTimers] = useState<TimerProps[]>([]);
  const [timer, setTimer] = useState<TimerProps>({
    timerName: "",
    timerType: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTimer((prevTimer) => ({
      ...prevTimer,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (timer.timerName && timer.timerType) {
      setAllTimers((prevAllTimers) => [...prevAllTimers, timer]);
      setTimer({ timerName: "", timerType: "" });
    }
  };
  return (
    <main>
      <TopMenu />
      <div>
        {allTimers.map((item, index) => (
          <TimerOOP
            key={index}
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
          value={timer.timerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="timerType"
          placeholder="Timer Type"
          value={timer.timerType}
          onChange={handleChange}
          required
        />
        <button type="submit">create a timer</button>
      </form>
    </main>
  );
}

export default App;
