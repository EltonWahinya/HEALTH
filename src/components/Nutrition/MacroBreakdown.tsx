import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface MacroBreakdownProps {
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export const MacroBreakdown: React.FC<MacroBreakdownProps> = ({ macros }) => {
  const data = [
    { name: 'Protein', value: macros.protein * 4, color: '#ef4444' },
    { name: 'Carbs', value: macros.carbs * 4, color: '#3b82f6' },
    { name: 'Fat', value: macros.fat * 9, color: '#f59e0b' }
  ];

  const totalCalories = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Macronutrients</h3>
      
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value} cal`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{item.value} cal</p>
                <p className="text-xs text-gray-500">
                  {((item.value / totalCalories) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}
          
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Fiber</span>
              <span className="text-sm font-semibold text-gray-900">{macros.fiber}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};