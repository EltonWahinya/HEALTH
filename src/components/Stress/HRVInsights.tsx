import React from 'react';
import { HRVReading } from '../../types/health';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';

interface HRVInsightsProps {
  readings: HRVReading[];
}

export const HRVInsights: React.FC<HRVInsightsProps> = ({ readings }) => {
  if (readings.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Rate Variability</h3>
        <div className="text-center py-8">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No HRV data available</p>
          <p className="text-sm text-gray-400 mt-1">Wear your Galaxy Watch to track HRV</p>
        </div>
      </div>
    );
  }

  const latestReading = readings[readings.length - 1];
  const avgHRV = readings.reduce((sum, reading) => sum + reading.value, 0) / readings.length;
  const trend = latestReading.value > avgHRV ? 'up' : 'down';

  const getHRVStatus = (value: number) => {
    if (value >= 45) return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (value >= 35) return { status: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (value >= 25) return { status: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'Poor', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const status = getHRVStatus(latestReading.value);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Heart Rate Variability</h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-900 mb-1">{latestReading.value}ms</p>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
            {status.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">{latestReading.heartRate}</p>
            <p className="text-sm text-gray-600">Heart Rate (bpm)</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <p className="text-lg font-semibold text-gray-900">
                {Math.abs(latestReading.value - avgHRV).toFixed(1)}
              </p>
            </div>
            <p className="text-sm text-gray-600">vs. Average</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            <strong>HRV</strong> measures the variation in time between heartbeats. 
            Higher values typically indicate better recovery and lower stress.
          </p>
        </div>
      </div>
    </div>
  );
};