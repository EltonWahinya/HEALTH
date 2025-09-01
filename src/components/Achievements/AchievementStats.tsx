import React, { useState, useMemo } from 'react';
import { Achievement } from '../../types/health';
import { Trophy, Target, Star, TrendingUp, TrendingDown, Users, Calendar } from 'lucide-react';
import clsx from 'clsx';

interface AchievementStatsProps {
  achievements: Achievement[];
  historicalData?: Achievement[][];
  communityData?: {
    averageCompletion: number;
    totalParticipants: number;
  };
  timeframe?: 'week' | 'month' | 'year';
  onTimeframeChange?: (timeframe: 'week' | 'month' | 'year') => void;
}

export const AchievementStats: React.FC<AchievementStatsProps> = ({ 
  achievements, 
  historicalData = [],
  communityData,
  timeframe = 'month',
  onTimeframeChange
}) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const calculations = useMemo(() => {
    const unlockedCount = achievements.filter(a => a.unlockedAt).length;
    const inProgressCount = achievements.filter(a => !a.unlockedAt && a.progress > 0).length;
    const totalCount = achievements.length;
    const completionRate = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

    // Calculate trends if historical data is available
    const previousPeriod = historicalData[historicalData.length - 2];
    const previousUnlocked = previousPeriod ? previousPeriod.filter(a => a.unlockedAt).length : 0;
    const unlockedTrend = unlockedCount - previousUnlocked;

    // Calculate average progress for in-progress achievements
    const avgProgress = inProgressCount > 0 
      ? achievements
          .filter(a => !a.unlockedAt && a.progress > 0)
          .reduce((sum, a) => sum + (a.progress / a.target), 0) / inProgressCount * 100
      : 0;

    // Calculate points earned
    const totalPoints = achievements
      .filter(a => a.unlockedAt)
      .reduce((sum, a) => sum + (a.points || 0), 0);

    // Calculate rarity distribution
    const rarityDistribution = achievements.reduce((acc, a) => {
      const rarity = a.rarity || 'common';
      acc[rarity] = (acc[rarity] || 0) + (a.unlockedAt ? 1 : 0);
      return acc;
    }, {} as Record<string, number>);

    return {
      unlockedCount,
      inProgressCount,
      totalCount,
      completionRate,
      unlockedTrend,
      avgProgress,
      totalPoints,
      rarityDistribution
    };
  }, [achievements, historicalData]);

  const stats = [
    {
      id: 'unlocked',
      label: 'Unlocked',
      value: calculations.unlockedCount.toString(),
      icon: Trophy,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-100',
      trend: calculations.unlockedTrend,
      description: `${calculations.unlockedTrend >= 0 ? '+' : ''}${calculations.unlockedTrend} this ${timeframe}`
    },
    {
      id: 'progress',
      label: 'In Progress',
      value: calculations.inProgressCount.toString(),
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      subtitle: `${calculations.avgProgress.toFixed(0)}% avg progress`,
      description: 'Achievements you\'re working towards'
    },
    {
      id: 'completion',
      label: 'Completion Rate',
      value: `${calculations.completionRate.toFixed(0)}%`,
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      comparison: communityData ? `${(calculations.completionRate - communityData.averageCompletion).toFixed(0)}% vs community` : undefined,
      description: 'Your achievement completion rate'
    },
    {
      id: 'total',
      label: 'Total Available',
      value: calculations.totalCount.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
      subtitle: calculations.totalPoints > 0 ? `${calculations.totalPoints} points earned` : undefined,
      description: 'Total achievements in the app'
    }
  ];

  // Add community comparison if available
  if (communityData) {
    stats.push({
      id: 'community',
      label: 'Community Rank',
      value: `Top ${((1 - calculations.completionRate / 100) * 100).toFixed(0)}%`,
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      subtitle: `vs ${communityData.totalParticipants.toLocaleString()} users`,
      description: 'Your ranking among all users'
    });
  }

  return (
    <div className="space-y-4">
      {/* Timeframe selector */}
      {onTimeframeChange && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Achievement Statistics</h2>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => onTimeframeChange(period)}
                className={clsx(
                  'px-3 py-1 rounded text-sm font-medium transition-all duration-200',
                  timeframe === period
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isSelected = selectedStat === stat.id;
          
          return (
            <div 
              key={stat.id} 
              className={clsx(
                'bg-white rounded-xl p-4 shadow-sm border transition-all duration-200 cursor-pointer',
                'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
                stat.border,
                isSelected && 'ring-2 ring-blue-300 shadow-lg'
              )}
              onClick={() => setSelectedStat(isSelected ? null : stat.id)}
              role="button"
              tabIndex={0}
              aria-label={`${stat.label}: ${stat.value}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStat(isSelected ? null : stat.id);
                }
              }}
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-3 transition-transform duration-200 ${isSelected ? 'scale-110' : ''}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  {stat.trend !== undefined && stat.trend !== 0 && (
                    <div className={clsx(
                      'flex items-center space-x-1 text-xs px-2 py-1 rounded',
                      stat.trend > 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    )}>
                      {stat.trend > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{Math.abs(stat.trend)}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                
                {stat.subtitle && (
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                )}
                
                {stat.comparison && (
                  <p className="text-xs text-blue-600 font-medium">{stat.comparison}</p>
                )}
              </div>

              {/* Expanded details when selected */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                  
                  {stat.id === 'completion' && calculations.rarityDistribution && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium text-gray-700">By Rarity:</p>
                      {Object.entries(calculations.rarityDistribution).map(([rarity, count]) => (
                        <div key={rarity} className="flex justify-between text-xs">
                          <span className="capitalize text-gray-600">{rarity}:</span>
                          <span className="font-medium text-gray-900">{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Achievement milestones */}
      {calculations.unlockedCount > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-gray-900">Milestones</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { milestone: 5, emoji: '🏃', label: 'Getting Started' },
              { milestone: 10, emoji: '💪', label: 'Committed' },
              { milestone: 25, emoji: '🔥', label: 'On Fire' },
              { milestone: 50, emoji: '🏆', label: 'Champion' }
            ].map(({ milestone, emoji, label }) => (
              <div 
                key={milestone}
                className={clsx(
                  'p-2 rounded-lg transition-all duration-200',
                  calculations.unlockedCount >= milestone
                    ? 'bg-yellow-100 border border-yellow-200 scale-105'
                    : 'bg-white border border-gray-200 opacity-60'
                )}
              >
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs font-medium text-gray-900">{milestone}</div>
                <div className="text-xs text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly summary if historical data available */}
      {historicalData.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Weekly Progress</h3>
            <Calendar className="w-4 h-4 text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-1">
            {historicalData.slice(-7).map((dayData, index) => {
              const dayUnlocked = dayData.filter(a => a.unlockedAt).length;
              const hasProgress = dayUnlocked > 0;
              
              return (
                <div
                  key={index}
                  className={clsx(
                    'w-6 h-6 rounded-sm transition-all duration-200',
                    hasProgress 
                      ? 'bg-yellow-400 hover:bg-yellow-500' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  )}
                  title={`Day ${index + 1}: ${dayUnlocked} achievements unlocked`}
                />
              );
            })}
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Last 7 days activity • Hover for details
          </p>
        </div>
      )}
    </div>
  );
};
