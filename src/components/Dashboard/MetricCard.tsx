import React from 'react';
import { LucideIcon } from 'lucide-react'; // Fixed import
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: string;
  target?: string;
  icon: LucideIcon;
  color: 'blue' | 'orange' | 'purple' | 'cyan' | 'green' | 'red';
  progress?: number;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    progress: 'bg-blue-500',
    border: 'border-blue-100'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    progress: 'bg-orange-500',
    border: 'border-orange-100'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    progress: 'bg-purple-500',
    border: 'border-purple-100'
  },
  cyan: {
    bg: 'bg-cyan-50',
    icon: 'text-cyan-600',
    progress: 'bg-cyan-500',
    border: 'border-cyan-100'
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    progress: 'bg-green-500',
    border: 'border-green-100'
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    progress: 'bg-red-500',
    border: 'border-red-100'
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  target,
  icon: Icon,
  color,
  progress
}) => {
  const colors = colorClasses[color];
  const progressClamped = progress !== undefined ? Math.min(Math.max(progress, 0), 100) : 0;

  return (
    <div className={clsx(
      'bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md',
      colors.border
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={clsx('p-3 rounded-lg', colors.bg)}>
          <Icon className={clsx('w-6 h-6', colors.icon)} />
        </div>
        {target && (
          <span className="text-xs text-gray-500 font-medium">
            Goal: {target}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={clsx('h-2 rounded-full transition-all duration-500', colors.progress)}
                style={{ width: `${progressClamped}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {progressClamped.toFixed(0)}% of goal
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
