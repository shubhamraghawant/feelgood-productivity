export type Priority = 'low' | 'medium' | 'high';

export type TaskCategory = 'highlight' | 'deep-work' | 'admin' | 'recharge' | 'health';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  category: TaskCategory;
  priority: Priority;
  time?: string; // e.g. "14:30"
  date: string; // "YYYY-MM-DD"
  completed: boolean;
  completedAt?: string;
  xpReward: number;
}

export type EnergyZone = 'creative' | 'admin' | 'recharge' | 'play' | 'highlight';

export interface CalendarBlock {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "09:00"
  endTime: string; // "10:30"
  zone: EnergyZone;
  energyLevel: 'high' | 'medium' | 'low';
  completed: boolean;
  notes?: string;
}

export type TipCategory = 'Energize' | 'Unblock' | 'Sustain' | 'Mindset' | 'Focus';

export interface DailyTip {
  id: string;
  title: string;
  quote: string;
  takeaway: string;
  actionableStep: string;
  category: TipCategory;
  source: string;
  chapter?: string;
  tags: string[];
}

export interface WaterState {
  currentMl: number;
  targetMl: number;
  reminderIntervalMinutes: number; // 30, 45, 60, 90
  remindersEnabled: boolean;
  lastReminderTime?: number;
  streakDays: number;
  lastLoggedDate: string; // "YYYY-MM-DD"
}

export type EnergyMood = 'peak' | 'calm' | 'sluggish' | 'overwhelmed';

export interface CompassReflection {
  date: string;
  energized: string;
  drained: string;
  experiment: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'focus' | 'wellness' | 'mindset' | 'growth';
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  dailyHighlightDone: boolean;
  completedTasksCount: number;
  tipsAppliedCount: number;
  appliedTipsToday: string[];
  favoriteTips: string[];
  currentMood?: EnergyMood;
  gardenGrowth: number; // 0 to 100
  unlockedBadges: string[];
  reflections: CompassReflection[];
  breathingSessionsCount: number;
}
