import React, { Component } from "react";

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  isPaused: boolean;
}

export interface TimerProps {
  id: number;
  timerName?: string;
  timerType?: string;
  prevTime?: number;
}

class TimerOOP extends Component<TimerProps, TimerState> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      isPaused: true,
    };
  }

  // componentDidMount(): void {
  //   this.startTimer();
  // }

  // startTimer = (): void => {
  //   if (this.interval) return; // Prevent multiple intervals
  //   this.setState({ isPaused: false });
  //   this.interval = setInterval(() => {
  //     this.setState((prevState) => {
  //       if (prevState.isPaused === true) return prevState; // Skip update if paused

  //       let { hours, minutes, seconds, milliseconds } = prevState;
  //       milliseconds++;
  //       if (milliseconds === 1000) {
  //         milliseconds = 0;
  //         seconds++;
  //       }
  //       if (seconds === 60) {
  //         seconds = 0;
  //         minutes++;
  //         if (minutes === 60) {
  //           minutes = 0;
  //           hours++;
  //         }
  //       }

  //       return { ...prevState, hours, minutes, seconds, milliseconds }; // Spread prevState to keep isPaused intact
  //     });
  //   }, 1);
  // };

  startTimer = (): void => {
    if (this.interval) return;
  
    const startTime = Date.now(); // Record the start time
    this.setState({ isPaused: false });
  
    this.interval = setInterval(() => {
      if (this.state.isPaused) return;
  
      this.setState((prevState) => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        const milliseconds = elapsed % 1000;
  
        return { ...prevState, hours, minutes, seconds, milliseconds };
      });
    }, 50); // Adjust the interval to a manageable precision, e.g., 50ms
  };

  pauseTimer = (): void => {
    this.setState({ isPaused: true });
  };

  unpauseTimer = (): void => {
    if (!this.interval) {
      this.startTimer();
    } else {
      this.setState({ isPaused: false });
    }
  };

  resetTimer = (): void => {
    this.pauseTimer();
    this.setState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    // this.startTimer();
  };

  increaseHours = (): void => {
    this.setState((prevState) => ({
      hours: prevState.hours + 1,
    }));
  };

  increaseMinutes = (): void => {
    this.setState((prevState) => ({
      minutes: (prevState.minutes + 1) % 60,
    }));
  };

  increaseSeconds = (): void => {
    this.setState((prevState) => ({
      seconds: (prevState.seconds + 1) % 60,
    }));
  };

  render(): JSX.Element {
    const { hours, minutes, seconds } = this.state;

    return (
      <div className="timer w-[300px] flex flex-col gap-10 p-10 justify-center items-center border-4 rounded-3xl">
        {/* Timer name */}
        <div>
          <h1>{this.props.timerName || "Noname"}</h1>
          <h2>{this.props.timerType || "NoTimerType"}</h2>
        </div>
        {/* Time display */}
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
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-blue-400"
            onClick={this.state.isPaused ? this.unpauseTimer : this.pauseTimer}
          >
            {this.state.isPaused
              ? this.state.milliseconds !== 0
                ? "continue"
                : "start"
              : "Pause"}
          </button>
          <button
            className={`${
              this.state.seconds === 0 && this.state.milliseconds === 0
                ? "bg-slate-800"
                : "bg-red-500"
            }`}
            onClick={this.resetTimer}
            disabled={this.state.milliseconds === 0}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default TimerOOP;
