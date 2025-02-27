import React from "react";

export interface WorkStatsProps {
  cardName: string;
  totalDuration: number;
  percentage?: number;
}

class DashboardTotalTimeCard extends React.Component<WorkStatsProps> {
  render() {
    const CircularProgress = ({ percentage }: { percentage: number }) => {
      const radius = 40; // Radius of the circle
      const circumference = 2 * Math.PI * radius; // Full circle length
      const offset = circumference - (circumference * percentage) / 100; // Adjusted stroke length

      return (
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background Circle (Full Gray Border) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(67, 93, 120)"
            strokeWidth="10"
            fill="#dddddd"
          />

          {/* Progress Circle (Dynamic Border Length) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(34, 111, 189)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference} // Total length of the circle
            strokeDashoffset={offset} // Adjusted stroke length based on percentage
            // strokeLinecap="round"
            transform="rotate(-90 50 50)" // Rotates to start from the top
          />

          {/* Centered Percentage Text */}
          <text x="50" y="55" fontSize="18" textAnchor="middle" fill="black">
            {percentage}%
          </text>
        </svg>
      );
    };

    const { cardName, totalDuration, percentage = 50 } = this.props;
    return (
      <article className="bg-slate-600 rounded-md px-4 py-3">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col">
            <h4 className="text-start text-lg text-slate-300">{cardName}</h4>
            <h3 className="font-semibold text-lg text-start">
              {totalDuration}
            </h3>
            <h4 className="text-start text-slate-300">hours</h4>
          </div>

          <CircularProgress percentage={percentage} />
        </div>
      </article>
    );
  }
}

export default DashboardTotalTimeCard;
