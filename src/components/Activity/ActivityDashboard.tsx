import React from 'react';
import { ActivityData } from '../../types/health';
import { ActivityChart } from './ActivityChart';
import { WorkoutList } from './WorkoutList';
import { ActivityStats } from './ActivityStats';

interface ActivityDashboardProps {
  data: ActivityData[];
}

export const ActivityDashboard: React.FC<ActivityDashboardProps> = ({ data }) => {
  const todayData = data[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
        <p className="text-gray-600">Track your movement and exercise</p>
      </div>

      <ActivityStats data={todayData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={data} />
        <WorkoutList workouts={todayData.workouts} />
      </div>
    </div>
  );
};