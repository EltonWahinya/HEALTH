import React from 'react';
import { Challenge } from '../../types/health';
import { ChallengeCard } from './ChallengeCard';
import { Leaderboard } from './Leaderboard';
import { Users, Trophy, Target } from 'lucide-react';

interface ChallengesDashboardProps {
  challenges: Challenge[];
}

export const ChallengesDashboard: React.FC<ChallengesDashboardProps> = ({ challenges }) => {
  const activeChallenges = challenges.filter(c => c.isJoined);
  const availableChallenges = challenges.filter(c => !c.isJoined);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Together</h1>
        <p className="text-gray-600">Join challenges and compete with the community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeChallenges.length}</p>
              <p className="text-sm text-gray-600">Active Challenges</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">847</p>
              <p className="text-sm text-gray-600">Global Rank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Challenges</h2>
          <div className="space-y-4">
            {activeChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
        
        <Leaderboard />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  );
};