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

// Helper function for consistent date handling
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  joinDate: new Date('2023-01-15'),
};

export const mockActivityData: ActivityData[] = [
  {
    id: '1',
    date: today,
    steps: 8547,
    distance: 6.2,
    calories: 342,
    activeMinutes: 67,
    floorsClimbed: 12,
    workouts: [
      {
        id: '1',
        type: 'running',
        duration: 35,
        calories: 285,
        startTime: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        endTime: new Date(today.getTime() - 1.5 * 60 * 60 * 1000),
        heartRate: { avg: 145, max: 168, min: 120 }
      }
    ]
  },
  {
    id: '2',
    date: yesterday,
    steps: 12340,
    distance: 8.9,
    calories: 456,
    activeMinutes: 89,
    floorsClimbed: 18,
    workouts: []
  }
];

export const mockSleepData: SleepData[] = [
  {
    id: '1',
    date: yesterday,  // ← Changed to yesterday (sleep from last night)
    bedTime: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000), // 10 PM yesterday
    wakeTime: new Date(today.getTime() + 6 * 60 * 60 * 1000),     // 6 AM today
    totalSleep: 450, // 7.5 hours (10 PM - 6:30 AM with 30 mins awake)
    deepSleep: 135,
    lightSleep: 225,
    remSleep: 90,
    awakeTime: 30,   // Increased for realism
    sleepScore: 85,
    bloodOxygen: [98, 97, 98, 99, 97, 98],
    snoreDetection: {
      totalSnoreTime: 12,
      snoreEvents: 3
    }
  }
];

export const mockNutritionData: NutritionData[] = [
  {
    id: '1',
    date: today,
    meals: [
      {
        id: '1',
        type: 'breakfast',
        timestamp: new Date(today.getTime() - 6 * 60 * 60 * 1000),
        foods: [
          {
            id: '1',
            name: 'Oatmeal with Berries',
            quantity: 1,
            unit: 'bowl',
            calories: 320,
            protein: 12,
            carbs: 58,
            fat: 6,
            fiber: 8
          }
        ],
        totalCalories: 320 // Added meal-level total
      },
      {
        id: '2',
        type: 'lunch',
        timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        foods: [
          {
            id: '2',
            name: 'Grilled Chicken Salad',
            quantity: 1,
            unit: 'serving',
            calories: 450,
            protein: 35,
            carbs: 15,
            fat: 28,
            fiber: 6
          }
        ],
        totalCalories: 450 // Added meal-level total
      }
    ],
    waterIntake: 1800,
    totalCalories: 770,
    macros: {
      protein: 47,
      carbs: 73,
      fat: 34,
      fiber: 14
    }
  }
];

export const mockStressData: StressData[] = [
  {
    id: '1',
    date: today,
    stressLevel: 35,
    hrvReadings: [
      { timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000), value: 45, heartRate: 72 },
      { timestamp: new Date(today.getTime() - 1 * 60 * 60 * 1000), value: 42, heartRate: 75 },
      { timestamp: new Date(today.getTime()), value: 48, heartRate: 68 }
    ],
    breathingExercises: [
      {
        id: '1',
        duration: 5,
        type: 'calm',
        completedAt: new Date(today.getTime() - 3 * 60 * 60 * 1000)
      }
    ],
    moodEntries: [
      {
        id: '1',
        mood: 'good',
        notes: 'Feeling energized after morning workout',
        timestamp: new Date(today.getTime() - 4 * 60 * 60 * 1000)
      }
    ]
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Global Wellness Month',
    description: 'Walk 300,000 steps this month with the community',
    type: 'steps',
    goal: 300000,
    unit: 'steps',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    participants: 45672,
    isJoined: true,
    progress: 0.34,
    reward: 'Wellness Champion Badge'
  },
  {
    id: '2',
    title: '7-Day Sleep Challenge',
    description: 'Get 8 hours of quality sleep for 7 consecutive days',
    type: 'sleep',
    goal: 7,
    unit: 'days',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    participants: 12834,
    isJoined: false,
    progress: 0,
    reward: 'Sleep Master Badge'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first 1,000 steps',
    icon: 'Footprints', // Changed to match Lucide icon name
    category: 'activity',
    unlockedAt: new Date('2024-12-01'),
    progress: 1000,
    target: 1000,
    isUnlocked: true // Added for clarity
  },
  {
    id: '2',
    title: 'Marathon Walker',
    description: 'Walk 100,000 steps in a month',
    icon: 'Trophy', // Changed to match Lucide icon name
    category: 'activity',
    progress: 67543,
    target: 100000,
    isUnlocked: false
  },
  {
    id: '3',
    title: 'Sleep Champion',
    description: 'Maintain 8+ hours of sleep for 30 days',
    icon: 'Moon', // Changed to match Lucide icon name
    category: 'sleep',
    progress: 12,
    target: 30,
    isUnlocked: false
  }
];

export const mockHealthGoals: HealthGoal[] = [
  {
    id: '1',
    type: 'steps',
    target: 10000,
    current: 8547,
    unit: 'steps',
    isActive: true
  },
  {
    id: '2',
    type: 'calories',
    target: 400,
    current: 342,
    unit: 'cal',
    isActive: true
  },
  {
    id: '3',
    type: 'sleep',
    target: 8,
    current: 7.5,
    unit: 'hours',
    isActive: true
  },
  {
    id: '4',
    type: 'water',
    target: 2000,
    current: 1800,
    unit: 'ml',
    isActive: true
  }
];

export const workoutTypes = [
  { id: 'running', name: 'Running', icon: 'Zap' },
  { id: 'walking', name: 'Walking', icon: 'Footprints' },
  { id: 'cycling', name: 'Cycling', icon: 'Bike' },
  { id: 'swimming', name: 'Swimming', icon: 'Waves' },
  { id: 'hiit', name: 'HIIT', icon: 'Flame' },
  { id: 'yoga', name: 'Yoga', icon: 'Heart' },
  { id: 'strength', name: 'Strength Training', icon: 'Dumbbell' },
  { id: 'cardio', name: 'Cardio', icon: 'Activity' },
  { id: 'pilates', name: 'Pilates', icon: 'Circle' },
  { id: 'dance', name: 'Dance', icon: 'Music' },
  { id: 'boxing', name: 'Boxing', icon: 'Shield' },
  { id: 'tennis', name: 'Tennis', icon: 'Circle' }
];

export const foodDatabase = [
  { id: '1', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1 },
  { id: '2', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 },
  { id: '3', name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  { id: '4', name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5 },
  { id: '5', name: 'Greek Yogurt (1 cup)', calories: 130, protein: 23, carbs: 9, fat: 0, fiber: 0 },
  { id: '6', name: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5 },
  { id: '7', name: 'Salmon (100g)', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0 },
  { id: '8', name: 'Avocado (1 medium)', calories: 234, protein: 3, carbs: 12, fat: 21, fiber: 10 }
];
