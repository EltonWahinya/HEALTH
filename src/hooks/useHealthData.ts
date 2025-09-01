import { useState, useEffect } from 'react';
import { 
  ActivityData, 
  SleepData, 
  NutritionData, 
  StressData, 
  Challenge, 
  Achievement, 
  HealthGoal,
  User
} from '../types/health';
import {
  mockUser,
  mockActivityData,
  mockSleepData,
  mockNutritionData,
  mockStressData,
  mockChallenges,
  mockAchievements,
  mockHealthGoals
} from '../data/mockData';

export const useHealthData = () => {
  const [user] = useState<User>(mockUser);
  const [activityData] = useState<ActivityData[]>(mockActivityData);
  const [sleepData] = useState<SleepData[]>(mockSleepData);
  const [nutritionData] = useState<NutritionData[]>(mockNutritionData);
  const [stressData] = useState<StressData[]>(mockStressData);
  const [challenges] = useState<Challenge[]>(mockChallenges);
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [healthGoals] = useState<HealthGoal[]>(mockHealthGoals);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    activityData,
    sleepData,
    nutritionData,
    stressData,
    challenges,
    achievements,
    healthGoals,
    isLoading
  };
};</content>