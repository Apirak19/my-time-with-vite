import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextA } from "../context/ContextA";
import TimerOOP from "../components/TimerOOP";
import { TimerProps } from "../types/TimerTypes";
import { DashboardTotalTimeCardType } from "../types/DashboardTotalTimeCardType";
import DashboardTotalTimeCard, {
  WorkStatsProps,
} from "../classes/DashboardTotalTimeCard";
// import {Das}
import { duration } from "@mui/material";

export default function HomePage() {
  const { items } = useContextA();
  const navigate = useNavigate();
  // fetched timers
  const [timers, setTimers] = useState<TimerProps[]>([]);
  const [dashboardTotalTimeCard, setDashboardTotalTimeCard] = useState<
    WorkStatsProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTimers = async () => {
      try {
        fetch("http://localhost:3000/getTimer")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched Data:", data.result);
            setDashboardTotalTimeCard(data.result);
          })
          .catch((error) => console.error("error: ", error));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimers();
  }, []);
  return (
    <main className="flex flex-col items-center h-screen gap-4">
      <h2 className="text-2xl">What have you done?</h2>
      <div className="flex gap-4">
        {dashboardTotalTimeCard.map((item, index) => (
          <DashboardTotalTimeCard
            key={index}
            cardName={item.cardName}
            totalDuration={item.totalDuration}
          />
        ))}
        {/* <article className="bg-slate-600 rounded-md px-4 py-3">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col ">
              <h4 className="text-start text-slate-300">Working</h4>
              <h3 className="font-semibold text-2xl text-start">
                54 <span className="font-normal text-lg">hours</span>
              </h3>
            </div>

            <div className="text-lg w-12 h-12 p-6 border-4 flex items-center justify-center rounded-full">
              50%
            </div>
          </div>
        </article>
        <article className="bg-slate-600 rounded-md px-4 py-3">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col ">
              <h4 className="text-start text-slate-300">Working</h4>
              <h3 className="font-semibold text-2xl text-start">
                54 <span className="font-normal text-lg">hours</span>
              </h3>
            </div>

            <div className="text-lg w-12 h-12 p-6 border-4 flex items-center justify-center rounded-full">
              50%
            </div>
          </div>
        </article> */}
      </div>

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
