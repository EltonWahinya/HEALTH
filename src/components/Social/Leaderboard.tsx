import React from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Kim', steps: 15420, avatar: '👩‍💼' },
    { rank: 2, name: 'Mike Chen', steps: 14890, avatar: '👨‍💻' },
    { rank: 3, name: 'Alex Johnson', steps: 14567, avatar: '👤' },
    { rank: 4, name: 'Emma Davis', steps: 13890, avatar: '👩‍🎨' },
    { rank: 5, name: 'You', steps: 8547, avatar: '👤', isCurrentUser: true }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Weekly Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((user) => (
          <div 
            key={user.rank}
            className={clsx(
              'flex items-center space-x-3 p-3 rounded-lg transition-colors',
              user.isCurrentUser 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-50'
            )}
          >
            <div className="flex items-center justify-center w-8">
              {getRankIcon(user.rank)}
            </div>
            
            <div className="text-2xl">{user.avatar}</div>
            
            <div className="flex-1">
              <p className={clsx(
                'font-medium',
                user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
              )}>
                {user.name}
              </p>
              <p className="text-sm text-gray-600">{user.steps.toLocaleString()} steps</p>
            </div>
            
            {user.rank <= 3 && (
              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Top 3
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          You're ranked <strong>#{leaderboardData.find(u => u.isCurrentUser)?.rank}</strong> out of 1,247 participants
        </p>
      </div>
    </div>
  );
};