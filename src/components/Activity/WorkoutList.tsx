import React from 'react';
import { Workout } from '../../types/health';
import { Play, Clock, Flame, Heart } from 'lucide-react';
import { format } from 'date-fns';

interface WorkoutListProps {
  workouts: Workout[];
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  if (workouts.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Workouts</h3>
        <div className="text-center py-8">
          <Play className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No workouts recorded today</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Start Workout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Workouts</h3>
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 capitalize">{workout.type}</h4>
              <span className="text-sm text-gray-500">
                {format(workout.startTime, 'HH:mm')}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{workout.duration}m</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{workout.calories} cal</span>
              </div>
              {workout.heartRate && (
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-gray-600">{workout.heartRate.avg} bpm</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};</content>