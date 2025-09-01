import React from 'react';
import { Home, Activity, Moon, Utensils, Heart, Trophy, Users } from 'lucide-react';
import clsx from 'clsx';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'sleep', label: 'Sleep', icon: Moon },
  { id: 'nutrition', label: 'Nutrition', icon: Utensils },
  { id: 'stress', label: 'Mindfulness', icon: Heart },
  { id: 'challenges', label: 'Together', icon: Users },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200',
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className={clsx(
                    'w-5 h-5',
                    activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
                  )} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};