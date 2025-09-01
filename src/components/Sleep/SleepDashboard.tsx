import React from 'react';
import { SleepData } from '../../types/health';
import { SleepChart } from './SleepChart';
import { SleepStages } from './SleepStages';
import { SleepInsights } from './SleepInsights';

interface SleepDashboardProps {
  data: SleepData[];
}

export const SleepDashboard: React.FC<SleepDashboardProps> = ({ data }) => {
  const todayData = data[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sleep</h1>
        <p className="text-gray-600">Monitor your sleep quality and patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SleepChart data={data} />
        </div>
        <div>
          <SleepStages data={todayData} />
        </div>
      </div>

      <SleepInsights data={todayData} />
    </div>
  );
};