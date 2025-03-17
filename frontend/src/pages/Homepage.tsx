import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextA } from "../context/ContextA";
import TimerOOP from "../components/TimerOOP";
import { TimerProps } from "../types/TimerTypes";
import { DashboardTotalTimeCardType } from "../types/DashboardTotalTimeCardType";
import DashboardTotalTimeCard, {
  WorkStatsProps,
} from "../classes/DashboardTotalTimeCard";

interface MostTimeSpentTask {
  name: string;
  durationHours: number;
}

export default function HomePage() {
  const { items } = useContextA();
  const navigate = useNavigate();
  // fetched timers
  const [timers, setTimers] = useState<TimerProps[]>([]);
  const [mostTimeSpentTasks, setMostTimeSpentTasks] = useState<MostTimeSpentTask[]>([]);
  const [dashboardTotalTimeCard, setDashboardTotalTimeCard] = useState<
    DashboardTotalTimeCardType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        fetch("http://localhost:3000/getStat")
          .then((response) => response.json())
          .then((data) => {
            const mostTimeSpentTasks = data.mostSpend.map((item: any) => ({
              name: item.timerName,
              durationHours: item.durationHours,
            }));
            setMostTimeSpentTasks(mostTimeSpentTasks);

            console.log(mostTimeSpentTasks);

            const totalTime = data.totalByTimerType.reduce(
              (prev: any, cur: any) => {
                return prev + Number(cur.totalDuration.$numberDecimal);
              },
              0
            );

            const formattedResult = data.totalByTimerType.map((item: any) => ({
              cardName: item.timerType,
              duration: Number(item.totalDuration.$numberDecimal),
              percentage: Math.round(
                (Number(item.totalDuration.$numberDecimal) / totalTime) * 100
              ),
            }));
            console.log("Fetched Data:", formattedResult);
            setDashboardTotalTimeCard(formattedResult);
          })
          .catch((error) => console.error("error: ", error));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStat();
  }, []);

  return (
    <main className="flex flex-col items-center h-screen gap-4">
      {loading ? (
        <div className="text-xl font-semibold mt-10">Loading...</div>
      ) : error ? (
        <div className="text-red-500 font-semibold mt-10">Error: {error}</div>
      ) : (
        <>
          {/* TotalReport */}
          <h2 className="text-2xl">What have you done?</h2>
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap w-full max-w-[90vw] p-2">
            {dashboardTotalTimeCard.map((item, index) => (
              <DashboardTotalTimeCard
                key={index}
                cardName={item.cardName}
                totalDuration={item.duration}
                percentage={item.percentage}
              />
            ))}
          </div>

          {/* mostTimeSpend */}
          <h2 className="text-2xl">What you spend doing the most?</h2>
          <div className="flex flex-col gap-4 overflow-y-scroll whitespace-nowrap max-h-[400px] w-full max-w-[500px] p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {/* Map over mostTimeSpendings */}
            {mostTimeSpentTasks.map((timer, index) => (
              <div
                key={index}
                className="flex gap-2 justify-center items-center bg-slate-600 rounded-md px-4 py-3"
              >
                <p className="text-xl">{timer.name}</p>
                <p className="text-3xl">{timer.durationHours}</p>
                <p className="text-3xl">hours</p>
                <p className="text-3xl">hours</p>
              </div>
            ))}
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
        </>
      )}
    </main>
  );
}
