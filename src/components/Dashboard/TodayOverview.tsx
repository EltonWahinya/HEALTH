import React from 'react';
import { ActivityData, SleepData, NutritionData, StressData, HealthGoal } from '../../types/health';
import { MetricCard } from './MetricCard';
import { GoalProgress } from './GoalProgress';
import { QuickActions } from './QuickActions';
import { Footprints, Flame, Clock, Droplets } from 'lucide-react';

interface TodayOverviewProps {
  activityData: ActivityData;
  sleepData: SleepData;
  nutritionData: NutritionData;
  stressData: StressData;
  goals: HealthGoal[];
}

export const TodayOverview: React.FC<TodayOverviewProps> = ({
  activityData,
  sleepData,
  nutritionData,
  stressData,
  goals
}) => {
  const stepsGoal = goals.find(g => g.type === 'steps');
  const caloriesGoal = goals.find(g => g.type === 'calories');
  const sleepGoal = goals.find(g => g.type === 'sleep');
  const waterGoal = goals.find(g => g.type === 'water');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Today</h1>
          <p className="text-gray-600">Your daily wellness summary</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Steps"
          value={activityData.steps.toLocaleString()}
          target={stepsGoal?.target.toLocaleString()}
          icon={Footprints}
          color="blue"
          progress={(activityData.steps / (stepsGoal?.target || 10000)) * 100}
        />
        <MetricCard
          title="Calories"
          value={activityData.calories.toString()}
          target={caloriesGoal?.target.toString()}
          icon={Flame}
          color="orange"
          progress={(activityData.calories / (caloriesGoal?.target || 400)) * 100}
        />
        <MetricCard
          title="Sleep"
          value={`${(sleepData.totalSleep / 60).toFixed(1)}h`}
          target={`${sleepGoal?.target}h`}
          icon={Clock}
          color="purple"
          progress={((sleepData.totalSleep / 60) / (sleepGoal?.target || 8)) * 100}
        />
        <MetricCard
          title="Water"
          value={`${(nutritionData.waterIntake / 1000).toFixed(1)}L`}
          target={`${((waterGoal?.target || 2000) / 1000).toFixed(1)}L`}
          icon={Droplets}
          color="cyan"
          progress={(nutritionData.waterIntake / (waterGoal?.target || 2000)) * 100}
        />
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Goals</h2>
        <div className="space-y-4">
          {goals.filter(g => g.isActive).map(goal => (
            <GoalProgress key={goal.id} goal={goal} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Health Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Insights</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              Great job! You're 85% towards your step goal. A 15-minute walk will get you there.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              Your sleep score of {sleepData.sleepScore} is excellent. Keep up the consistent bedtime routine.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <p className="text-sm text-gray-700">
              Your stress levels are low today. Consider a mindfulness session to maintain this balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};