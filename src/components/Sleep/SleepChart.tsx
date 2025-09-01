import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SleepData } from '../../types/health';
import { format } from 'date-fns';

interface SleepChartProps {
  data: SleepData[];
}

export const SleepChart: React.FC<SleepChartProps> = ({ data }) => {
  const chartData = data.slice(0, 7).reverse().map(item => ({
    date: format(item.date, 'MMM dd'),
    totalSleep: item.totalSleep / 60, // Convert to hours
    sleepScore: item.sleepScore,
    deepSleep: item.deepSleep / 60,
    lightSleep: item.lightSleep / 60,
    remSleep: item.remSleep / 60
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Duration (Hours)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value.toFixed(1)}h`, 'Sleep Duration']}
            />
            <Bar 
              dataKey="totalSleep" 
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};