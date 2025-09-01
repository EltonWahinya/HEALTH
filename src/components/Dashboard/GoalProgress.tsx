import React from 'react';
import { HealthGoal } from '../../types/health';
import { Footprints, Flame, Clock, Droplets, Dumbbell } from 'lucide-react';
import clsx from 'clsx';

interface GoalProgressProps {
  goal: HealthGoal;
}

const goalIcons = {
  steps: Footprints,
  calories: Flame,
  sleep: Clock,
  water: Droplets,
  workouts: Dumbbell
};

const goalColors = {
  steps: 'blue',
  calories: 'orange',
  sleep: 'purple',
  water: 'cyan',
  workouts: 'green'
};

export const GoalProgress: React.FC<GoalProgressProps> = ({ goal }) => {
  const Icon = goalIcons[goal.type];
  const color = goalColors[goal.type];
  const progress = Math.min((goal.current / goal.target) * 100, 100);
  const isCompleted = goal.current >= goal.target;

  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600' },
    green: { bg: 'bg-green-500', text: 'text-green-600' }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className={clsx(
        'p-2 rounded-lg',
        isCompleted ? 'bg-green-100' : 'bg-gray-100'
      )}>
        <Icon className={clsx(
          'w-5 h-5',
          isCompleted ? 'text-green-600' : colorClasses[color].text
        )} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 capitalize">
            {goal.type}
          </span>
          <span className="text-sm text-gray-600">
            {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={clsx(
              'h-2 rounded-full transition-all duration-500',
              isCompleted ? 'bg-green-500' : colorClasses[color].bg
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {isCompleted && (
        <div className="text-green-600 text-sm font-medium">
          ✓ Complete
        </div>
      )}
    </div>
  );
};