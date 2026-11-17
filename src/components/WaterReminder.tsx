import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Minus, Bell, BellOff, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { WaterState } from '../types';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';
import { requestNotificationPermission, sendLocalNotification } from '../utils/notifications';

interface WaterReminderProps {
  water: WaterState;
  onUpdateWater: (updater: (prev: WaterState) => WaterState) => void;
  onRewardXp: (amount: number) => void;
}

export const WaterReminder: React.FC<WaterReminderProps> = ({
  water,
  onUpdateWater,
  onRewardXp,
}) => {
  const [minutesLeft, setMinutesLeft] = useState<number>(water.reminderIntervalMinutes);
  const [intervalSettingOpen, setIntervalSettingOpen] = useState(false);

  const percentage = Math.min(100, Math.round((water.currentMl / water.targetMl) * 100));
  const glasses = (water.currentMl / 250).toFixed(1).replace('.0', '');
  const targetGlasses = (water.targetMl / 250).toFixed(0);

  // Interval timer for water reminder
  useEffect(() => {
    if (!water.remindersEnabled) return;

    const timer = setInterval(() => {
      setMinutesLeft(prev => {
        if (prev <= 1) {
          // Trigger water reminder!
          sendLocalNotification(
            'Hydration Check!',
            'Time for a refreshing glass of water. Keep your energy high! 💧'
          );
          return water.reminderIntervalMinutes;
        }
        return prev - 1;
      });
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [water.remindersEnabled, water.reminderIntervalMinutes]);

  const addWater = (amount: number) => {
    sound.playWaterDrop();
    onUpdateWater(prev => {
      const nextMl = Math.max(0, prev.currentMl + amount);
      const wasGoalMet = prev.currentMl >= prev.targetMl;
      const isNowGoalMet = nextMl >= prev.targetMl;

      if (!wasGoalMet && isNowGoalMet) {
        firePastelConfetti();
        sound.playLevelUp();
        onRewardXp(40);
      } else if (amount > 0) {
        onRewardXp(10);
      }

      return {
        ...prev,
        currentMl: nextMl,
      };
    });
  };

  const toggleReminders = async () => {
    sound.playPop();
    if (!water.remindersEnabled) {
      await requestNotificationPermission();
    }
    onUpdateWater(prev => ({
      ...prev,
      remindersEnabled: !prev.remindersEnabled,
    }));
  };

  const setReminderInterval = (mins: number) => {
    sound.playPop();
    onUpdateWater(prev => ({
      ...prev,
      reminderIntervalMinutes: mins,
    }));
    setMinutesLeft(mins);
    setIntervalSettingOpen(false);
  };

  const handleTestChime = () => {
    sendLocalNotification(
      'Hydration Reminder Test',
      'Gentle chime test: Take a sip of water! 💧'
    );
  };

  const resetToday = () => {
    sound.playPop();
    onUpdateWater(prev => ({
      ...prev,
      currentMl: 0,
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-pastel-border shadow-soft-md transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-pastel-sky-100 flex items-center justify-center text-pastel-sky-500 shadow-soft-sm">
            <Droplets className="w-5 h-5 fill-pastel-sky-400 text-pastel-sky-500" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Hydration Flow</h3>
            <p className="text-xs text-slate-400 font-medium">
              Goal: {water.targetMl}ml (~{targetGlasses} glasses)
            </p>
          </div>
        </div>

        {/* Reminder Toggle Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleReminders}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
              water.remindersEnabled
                ? 'bg-pastel-sky-100 text-pastel-sky-500 border-pastel-sky-200'
                : 'bg-stone-50 text-slate-400 border-stone-200 hover:bg-stone-100'
            }`}
            title="Toggle regular hydration reminders"
          >
            {water.remindersEnabled ? (
              <>
                <Bell className="w-3.5 h-3.5 fill-pastel-sky-400 text-pastel-sky-500 animate-bounce" />
                <span>Every {water.reminderIntervalMinutes}m</span>
              </>
            ) : (
              <>
                <BellOff className="w-3.5 h-3.5 text-slate-400" />
                <span>Muted</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Hydration Visual & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Animated Pastel Water Glass / Bottle */}
        <div className="sm:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-28 h-36 bg-pastel-sky-50/80 rounded-b-3xl rounded-t-xl border-2 border-pastel-sky-200 p-1 flex flex-col justify-end overflow-hidden shadow-inner group">
            {/* Water Wave Fill */}
            <div
              className="w-full bg-gradient-to-t from-pastel-sky-300 to-pastel-sky-200 rounded-b-2xl transition-all duration-700 ease-out relative flex items-center justify-center"
              style={{ height: `${Math.min(100, Math.max(8, percentage))}%` }}
            >
              {/* Little wave ripple line on top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 animate-pulse" />
              {percentage >= 20 && (
                <span className="text-[11px] font-bold text-white/90 drop-shadow-sm select-none">
                  {percentage}%
                </span>
              )}
            </div>

            {/* Glass Highlights / Reflections */}
            <div className="absolute top-3 left-2 w-1.5 h-20 bg-white/60 rounded-full pointer-events-none" />
            <div className="absolute top-3 right-2 w-1 h-12 bg-white/30 rounded-full pointer-events-none" />
          </div>

          <span className="text-xs font-bold text-slate-600 mt-2">
            {water.currentMl} / {water.targetMl} ml
          </span>
        </div>

        {/* Info & Fast Add Controls */}
        <div className="sm:col-span-8 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-600">Daily Hydration Target</span>
              <span className="font-bold text-pastel-sky-500">{percentage}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-pastel-sky-300 to-pastel-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {water.currentMl >= water.targetMl ? (
                <span className="text-pastel-sage-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Reached! Peak cognitive clarity unlocked.
                </span>
              ) : (
                `Logged ${glasses} glasses today. ${Math.max(0, water.targetMl - water.currentMl)}ml remaining.`
              )}
            </p>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => addWater(250)}
              className="flex-1 min-w-[90px] py-2 px-3 rounded-2xl bg-pastel-sky-50 hover:bg-pastel-sky-100 text-pastel-sky-500 border border-pastel-sky-200 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-soft-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+250ml</span>
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex-1 min-w-[90px] py-2 px-3 rounded-2xl bg-pastel-sky-100 hover:bg-pastel-sky-200 text-pastel-sky-500 border border-pastel-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-soft-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+500ml</span>
            </button>
            <button
              onClick={() => addWater(100)}
              className="py-2 px-3 rounded-2xl bg-stone-50 hover:bg-stone-100 text-slate-600 border border-stone-200 font-semibold text-xs flex items-center justify-center gap-1 transition active:scale-95"
              title="Small sip (+100ml)"
            >
              <Plus className="w-3 h-3" /> 100ml
            </button>
            <button
              onClick={() => addWater(-250)}
              disabled={water.currentMl <= 0}
              className="py-2 px-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100 text-slate-400 hover:text-slate-600 border border-stone-200 text-xs disabled:opacity-40 transition active:scale-95"
              title="Undo 250ml"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reminder Config & Quick Test */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          {water.remindersEnabled && (
            <span className="text-[11px] bg-pastel-sky-50 px-2 py-0.5 rounded-full text-pastel-sky-500 font-medium">
              Next chime in ~{minutesLeft}m
            </span>
          )}
          <button
            onClick={() => setIntervalSettingOpen(!intervalSettingOpen)}
            className="text-slate-500 hover:text-slate-800 underline font-medium text-[11px]"
          >
            Adjust Interval
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestChime}
            className="text-[11px] font-semibold text-pastel-sky-500 hover:underline"
          >
            🔔 Test Reminder
          </button>
          <button
            onClick={resetToday}
            className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
            title="Reset today's water count"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Interval Selector Dropdown */}
      {intervalSettingOpen && (
        <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600 mr-1">Reminder frequency:</span>
          {[30, 45, 60, 90].map(mins => (
            <button
              key={mins}
              onClick={() => setReminderInterval(mins)}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                water.reminderIntervalMinutes === mins
                  ? 'bg-pastel-sky-200 text-pastel-sky-500 border border-pastel-sky-300'
                  : 'bg-white text-slate-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {mins} mins
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
