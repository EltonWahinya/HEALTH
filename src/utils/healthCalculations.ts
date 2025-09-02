import { ActivityData, SleepData, NutritionData } from '../types/health';

export const calculateBMI = (weight: number, height: number): number => {
  // weight in kg, height in cm
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateCaloriesBurned = (
  weight: number,
  activityType: string,
  duration: number
): number => {
  // MET values for different activities
  const metValues: Record<string, number> = {
    walking: 3.8,
    running: 8.0,
    cycling: 7.5,
    swimming: 6.0,
    hiit: 8.5,
    yoga: 2.5,
    strength: 6.0,
    cardio: 7.0
  };

  const met = metValues[activityType] || 5.0;
  return Math.round((met * weight * duration) / 60);
};

export const getSleepQuality = (sleepData: SleepData): string => {
  const { sleepScore } = sleepData;
  
  if (sleepScore >= 85) return 'Excellent';
  if (sleepScore >= 70) return 'Good';
  if (sleepScore >= 55) return 'Fair';
  return 'Poor';
};

export const calculateSleepEfficiency = (sleepData: SleepData): number => {
  const totalTimeInBed = (sleepData.wakeTime.getTime() - sleepData.bedTime.getTime()) / (1000 * 60);
  return (sleepData.totalSleep / totalTimeInBed) * 100;
};

export const getHydrationStatus = (waterIntake: number, target: number): string => {
  const percentage = (waterIntake / target) * 100;
  
  if (percentage >= 100) return 'Well hydrated';
  if (percentage >= 75) return 'Good hydration';
  if (percentage >= 50) return 'Moderate hydration';
  return 'Needs more water';
};

export const calculateMacroCalories = (macros: { protein: number; carbs: number; fat: number }) => {
  return {
    protein: macros.protein * 4,
    carbs: macros.carbs * 4,
    fat: macros.fat * 9
  };
};

export const getStressLevel = (stressValue: number): { level: string; color: string } => {
  if (stressValue <= 30) return { level: 'Low', color: 'green' };
  if (stressValue <= 60) return { level: 'Moderate', color: 'yellow' };
  return { level: 'High', color: 'red' };
};

export const calculateWeeklyAverage = (data: any[], field: string): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0);
  return sum / data.length;
};