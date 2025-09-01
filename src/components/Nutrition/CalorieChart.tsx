import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NutritionData } from '../../types/health';
import { format } from 'date-fns';

interface CalorieChartProps {
  data: NutritionData[];
}

export const CalorieChart: React.FC<CalorieChartProps> = ({ data }) => {
  const chartData = data.slice(0, 7).reverse().map(item => ({
    date: format(item.date, 'MMM dd'),
    calories: item.totalCalories,
    target: 2000 // Daily calorie target
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Calorie Intake</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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
              formatter={(value: number) => [`${value} cal`, 'Calories']}
            />
            <Area 
              type="monotone" 
              dataKey="calories" 
              stroke="#f59e0b" 
              fill="#fef3c7"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};</content>