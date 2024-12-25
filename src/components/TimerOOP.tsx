import React, { Component } from "react";

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isPaused: boolean;
}

interface TimerProps {
  timerName?: string;
  timerType?: string;
}

class TimerOOP extends Component<TimerProps, TimerState> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPaused: false,
    };
  }

  componentDidMount(): void {
    this.startTimer();
  }

  startTimer = (): void => {
    if (this.interval) return; // Prevent multiple intervals
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.isPaused === true) return prevState; // Skip update if paused

        let { hours, minutes, seconds } = prevState;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
        }

        return { ...prevState, hours, minutes, seconds }; // Spread prevState to keep isPaused intact
      });
    }, 1000);
  };

  pauseTimer = (): void => {
    this.setState({ isPaused: true });
  };

  unpauseTimer = (): void => {
    this.setState({ isPaused: false });
  };

  resetTimer = (): void => {
    this.pauseTimer();
    this.setState({ hours: 0, minutes: 0, seconds: 0 });
    this.startTimer();
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
            {this.state.isPaused ? "Continue" : "Pause"}
          </button>
          <button className="bg-red-500" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default TimerOOP;
