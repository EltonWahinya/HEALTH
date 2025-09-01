import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  waterIntake: number;
  target: number;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ waterIntake, target }) => {
  const progress = (waterIntake / target) * 100;
  const glasses = Math.floor(waterIntake / 250); // 250ml per glass
  const targetGlasses = Math.floor(target / 250);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Water Intake</h3>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-cyan-600 hover:bg-cyan-50 rounded transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button className="p-1 text-cyan-600 hover:bg-cyan-50 rounded transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-cyan-600 mb-1">
          {(waterIntake / 1000).toFixed(1)}L
        </p>
        <p className="text-sm text-gray-600">
          {glasses} of {targetGlasses} glasses
        </p>
      </div>

      {/* Water Level Visualization */}
      <div className="relative mx-auto w-24 h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-gray-200">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 to-cyan-300 transition-all duration-500 rounded-full"
          style={{ height: `${Math.min(progress, 100)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Droplets className="w-8 h-8 text-white opacity-80" />
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 bg-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          {progress.toFixed(0)}% of daily goal
        </p>
      </div>
    </div>
  );
};