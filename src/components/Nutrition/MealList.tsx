import React from 'react';
import { Meal } from '../../types/health';
import { Coffee, Sun, Sunset, Moon, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface MealListProps {
  meals: Meal[];
}

const mealIcons = {
  breakfast: Sun,
  lunch: Coffee,
  dinner: Sunset,
  snack: Moon
};

export const MealList: React.FC<MealListProps> = ({ meals }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Meals</h3>
        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {meals.map((meal) => {
          const Icon = mealIcons[meal.type];
          const totalCalories = meal.foods.reduce((sum, food) => sum + food.calories, 0);
          
          return (
            <div key={meal.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900 capitalize">{meal.type}</h4>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{totalCalories} cal</p>
                  <p className="text-xs text-gray-500">
                    {format(meal.timestamp, 'HH:mm')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                {meal.foods.map((food) => (
                  <div key={food.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{food.name}</span>
                    <span className="text-gray-500">{food.calories} cal</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {meals.length === 0 && (
          <div className="text-center py-8">
            <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No meals logged today</p>
            <button className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Log First Meal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};</content>