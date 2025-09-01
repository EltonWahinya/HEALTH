import React from 'react';
import { SleepData } from '../../types/health';
import { Heart, Volume2, TrendingUp } from 'lucide-react';

interface SleepInsightsProps {
  data: SleepData;
}

export const SleepInsights: React.FC<SleepInsightsProps> = ({ data }) => {
  const avgBloodOxygen = data.bloodOxygen 
    ? (data.bloodOxygen.reduce((a, b) => a + b, 0) / data.bloodOxygen.length).toFixed(1)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Blood Oxygen */}
      {avgBloodOxygen && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Blood Oxygen</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{avgBloodOxygen}%</p>
          <p className="text-sm text-gray-600">Average during sleep</p>
          <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            Normal range
          </div>
        </div>
      )}

      {/* Snore Detection */}
      {data.snoreDetection && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Snore Detection</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{data.snoreDetection.totalSnoreTime}m</p>
          <p className="text-sm text-gray-600">{data.snoreDetection.snoreEvents} events detected</p>
          <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
            Light snoring
          </div>
        </div>
      )}

      {/* Sleep Trend */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Sleep Trend</h3>
        </div>
        <p className="text-3xl font-bold text-gray-900 mb-1">+12m</p>
        <p className="text-sm text-gray-600">vs. last week average</p>
        <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
          Improving
        </div>
      </div>
    </div>
  );
};</content>