import React from 'react';
import { SleepData } from '../../types/health';
import { Moon, Zap, Eye, Clock } from 'lucide-react';

interface SleepStagesProps {
  data: SleepData;
}

export const SleepStages: React.FC<SleepStagesProps> = ({ data }) => {
  const stages = [
    {
      name: 'Deep Sleep',
      duration: data.deepSleep,
      percentage: (data.deepSleep / data.totalSleep) * 100,
      color: 'bg-indigo-500',
      icon: Moon,
      description: 'Physical restoration'
    },
    {
      name: 'Light Sleep',
      duration: data.lightSleep,
      percentage: (data.lightSleep / data.totalSleep) * 100,
      color: 'bg-blue-400',
      icon: Eye,
      description: 'Transition periods'
    },
    {
      name: 'REM Sleep',
      duration: data.remSleep,
      percentage: (data.remSleep / data.totalSleep) * 100,
      color: 'bg-purple-500',
      icon: Zap,
      description: 'Mental restoration'
    },
    {
      name: 'Awake',
      duration: data.awakeTime,
      percentage: (data.awakeTime / data.totalSleep) * 100,
      color: 'bg-gray-400',
      icon: Clock,
      description: 'Brief awakenings'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Sleep Stages</h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-600">{data.sleepScore}</p>
          <p className="text-sm text-gray-500">Sleep Score</p>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {Math.floor(stage.duration / 60)}h {stage.duration % 60}m
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${stage.color}`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-500">{stage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};</content>