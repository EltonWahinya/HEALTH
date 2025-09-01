export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
}

export interface ActivityData {
  id: string;
  date: Date;
  steps: number;
  distance: number; // in km
  calories: number;
  activeMinutes: number;
  floorsClimbed: number;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number; // in minutes
  calories: number;
  startTime: Date;
  endTime: Date;
  heartRate?: {
    avg: number;
    max: number;
    min: number;
  };
  gpsData?: GPSPoint[];
}

export interface GPSPoint {
  lat: number;
  lng: number;
  timestamp: Date;
}

export type WorkoutType = 
  | 'running' | 'walking' | 'cycling' | 'swimming' | 'hiit' | 'yoga' 
  | 'strength' | 'cardio' | 'pilates' | 'dance' | 'boxing' | 'tennis'
  | 'basketball' | 'soccer' | 'golf' | 'hiking' | 'rowing';

export interface SleepData {
  id: string;
  date: Date;
  bedTime: Date;
  wakeTime: Date;
  totalSleep: number; // in minutes
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
  awakeTime: number;
  sleepScore: number; // 0-100
  bloodOxygen?: number[];
  snoreDetection?: {
    totalSnoreTime: number;
    snoreEvents: number;
  };
}

export interface NutritionData {
  id: string;
  date: Date;
  meals: Meal[];
  waterIntake: number; // in ml
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  timestamp: Date;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface StressData {
  id: string;
  date: Date;
  stressLevel: number; // 0-100
  hrvReadings: HRVReading[];
  breathingExercises: BreathingSession[];
  moodEntries: MoodEntry[];
}

export interface HRVReading {
  timestamp: Date;
  value: number;
  heartRate: number;
}

export interface BreathingSession {
  id: string;
  duration: number; // in minutes
  type: 'calm' | 'focus' | 'sleep' | 'energy';
  completedAt: Date;
}

export interface MoodEntry {
  id: string;
  mood: 'excellent' | 'good' | 'okay' | 'poor' | 'terrible';
  notes?: string;
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'steps' | 'workout' | 'sleep' | 'nutrition' | 'mindfulness';
  goal: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  isJoined: boolean;
  progress: number;
  reward: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'activity' | 'sleep' | 'nutrition' | 'stress' | 'social';
  unlockedAt?: Date;
  progress: number;
  target: number;
}

export interface HealthGoal {
  id: string;
  type: 'steps' | 'calories' | 'sleep' | 'water' | 'workouts';
  target: number;
  current: number;
  unit: string;
  isActive: boolean;
}</content>