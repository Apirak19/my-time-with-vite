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
  created_at: string;
}

export default function HomePage() {
  const { items } = useContextA();
  const navigate = useNavigate();
  // fetched timers
  const [timers, setTimers] = useState<TimerProps[]>([]);
  const [mostTimeSpentTasks, setMostTimeSpentTasks] = useState<
    MostTimeSpentTask[]
  >([]);
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
            console.log(data.mostSpend);

            const mostTimeSpentTasks = data.mostSpend.map((item: any) => {
              const utcDate = new Date(item.created_at);
              const bangkokDate = new Date(
                utcDate.getDate() + 7 * 60 * 60 * 1000
              );
              const options: Intl.DateTimeFormatOptions = {
                // weekday: "long",
                year: "numeric", // Full year (e.g., 2025)
                month: "short", // Full month name (e.g., February)
                day: "numeric", // Day of the month (e.g., 5)
                hour: "2-digit", // Hour (e.g., 5)
                minute: "2-digit", // Minute (e.g., 30)
                second: "2-digit", // Second (e.g., 45)
                timeZoneName: "short", // Timezone abbreviation (e.g., GMT+7)
                timeZone: "Asia/Bangkok", // Set Bangkok as the timezone
              };
              const formattedBangkokDate = bangkokDate.toLocaleString(
                "en-TH",
                options
              );
              return {
                name: item.timerName,
                durationHours: item.durationHours,
                created_at: formattedBangkokDate,
              };
            });
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
    <main className="flex flex-col items-center gap-4">
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
          <h2 className="text-2xl mt-10">What you spend doing the most?</h2>
          <div className="flex flex-col gap-4 overflow-y-scroll whitespace-nowrap max-h-[400px] w-full max-w-[500px] p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {/* Map over mostTimeSpendings */}
            {mostTimeSpentTasks.map((timer, index) => (
              <div
                key={index}
                className="w-full flex py-0 gap-2 justify-center bg-slate-600 rounded-md"
              >
                <div className="w-3/4 flex flex-col gap-2 py-4 justify-center items-center bg-slate-600 rounded-md px-4 ">
                  <p className="text-xl">{timer.name}</p>
                  {timer.created_at}
                </div>

                <div className="w-1/4 flex bg-white text-slate-800 px-2 justify-center items-center">
                  <p className="text-3xl font-bold">{timer.durationHours}</p>
                  <p className="text-2xl">&nbsp;hr</p>
                </div>
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
