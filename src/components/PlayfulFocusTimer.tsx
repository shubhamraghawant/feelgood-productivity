import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Coffee, Smile, Compass, Zap } from 'lucide-react';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';
import { sendLocalNotification } from '../utils/notifications';

interface PlayfulFocusTimerProps {
  onRewardXp: (amount: number) => void;
}

export const PlayfulFocusTimer: React.FC<PlayfulFocusTimerProps> = ({ onRewardXp }) => {
  const [mode, setMode] = useState<'inertia' | 'pomodoro' | 'flow' | 'break'>('inertia');
  const [durationMinutes, setDurationMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [funPromptIndex, setFunPromptIndex] = useState(0);

  const funPrompts = [
    '✨ "What would this look like if it were fun?"',
    '🍵 Grab a comforting cup of tea or cool water first.',
    '🎧 Put on the 40Hz Gamma Focus audio in the header!',
    '🎯 Lower the stakes: aim for a messy B+ draft, not perfection.',
    '🏎️ Race the timer: can you complete the first step in 3 minutes?',
  ];

  const handleSelectMode = (newMode: 'inertia' | 'pomodoro' | 'flow' | 'break', mins: number) => {
    sound.playPop();
    setMode(newMode);
    setDurationMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      sound.playLevelUp();
      firePastelConfetti();
      sendLocalNotification(
        'Focus Session Completed!',
        'Awesome work! Take a breath and drink some water. 🎉'
      );
      onRewardXp(mode === 'break' ? 5 : 30);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, mode, onRewardXp]);

  const toggleTimer = () => {
    sound.playPop();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    sound.playPop();
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  };

  const nextFunPrompt = () => {
    sound.playPop();
    setFunPromptIndex((funPromptIndex + 1) % funPrompts.length);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalSecs = durationMinutes * 60;
  const progressPct = ((totalSecs - secondsLeft) / totalSecs) * 100;
  const strokeDashoffset = 283 - (283 * progressPct) / 100;

  return (
    <div className="bg-white rounded-3xl p-6 border border-pastel-border shadow-soft-md transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-pastel-lilac-100 flex items-center justify-center text-pastel-lilac-500 shadow-soft-sm">
            <Zap className="w-5 h-5 text-pastel-lilac-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Playful Focus Sprint</h3>
            <p className="text-xs text-slate-400 font-medium">Gentle timers, zero stress</p>
          </div>
        </div>

        {/* Fun prompt rotator */}
        <button
          onClick={nextFunPrompt}
          className="text-[11px] font-semibold text-pastel-lilac-500 hover:text-pastel-lilac-600 bg-pastel-lilac-50 hover:bg-pastel-lilac-100 px-2.5 py-1 rounded-full border border-pastel-lilac-200 transition"
          title="Click to roll another feel-good prompt"
        >
          💡 Spark
        </button>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 rounded-2xl mb-5 text-xs font-semibold">
        <button
          onClick={() => handleSelectMode('inertia', 5)}
          className={`py-1.5 rounded-xl transition ${
            mode === 'inertia' ? 'bg-white text-slate-800 shadow-soft-sm font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          5m Buster
        </button>
        <button
          onClick={() => handleSelectMode('pomodoro', 25)}
          className={`py-1.5 rounded-xl transition ${
            mode === 'pomodoro' ? 'bg-white text-slate-800 shadow-soft-sm font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          25m Sprint
        </button>
        <button
          onClick={() => handleSelectMode('flow', 45)}
          className={`py-1.5 rounded-xl transition ${
            mode === 'flow' ? 'bg-white text-slate-800 shadow-soft-sm font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          45m Flow
        </button>
        <button
          onClick={() => handleSelectMode('break', 5)}
          className={`py-1.5 rounded-xl transition ${
            mode === 'break' ? 'bg-white text-slate-800 shadow-soft-sm font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          5m Break
        </button>
      </div>

      {/* Circular Animated Pastel Timer */}
      <div className="flex flex-col items-center justify-center my-3">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#F1EFE9"
              strokeWidth="6"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="url(#pastelGradient)"
              strokeWidth="6"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="pastelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8B4FE" />
                <stop offset="50%" stopColor="#86EFAC" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time In Center */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-3xl font-extrabold tracking-tight text-slate-800 font-mono">
              {timeFormatted}
            </span>
            <span className="text-[11px] font-bold text-slate-400 capitalize mt-0.5">
              {mode === 'inertia' ? 'Inertia Buster' : mode}
            </span>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={toggleTimer}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all shadow-soft-md active:scale-95 ${
              isRunning ? 'bg-pastel-peach-500 hover:bg-pastel-peach-600' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>
          <button
            onClick={resetTimer}
            className="w-10 h-10 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-600 flex items-center justify-center transition active:scale-95"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Playful Prompt Card */}
      <div className="mt-4 p-3 rounded-2xl bg-pastel-cream border border-pastel-border text-center">
        <p className="text-xs text-slate-600 font-medium italic">
          {funPrompts[funPromptIndex]}
        </p>
      </div>
    </div>
  );
};
