import React from 'react';
import { X, Award, Sparkles, Check, Lock, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

export interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlocked: boolean;
  xpValue: number;
}

interface MilestoneBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadgeIds: string[];
}

export const ALL_BADGES: Omit<MilestoneBadge, 'unlocked'>[] = [
  {
    id: 'badge-highlight-1',
    title: 'Golden Aim',
    description: 'Completed your #1 Daily Highlight',
    icon: '🎯',
    category: 'Focus',
    xpValue: 50,
  },
  {
    id: 'badge-water-1',
    title: 'Ocean Mind',
    description: 'Reached 100% of your daily hydration goal',
    icon: '💧',
    category: 'Wellness',
    xpValue: 40,
  },
  {
    id: 'badge-inertia-1',
    title: 'Inertia Breaker',
    description: 'Overcame starting resistance with a 5-minute buster',
    icon: '⚡',
    category: 'Momentum',
    xpValue: 30,
  },
  {
    id: 'badge-breath-1',
    title: 'Zen Center',
    description: 'Completed a 60-second box breathing reset',
    icon: '🧘',
    category: 'Calm',
    xpValue: 25,
  },
  {
    id: 'badge-bloom-1',
    title: 'Master Gardener',
    description: 'Nurtured the garden to a full bloom lotus (100% growth)',
    icon: '🌸',
    category: 'Growth',
    xpValue: 50,
  },
  {
    id: 'badge-compass-1',
    title: 'Compass Sage',
    description: 'Logged an intentional evening review',
    icon: '🪞',
    category: 'Reflection',
    xpValue: 35,
  },
  {
    id: 'badge-streak-3',
    title: 'Consistency Alchemist',
    description: 'Maintained a 3+ day streak of mindful flow',
    icon: '🔥',
    category: 'Habits',
    xpValue: 60,
  },
  {
    id: 'badge-tip-1',
    title: 'Wisdom Practitioner',
    description: 'Applied a daily golden productivity principle',
    icon: '✨',
    category: 'Wisdom',
    xpValue: 30,
  },
];

export const MilestoneBadgesModal: React.FC<MilestoneBadgesModalProps> = ({
  isOpen,
  onClose,
  unlockedBadgeIds,
}) => {
  if (!isOpen) return null;

  const unlockedCount = unlockedBadgeIds.length;
  const totalCount = ALL_BADGES.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-7 shadow-soft-lg border border-pastel-border animate-pop overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-pastel-peach-100 flex items-center justify-center text-pastel-peach-500 shadow-soft-sm">
              <Trophy className="w-4 h-4 fill-pastel-peach-300 text-pastel-peach-500" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">Aura Milestone Badges</h3>
              <p className="text-xs text-slate-400">
                Unlocked {unlockedCount} of {totalCount} Badges ({pct}%)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="py-3">
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
            <div
              className="h-full bg-gradient-to-r from-pastel-peach-300 via-pastel-lilac-300 to-pastel-sage-300 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="flex-1 overflow-y-auto py-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_BADGES.map(badge => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-white to-pastel-cream/70 border-pastel-border shadow-soft-sm'
                    : 'bg-stone-50/50 border-stone-200/60 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-soft-sm ${
                    isUnlocked
                      ? 'bg-pastel-peach-50 border border-pastel-peach-200 animate-float'
                      : 'bg-stone-100 border border-stone-200 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {badge.title}
                    </h4>
                    {isUnlocked ? (
                      <span className="text-[10px] text-pastel-sage-500 font-bold">✓</span>
                    ) : (
                      <Lock className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-bold text-pastel-butter-500 mt-1 block">
                    +{badge.xpValue} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
