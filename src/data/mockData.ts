import { 
  ActivityData, 
  SleepData, 
  NutritionData, 
  StressData, 
  Challenge, 
  Achievement, 
  HealthGoal,
  User,
  Meal,
  Workout
} from '../types/health';

// Helper function for consistent date handling
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

// Generate dates for the past 7 days
const generatePastDates = (days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates.reverse();
};

const past7Days = generatePastDates(7);

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  joinDate: new Date('2023-01-15'),
};

export const mockActivityData: ActivityData[] = past7Days.map((date, index) => ({
  id: `activity-${index + 1}`,
  date,
  steps: Math.floor(8000 + Math.random() * 6000),
  distance: Math.floor(5 + Math.random() * 4),
  calories: Math.floor(300 + Math.random() * 200),
  activeMinutes: Math.floor(60 + Math.random() * 40),
  floorsClimbed: Math.floor(10 + Math.random() * 15),
  workouts: index % 2 === 0 ? [
    {
      id: `workout-${index + 1}`,
      type: ['running', 'walking', 'cycling', 'yoga'][index % 4] as Workout['type'],
      duration: Math.floor(30 + Math.random() * 30),
      calories: Math.floor(200 + Math.random() * 150),
      startTime: new Date(date.getTime() + 8 * 60 * 60 * 1000),
      endTime: new Date(date.getTime() + 9 * 60 * 60 * 1000),
      heartRate: { 
        avg: Math.floor(120 + Math.random() * 40),
        max: Math.floor(150 + Math.random() * 30),
        min: Math.floor(60 + Math.random() * 20)
      }
    }
  ] : []
}));

export const mockSleepData: SleepData[] = past7Days.map((date, index) => {
  const sleepDate = new Date(date);
  sleepDate.setDate(sleepDate.getDate() - 1); // Sleep from previous night
  
  return {
    id: `sleep-${index + 1}`,
    date: sleepDate,
    bedTime: new Date(sleepDate.getTime() + 22 * 60 * 60 * 1000), // 10 PM
    wakeTime: new Date(date.getTime() + 6 * 60 * 60 * 1000), // 6 AM next day
    totalSleep: Math.floor(420 + Math.random() * 60), // 7-8 hours
    deepSleep: Math.floor(100 + Math.random() * 50),
    lightSleep: Math.floor(200 + Math.random() * 50),
    remSleep: Math.floor(80 + Math.random() * 40),
    awakeTime: Math.floor(20 + Math.random() * 20),
    sleepScore: Math.floor(70 + Math.random() * 25),
    bloodOxygen: Array(6).fill(0).map(() => Math.floor(95 + Math.random() * 4)),
    snoreDetection: {
      totalSnoreTime: Math.floor(Math.random() * 20),
      snoreEvents: Math.floor(Math.random() * 5)
    }
  };
});

export const mockNutritionData: NutritionData[] = past7Days.map((date, index) => {
  const meals: Meal[] = [
    {
      id: `meal-${index}-1`,
      type: 'breakfast',
      timestamp: new Date(date.getTime() + 8 * 60 * 60 * 1000), // 8 AM
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
      ]
    },
    {
      id: `meal-${index}-2`,
      type: 'lunch',
      timestamp: new Date(date.getTime() + 13 * 60 * 60 * 1000), // 1 PM
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
      ]
    }
  ];

  const totalCalories = meals.reduce((sum, meal) => 
    sum + meal.foods.reduce((mealSum, food) => mealSum + food.calories, 0), 0
  );

  const totalProtein = meals.reduce((sum, meal) => 
    sum + meal.foods.reduce((mealSum, food) => mealSum + food.protein, 0), 0
  );

  const totalCarbs = meals.reduce((sum, meal) => 
    sum + meal.foods.reduce((mealSum, food) => mealSum + food.carbs, 0), 0
  );

  const totalFat = meals.reduce((sum, meal) => 
    sum + meal.foods.reduce((mealSum, food) => mealSum + food.fat, 0), 0
  );

  return {
    id: `nutrition-${index + 1}`,
    date,
    meals,
    waterIntake: Math.floor(1500 + Math.random() * 1000),
    totalCalories,
    macros: {
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: 14
    }
  };
});

export const mockStressData: StressData[] = past7Days.map((date, index) => ({
  id: `stress-${index + 1}`,
  date,
  stressLevel: Math.floor(20 + Math.random() * 40),
  hrvReadings: Array(3).fill(0).map((_, i) => ({
    timestamp: new Date(date.getTime() + (i + 1) * 3 * 60 * 60 * 1000),
    value: Math.floor(35 + Math.random() * 20),
    heartRate: Math.floor(60 + Math.random() * 20)
  })),
  breathingExercises: index % 3 === 0 ? [
    {
      id: `breathing-${index + 1}`,
      duration: 5,
      type: 'calm',
      completedAt: new Date(date.getTime() + 10 * 60 * 60 * 1000)
    }
  ] : [],
  moodEntries: [
    {
      id: `mood-${index + 1}`,
      mood: ['good', 'neutral', 'excellent'][index % 3] as 'good' | 'neutral' | 'excellent',
      notes: 'Feeling good today',
      timestamp: new Date(date.getTime() + 12 * 60 * 60 * 1000)
    }
  ]
}));

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
    icon: 'Footprints',
    category: 'activity',
    unlockedAt: new Date('2024-12-01'),
    progress: 1000,
    target: 1000
  },
  {
    id: '2',
    title: 'Marathon Walker',
    description: 'Walk 100,000 steps in a month',
    icon: 'Trophy',
    category: 'activity',
    progress: 67543,
    target: 100000
  },
  {
    id: '3',
    title: 'Sleep Champion',
    description: 'Maintain 8+ hours of sleep for 30 days',
    icon: 'Moon',
    category: 'sleep',
    progress: 12,
    target: 30
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
