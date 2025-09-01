import React from 'react';
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

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <TodayOverview
            activityData={activityData[0]}
            sleepData={sleepData[0]}
            nutritionData={nutritionData[0]}
            stressData={stressData[0]}
            goals={healthGoals}
          />
        );
      case 'activity':
        return <ActivityDashboard data={activityData} />;
      case 'sleep':
        return <SleepDashboard data={sleepData} />;
      case 'nutrition':
        return <NutritionDashboard data={nutritionData} />;
      case 'stress':
        return <StressDashboard data={stressData} />;
      case 'challenges':
        return <ChallengesDashboard challenges={challenges} />;
      case 'achievements':
        return <AchievementsDashboard achievements={achievements} />;
      default:
        return <TodayOverview
          activityData={activityData[0]}
          sleepData={sleepData[0]}
          nutritionData={nutritionData[0]}
          stressData={stressData[0]}
          goals={healthGoals}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
