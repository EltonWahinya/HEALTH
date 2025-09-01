import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StressData } from '../../types/health';
import { format } from 'date-fns';

interface StressChartProps {
  data: StressData[];
}

export const StressChart: React.FC<StressChartProps> = ({ data }) => {
  const chartData = data.slice(0, 7).reverse().map(item => ({
    date: format(item.date, 'MMM dd'),
    stress: item.stressLevel
  }));

  const getStressColor = (level: number) => {
    if (level <= 30) return '#10b981'; // green
    if (level <= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const todayStress = data[0]?.stressLevel || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Stress Level</h3>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: getStressColor(todayStress) }}>
            {todayStress}
          </p>
          <p className="text-sm text-gray-500">
            {todayStress <= 30 ? 'Low' : todayStress <= 60 ? 'Moderate' : 'High'}
          </p>
        </div>
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 100]}
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
              formatter={(value: number) => [value, 'Stress Level']}
            />
            <Line 
              type="monotone" 
              dataKey="stress" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};</content>