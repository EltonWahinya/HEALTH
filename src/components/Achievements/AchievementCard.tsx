import React from 'react';
import { Achievement } from '../../types/health';
import { Trophy, Footprints, Moon, Heart, Users, Lock } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface AchievementCardProps {
  achievement: Achievement;
}

const categoryIcons = {
  activity: Footprints,
  sleep: Moon,
  nutrition: Heart,
  stress: Heart,
  social: Users
};

const categoryColors = {
  activity: 'text-blue-600 bg-blue-50',
  sleep: 'text-purple-600 bg-purple-50',
  nutrition: 'text-orange-600 bg-orange-50',
  stress: 'text-green-600 bg-green-50',
  social: 'text-pink-600 bg-pink-50'
};

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const Icon = categoryIcons[achievement.category];
  const isUnlocked = !!achievement.unlockedAt;
  const isInProgress = achievement.progress > 0 && !isUnlocked;
  const progressPercentage = (achievement.progress / achievement.target) * 100;

  return (
    <div className={clsx(
      'bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md',
      isUnlocked ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' : 'border-gray-100',
      !isUnlocked && achievement.progress === 0 && 'opacity-60'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={clsx(
          'p-3 rounded-lg',
          isUnlocked ? 'bg-yellow-100' : categoryColors[achievement.category]
        )}>
          {isUnlocked ? (
            <Trophy className="w-6 h-6 text-yellow-600" />
          ) : achievement.progress === 0 ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <Icon className="w-6 h-6" />
          )}
        </div>
        
        {isUnlocked && (
          <div className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
            Unlocked
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <h3 className={clsx(
            'font-semibold mb-1',
            isUnlocked ? 'text-yellow-900' : 'text-gray-900'
          )}>
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </div>

        {!isUnlocked && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={clsx(
                  'h-2 rounded-full transition-all duration-500',
                  isInProgress ? 'bg-blue-500' : 'bg-gray-300'
                )}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{progressPercentage.toFixed(0)}% complete</p>
          </div>
        )}

        {isUnlocked && achievement.unlockedAt && (
          <div className="text-xs text-yellow-700">
            Unlocked on {format(achievement.unlockedAt, 'MMM dd, yyyy')}
          </div>
        )}
      </div>
    </div>
  );
};