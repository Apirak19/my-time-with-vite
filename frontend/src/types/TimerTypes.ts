export interface TimerState {
   hours: number;
   minutes: number;
   seconds: number;
   milliseconds: number;
   isPaused: boolean;
   elapsedBeforePause?: number;
   startTime: number;
 }
 
 export interface TimerProps {
   id: number;
   timerName?: string;
   timerType?: string;
   prevTime?: number;
 }
 
 export interface TimerArray {
  items: TimerProps[];
  addTimer: (timer: { timerName: string; timerType: string }) => void;
  removeTimer: (id: number) => void;
}