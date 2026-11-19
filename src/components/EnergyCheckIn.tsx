import React from 'react';
import { Zap, Feather, Cloud, Waves, Sparkles, ArrowRight } from 'lucide-react';
import { EnergyMood } from '../types';
import { sound } from '../utils/audio';

interface EnergyCheckInProps {
  currentMood?: EnergyMood;
  onSelectMood: (mood: EnergyMood) => void;
  onOpenBreathing: () => void;
  onStartTimer: () => void;
}

export const EnergyCheckIn: React.FC<EnergyCheckInProps> = ({
  currentMood,
  onSelectMood,
  onOpenBreathing,
  onStartTimer,
}) => {
  const moods: {
    id: EnergyMood;
    label: string;
    icon: React.ReactNode;
    color: string;
    advice: string;
    actionLabel?: string;
    actionType?: 'breathe' | 'timer';
  }[] = [
    {
      id: 'peak',
      label: 'Peak Flow',
      icon: <Zap className="w-3.5 h-3.5" />,
      color: 'bg-pastel-peach-100 text-pastel-peach-500 border-pastel-peach-200',
      advice: 'High dopamine & focus state. Perfect window for your #1 Daily Highlight!',
      actionLabel: 'Launch Sprint →',
      actionType: 'timer',
    },
    {
      id: 'calm',
      label: 'Calm & Steady',
      icon: <Feather className="w-3.5 h-3.5" />,
      color: 'bg-pastel-sage-100 text-pastel-sage-500 border-pastel-sage-200',
      advice: 'Grounded nervous system. Excellent for writing, reading, and steady execution.',
    },
    {
      id: 'sluggish',
      label: 'Sluggish',
      icon: <Cloud className="w-3.5 h-3.5" />,
      color: 'bg-pastel-sky-100 text-pastel-sky-500 border-pastel-sky-200',
      advice: 'Biological friction. Sip cool water, step outside, or do a gentle 5-minute buster.',
      actionLabel: '5m Buster →',
      actionType: 'timer',
    },
    {
      id: 'overwhelmed',
      label: 'Overwhelmed',
      icon: <Waves className="w-3.5 h-3.5" />,
      color: 'bg-pastel-rose-100 text-pastel-rose-500 border-pastel-rose-200',
      advice: 'Too many open mental loops. Reset with 60 seconds of box breathing and lower the stakes.',
      actionLabel: 'Box Breathe →',
      actionType: 'breathe',
    },
  ];

  const activeMoodObj = moods.find(m => m.id === currentMood);

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white/80 border border-stone-200/70 shadow-soft-sm transition-all space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-pastel-lilac-100 flex items-center justify-center text-pastel-lilac-500 text-xs">
            ✦
          </span>
          <span className="text-xs font-bold text-slate-700">How is your energy right now?</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
          Adaptive Flow
        </span>
      </div>

      {/* Mood Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {moods.map(m => {
          const isSelected = currentMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                sound.playPop();
                onSelectMood(m.id);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-semibold border transition-all active:scale-95 ${
                isSelected
                  ? `${m.color} font-bold shadow-soft-sm scale-[1.02]`
                  : 'bg-stone-50 hover:bg-stone-100 text-slate-600 border-stone-200/60'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Advice & Action Banner */}
      {activeMoodObj && (
        <div className="p-3 rounded-2xl bg-pastel-cream/80 border border-pastel-border flex flex-wrap items-center justify-between gap-2 text-xs animate-pop">
          <p className="text-slate-600 font-medium italic flex items-center gap-1.5 flex-1 min-w-[200px]">
            <Sparkles className="w-3.5 h-3.5 text-pastel-butter-500 shrink-0" />
            <span>{activeMoodObj.advice}</span>
          </p>

          {activeMoodObj.actionLabel && (
            <button
              onClick={() => {
                sound.playPop();
                if (activeMoodObj.actionType === 'breathe') {
                  onOpenBreathing();
                } else {
                  onStartTimer();
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] transition shadow-soft-sm ml-auto"
            >
              {activeMoodObj.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
