import React, { useState, useEffect } from "react";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds < 59) {
          return prevSeconds + 1;
        } else {
          setMinutes((prevMinutes) => {
            if (prevMinutes < 59) {
              return prevMinutes + 1;
            } else {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
          });
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer w-full flex flex-col gap-10 justify-center items-center">
      {/* timer name */}
        <div>
           <h1>Timer's Name</h1>
      </div>
      {/* time display */}
      <div className="time-display flex justify-center items-center">
        <h1 className="hour-digit text-5xl font-bold">
          {hours < 10 ? "0" + hours : hours}
        </h1>
        <h1 className="text-5xl font-bold">:</h1>
        <h1 className="minute-digit text-5xl font-bold">
          {minutes < 10 ? "0" + minutes : minutes}
        </h1>
        <h1 className="text-5xl font-bold">:</h1>
        <h1 className="second-digit text-5xl font-bold">
          {seconds < 10 ? "0" + seconds : seconds}
        </h1>
      </div>

      {/* buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setHours((prevHours) => prevHours + 1);
          }}
        >
          increase hours
        </button>

        <button
          onClick={() => {
            setMinutes((prevMinutes) => prevMinutes + 1);
          }}
        >
          increase minutes
        </button>

        <button
          onClick={() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
          }}
        >
          increase seconds
        </button>
        <button
          className="bg-red-500"
          onClick={() => {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
