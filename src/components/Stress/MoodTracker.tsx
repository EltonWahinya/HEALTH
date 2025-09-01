import React from 'react';
import { MoodEntry } from '../../types/health';
import { Smile, Meh, Frown, Plus } from 'lucide-react';

interface MoodTrackerProps {
  entries: MoodEntry[];
}

const moodEmojis = {
  excellent: '😄',
  good: '😊',
  okay: '😐',
  poor: '😕',
  terrible: '😢'
};

const moodColors = {
  excellent: 'bg-green-100 text-green-800 border-green-200',
  good: 'bg-blue-100 text-blue-800 border-blue-200',
  okay: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  poor: 'bg-orange-100 text-orange-800 border-orange-200',
  terrible: 'bg-red-100 text-red-800 border-red-200'
};

export const MoodTracker: React.FC<MoodTrackerProps> = ({ entries }) => {
  const latestEntry = entries[0];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mood Tracker</h3>
        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {latestEntry ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-2">{moodEmojis[latestEntry.mood]}</div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${moodColors[latestEntry.mood]}`}>
              {latestEntry.mood.charAt(0).toUpperCase() + latestEntry.mood.slice(1)}
            </div>
          </div>

          {latestEntry.notes && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700 italic">"{latestEntry.notes}"</p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-2">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <button
                key={mood}
                className={`p-3 rounded-lg text-2xl transition-all duration-200 hover:scale-110 ${
                  mood === latestEntry.mood 
                    ? 'bg-purple-100 ring-2 ring-purple-500' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Smile className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-3">How are you feeling today?</p>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <button
                key={mood}
                className="p-3 rounded-lg text-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};</content>