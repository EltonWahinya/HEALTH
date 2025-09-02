// src/App.tsx
import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { TodayOverview } from './components/Dashboard/TodayOverview';
import { ActivityDashboard } from './components/Activity/ActivityDashboard';
import { SleepDashboard } from './components/Sleep/SleepDashboard';
import { NutritionDashboard } from './components/Nutrition/NutritionDashboard';
import { StressDashboard } from './components/Stress/StressDashboard';
import { ChallengesDashboard } from './components/Social/ChallengesDashboard';
import { AchievementsDashboard } from './components/Achievements/AchievementsDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useHealthData } from './hooks/useHealthData';
import {
  mockActivityData,
  mockSleepData,
  mockNutritionData,
  mockStressData
} from './data/mockData';

// Username Gate Component
function UsernameGate({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );
  const [input, setInput] = useState('');

  const save = () => {
    if (input.trim().length === 0) return;
    localStorage.setItem('username', input);
    setUsername(input);
  };

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Welcome to WellSpring 🌱</h1>
        <input
          className="border p-2 rounded mb-2 w-64"
          placeholder="Enter a username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={save}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const {
    user,
    activityData,
    sleepData,
    nutritionData,
    stressData,
    challenges,
    achievements,
    healthGoals,
    isLoading
  } = useHealthData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const currentActivityData = activityData[0] || mockActivityData[0];
  const currentSleepData = sleepData[0] || mockSleepData[0];
  const currentNutritionData = nutritionData[0] || mockNutritionData[0];
  const currentStressData = stressData[0] || mockStressData[0];

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <TodayOverview
            activityData={currentActivityData}
            sleepData={currentSleepData}
            nutritionData={currentNutritionData}
            stressData={currentStressData}
            goals={healthGoals}
          />
        );
      case 'activity':
        return (
          <ActivityDashboard
            data={activityData.length > 0 ? activityData : mockActivityData}
          />
        );
      case 'sleep':
        return (
          <SleepDashboard
            data={sleepData.length > 0 ? sleepData : mockSleepData}
          />
        );
      case 'nutrition':
        return (
          <NutritionDashboard
            data={nutritionData.length > 0 ? nutritionData : mockNutritionData}
          />
        );
      case 'stress':
        return (
          <StressDashboard
            data={stressData.length > 0 ? stressData : mockStressData}
          />
        );
      case 'challenges':
        return <ChallengesDashboard challenges={challenges} />;
      case 'achievements':
        return <AchievementsDashboard achievements={achievements} />;
      default:
        return (
          <TodayOverview
            activityData={currentActivityData}
            sleepData={currentSleepData}
            nutritionData={currentNutritionData}
            stressData={currentStressData}
            goals={healthGoals}
          />
        );
    }
  };

  return (
    <UsernameGate>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <div className="flex">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">{renderContent()}</div>
          </main>
        </div>
      </div>
    </UsernameGate>
  );
}

export default App;
