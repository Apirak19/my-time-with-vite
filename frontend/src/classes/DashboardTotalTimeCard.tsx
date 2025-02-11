import React from "react";

interface WorkStatsProps {
  timerType: string;
  hours: number;
  percentage: number;
}

class DashboardTotalTimeCard extends React.Component<WorkStatsProps> {
  render() {
    const { timerType, hours, percentage } = this.props;
    return (
      <article className="bg-slate-600 rounded-md px-4 py-3">
        <div className="flex gap-8 items-center">
          <div className="flex flex-col">
            <h4 className="text-start text-slate-300">{timerType}</h4>
            <h3 className="font-semibold text-2xl text-start">
              {hours} <span className="font-normal text-lg">hours</span>
            </h3>
          </div>
          <div className="text-lg w-12 h-12 p-6 border-4 flex items-center justify-center rounded-full">
            {percentage}%
          </div>
        </div>
      </article>
    );
  }
}

export default DashboardTotalTimeCard;
