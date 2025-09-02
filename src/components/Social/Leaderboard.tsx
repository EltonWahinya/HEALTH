// src/components/Social/Leaderboard.tsx
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

type Leader = {
  username: string;
  steps: number;
};

export const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const currentUser = localStorage.getItem('username') || 'You';

  useEffect(() => {
    const fetchLeaders = async () => {
      const { data, error } = await supabase
        .from('steps')
        .select('username, steps')
        .order('steps', { ascending: false })
        .limit(10);

      if (!error && data) {
        // Deduplicate: only keep highest score per username
        const deduped = Object.values(
          data.reduce((acc: Record<string, Leader>, curr: Leader) => {
            if (!acc[curr.username] || curr.steps > acc[curr.username].steps) {
              acc[curr.username] = curr;
            }
            return acc;
          }, {})
        ) as Leader[];

        // Sort descending
        setLeaders(deduped.sort((a, b) => b.steps - a.steps));
      }
    };

    fetchLeaders();
    const interval = setInterval(fetchLeaders, 5000); // 5s refresh
    return () => clearInterval(interval);
  }, []);

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
        <h3 className="text-lg font-semibold text-gray-900">Global Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {leaders.map((user, index) => {
          const rank = index + 1;
          const isCurrentUser = user.username === currentUser;
          return (
            <div
              key={user.username}
              className={clsx(
                'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                isCurrentUser
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              )}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(rank)}
              </div>

              <div className="text-2xl">👤</div>

              <div className="flex-1">
                <p
                  className={clsx(
                    'font-medium',
                    isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                  )}
                >
                  {user.username}
                </p>
                <p className="text-sm text-gray-600">
                  {user.steps.toLocaleString()} steps
                </p>
              </div>

              {rank <= 3 && (
                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Top 3
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
