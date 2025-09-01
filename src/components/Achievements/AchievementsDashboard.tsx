import React from 'react';
import { Achievement } from '../../types/health';
import { AchievementCard } from './AchievementCard';
import { AchievementStats } from './AchievementStats';

interface AchievementsDashboardProps {
  achievements: Achievement[];
}

export const AchievementsDashboard: React.FC<AchievementsDashboardProps> = ({ achievements }) => {
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const inProgressAchievements = achievements.filter(a => !a.unlockedAt && a.progress > 0);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt && a.progress === 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-gray-600">Track your wellness milestones and badges</p>
      </div>

      <AchievementStats achievements={achievements} />

      <div className="space-y-6">
        {unlockedAchievements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unlocked Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {inProgressAchievements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {lockedAchievements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Locked Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};