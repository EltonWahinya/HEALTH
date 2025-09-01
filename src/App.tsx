import React, { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
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
import { ErrorFallback } from './components/ErrorFallback';
import { HealthProvider } from './contexts/HealthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useHealthData } from './hooks/useHealthData';
import { useDataSync } from './hooks/useDataSync';

// Import mock data for fallback
import {
  mockActivityData,
  mockSleepData,
  mockNutritionData,
  mockStressData
} from './data/mockData';

interface AppContentProps {}

const AppContent: React.FC<AppContentProps> = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const {
    user,
    activityData,
    sleepData,
    nutritionData,
    stressData,
    challenges,
    achievements,
    healthGoals,
    isLoading,
    error: dataError,
    refetch
  } = useHealthData();

  const { syncStatus, lastSyncTime, triggerSync } = useDataSync();

  // Handle data loading errors with retry logic
  useEffect(() => {
    if (dataError && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        refetch?.();
      }, 2000 * Math.pow(2, retryCount)); // Exponential backoff

      return () => clearTimeout(timer);
    }
  }, [dataError, retryCount, refetch]);

  // Safe data access with enhanced fallback logic
  const getSafeData = <T,>(data: T[], fallback: T[]): T[] => {
    try {
      return data && data.length > 0 ? data : fallback;
    } catch (error) {
      console.warn('Data access error, using fallback:', error);
      return fallback;
    }
  };

  const currentActivityData = activityData?.[0] || mockActivityData[0];
  const currentSleepData = sleepData?.[0] || mockSleepData[0];
  const currentNutritionData = nutritionData?.[0] || mockNutritionData[0];
  const currentStressData = stressData?.[0] || mockStressData[0];

  const safeActivityData = getSafeData(activityData, mockActivityData);
  const safeSleepData = getSafeData(sleepData, mockSleepData);
  const safeNutritionData = getSafeData(nutritionData, mockNutritionData);
  const safeStressData = getSafeData(stressData, mockStressData);

  // Handle tab changes with URL sync
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setError(null); // Clear any previous errors
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: tab,
        page_location: window.location.href
      });
    }
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'today':
          return (
            <TodayOverview
              activityData={currentActivityData}
              sleepData={currentSleepData}
              nutritionData={currentNutritionData}
              stressData={currentStressData}
              goals={healthGoals}
              syncStatus={syncStatus}
              lastSyncTime={lastSyncTime}
              onRefresh={triggerSync}
            />
          );
        case 'activity':
          return (
            <ActivityDashboard 
              data={safeActivityData}
              goals={healthGoals.filter(g => g.type === 'steps' || g.type === 'calories')}
              onDataUpdate={refetch}
            />
          );
        case 'sleep':
          return (
            <SleepDashboard 
              data={safeSleepData}
              goals={healthGoals.filter(g => g.type === 'sleep')}
              onDataUpdate={refetch}
            />
          );
        case 'nutrition':
          return (
            <NutritionDashboard 
              data={safeNutritionData}
              goals={healthGoals.filter(g => g.type === 'water')}
              onDataUpdate={refetch}
            />
          );
        case 'stress':
          return (
            <StressDashboard 
              data={safeStressData}
              onDataUpdate={refetch}
            />
          );
        case 'challenges':
          return (
            <ChallengesDashboard 
              challenges={challenges}
              onChallengeJoin={(id) => console.log('Joined challenge:', id)}
              onChallengeLeave={(id) => console.log('Left challenge:', id)}
            />
          );
        case 'achievements':
          return (
            <AchievementsDashboard 
              achievements={achievements}
              onAchievementShare={(id) => console.log('Shared achievement:', id)}
            />
          );
        default:
          return (
            <TodayOverview
              activityData={currentActivityData}
              sleepData={currentSleepData}
              nutritionData={currentNutritionData}
              stressData={currentStressData}
              goals={healthGoals}
              syncStatus={syncStatus}
              lastSyncTime={lastSyncTime}
              onRefresh={triggerSync}
            />
          );
      }
    } catch (error) {
      console.error('Render error:', error);
      setError('Failed to load dashboard content');
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Unable to load content</p>
            <button 
              onClick={() => {
                setError(null);
                refetch?.();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner type="page" message="Loading your wellness data..." />;
  }

  if (error || dataError) {
    return (
      <ErrorFallback 
        error={error || dataError} 
        onRetry={() => {
          setError(null);
          setRetryCount(0);
          refetch?.();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        syncStatus={syncStatus}
        onSync={triggerSync}
        unreadNotifications={3}
      />
      <div className="flex">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          badges={{
            achievements: achievements.filter(a => !a.unlockedAt && a.progress > 0).length,
            challenges: challenges.filter(c => c.isJoined).length
          }}
        />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error) => {
                console.error('Dashboard error:', error);
                setError('An unexpected error occurred');
              }}
              onReset={() => setError(null)}
            >
              <Suspense fallback={<LoadingSpinner type="data" />}>
                {renderContent()}
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => console.error('App-level error:', error)}
      >
        <HealthProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/dashboard/:tab?" element={<AppContent />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NotificationProvider>
        </HealthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
