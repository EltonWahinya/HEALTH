import React from 'react';
import { Plus, Play, Coffee, Zap } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'workout',
      label: 'Start Workout',
      icon: Play,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Begin a new exercise session'
    },
    {
      id: 'food',
      label: 'Log Food',
      icon: Coffee,
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Add a meal or snack'
    },
    {
      id: 'breathing',
      label: 'Breathing Exercise',
      icon: Zap,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Start a mindfulness session'
    },
    {
      id: 'custom',
      label: 'Add Data',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Manually log health data'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};