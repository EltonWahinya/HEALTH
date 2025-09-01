import React from 'react';
import { Achievement } from '../../types/health';
import { Trophy, Target, Star, TrendingUp } from 'lucide-react';

interface AchievementStatsProps {
  achievements: Achievement[];
}

export const AchievementStats: React.FC<AchievementStatsProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const inProgressCount = achievements.filter(a => !a.unlockedAt && a.progress > 0).length;
  const totalCount = achievements.length;
  const completionRate = (unlockedCount / totalCount) * 100;

  const stats = [
    {
      label: 'Unlocked',
      value: unlockedCount.toString(),
      icon: Trophy,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      label: 'In Progress',
      value: inProgressCount.toString(),
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate.toFixed(0)}%`,
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Total Available',
      value: totalCount.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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