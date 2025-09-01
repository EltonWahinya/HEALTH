import React from 'react';
import { StressData } from '../../types/health';
import { StressChart } from './StressChart';
import { BreathingExercises } from './BreathingExercises';
import { MoodTracker } from './MoodTracker';
import { HRVInsights } from './HRVInsights';

interface StressDashboardProps {
  data: StressData[];
}

export const StressDashboard: React.FC<StressDashboardProps> = ({ data }) => {
  const todayData = data[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stress & Mindfulness</h1>
        <p className="text-gray-600">Monitor your mental well-being and practice mindfulness</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressChart data={data} />
        <HRVInsights readings={todayData.hrvReadings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BreathingExercises sessions={todayData.breathingExercises} />
        <MoodTracker entries={todayData.moodEntries} />
      </div>
    </div>
  );
};</content>