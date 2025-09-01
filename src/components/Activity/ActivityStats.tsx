import React from 'react';
import { ActivityData } from '../../types/health';
import { Footprints, MapPin, Flame, Clock, TrendingUp } from 'lucide-react';

interface ActivityStatsProps {
  data: ActivityData;
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({ data }) => {
  const stats = [
    {
      label: 'Steps',
      value: data.steps.toLocaleString(),
      icon: Footprints,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Distance',
      value: `${data.distance.toFixed(1)} km`,
      icon: MapPin,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Calories',
      value: data.calories.toString(),
      icon: Flame,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      label: 'Active Minutes',
      value: data.activeMinutes.toString(),
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Floors Climbed',
      value: data.floorsClimbed.toString(),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3`}>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};</content>