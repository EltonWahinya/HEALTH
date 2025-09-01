import React from 'react';
import { BreathingSession } from '../../types/health';
import { Wind, Play, CheckCircle } from 'lucide-react';

interface BreathingExercisesProps {
  sessions: BreathingSession[];
}

const exerciseTypes = [
  {
    type: 'calm',
    name: 'Calm',
    description: 'Reduce stress and anxiety',
    duration: 5,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    type: 'focus',
    name: 'Focus',
    description: 'Improve concentration',
    duration: 3,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    type: 'sleep',
    name: 'Sleep',
    description: 'Prepare for rest',
    duration: 10,
    color: 'bg-indigo-500 hover:bg-indigo-600'
  },
  {
    type: 'energy',
    name: 'Energy',
    description: 'Boost alertness',
    duration: 2,
    color: 'bg-orange-500 hover:bg-orange-600'
  }
];

export const BreathingExercises: React.FC<BreathingExercisesProps> = ({ sessions }) => {
  const completedToday = sessions.length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Breathing Exercises</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{completedToday} completed today</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exerciseTypes.map((exercise) => (
          <button
            key={exercise.type}
            className={`${exercise.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group text-left`}
          >
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <Play className="w-4 h-4 opacity-75" />
            </div>
            <h4 className="font-semibold mb-1">{exercise.name}</h4>
            <p className="text-xs opacity-90 mb-2">{exercise.description}</p>
            <p className="text-xs opacity-75">{exercise.duration} minutes</p>
          </button>
        ))}
      </div>

      {sessions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Sessions</h4>
          <div className="space-y-2">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 capitalize">{session.type} breathing</span>
                <span className="text-gray-500">{session.duration}m</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};</content>