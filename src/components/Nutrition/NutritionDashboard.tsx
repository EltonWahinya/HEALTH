import React from 'react';
import { NutritionData } from '../../types/health';
import { CalorieChart } from './CalorieChart';
import { MacroBreakdown } from './MacroBreakdown';
import { MealList } from './MealList';
import { WaterTracker } from './WaterTracker';

interface NutritionDashboardProps {
  data: NutritionData[];
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({ data }) => {
  const todayData = data[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nutrition</h1>
        <p className="text-gray-600">Track your food intake and hydration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalorieChart data={data} />
        <WaterTracker waterIntake={todayData.waterIntake} target={2000} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MacroBreakdown macros={todayData.macros} />
        <MealList meals={todayData.meals} />
      </div>
    </div>
  );
};