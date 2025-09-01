import React from 'react';
import { Challenge } from '../../types/health';
import { Users, Calendar, Trophy, Target } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import clsx from 'clsx';

interface ChallengeCardProps {
  challenge: Challenge;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const daysLeft = differenceInDays(challenge.endDate, new Date());
  const progressPercentage = challenge.progress * 100;

  return (
    <div className={clsx(
      'bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md',
      challenge.isJoined ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{challenge.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{challenge.participants.toLocaleString()} participants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{daysLeft} days left</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
            <Target className="w-4 h-4" />
            <span>{challenge.goal.toLocaleString()} {challenge.unit}</span>
          </div>
          {challenge.isJoined && (
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              Joined
            </div>
          )}
        </div>
      </div>

      {challenge.isJoined && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">
              {(challenge.goal * challenge.progress).toLocaleString()} / {challenge.goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{progressPercentage.toFixed(0)}% complete</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>{challenge.reward}</span>
        </div>
        
        {!challenge.isJoined && (
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
            Join Challenge
          </button>
        )}
      </div>
    </div>
  );
};</content>