import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sun, 
  Moon, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Layers,
  BatteryCharging,
  Zap
} from 'lucide-react';
import { CalendarBlock, EnergyZone } from '../types';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

interface UniqueCalendarProps {
  blocks: CalendarBlock[];
  onAddBlock: (block: Omit<CalendarBlock, 'id'>) => void;
  onDeleteBlock: (id: string) => void;
  onToggleCompleteBlock: (id: string) => void;
  onRewardXp: (amount: number) => void;
}

export const UniqueCalendar: React.FC<UniqueCalendarProps> = ({
  blocks,
  onAddBlock,
  onDeleteBlock,
  onToggleCompleteBlock,
  onRewardXp,
}) => {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [scheduleType, setScheduleType] = useState<'actual' | 'ideal'>('actual');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for adding custom block
  const [newTitle, setNewTitle] = useState('');
  const [newStart, setNewStart] = useState('09:00');
  const [newEnd, setNewEnd] = useState('10:30');
  const [newZone, setNewZone] = useState<EnergyZone>('highlight');
  const [newEnergy, setNewEnergy] = useState<'high' | 'medium' | 'low'>('high');

  const zoneColors: Record<EnergyZone, { bg: string; text: string; border: string; label: string }> = {
    highlight: { bg: 'bg-pastel-rose-100', text: 'text-pastel-rose-500', border: 'border-pastel-rose-200', label: '🎯 Daily Highlight' },
    creative: { bg: 'bg-pastel-lilac-100', text: 'text-pastel-lilac-500', border: 'border-pastel-lilac-200', label: '⚡ Creative Deep Work' },
    admin: { bg: 'bg-pastel-peach-100', text: 'text-pastel-peach-500', border: 'border-pastel-peach-200', label: '💌 Admin Batching' },
    recharge: { bg: 'bg-pastel-sage-100', text: 'text-pastel-sage-500', border: 'border-pastel-sage-200', label: '🌿 Guilt-Free Rest' },
    play: { bg: 'bg-pastel-butter-100', text: 'text-pastel-butter-500', border: 'border-pastel-butter-200', label: '🎮 Play & Joy' },
  };

  const handleQuickPreset = (preset: { title: string; start: string; end: string; zone: EnergyZone; energy: 'high' | 'medium' | 'low' }) => {
    sound.playPop();
    onAddBlock({
      title: preset.title,
      date: selectedDate,
      startTime: preset.start,
      endTime: preset.end,
      zone: preset.zone,
      energyLevel: preset.energy,
      completed: false,
    });
    onRewardXp(15);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.playPop();
    onAddBlock({
      title: newTitle.trim(),
      date: selectedDate,
      startTime: newStart,
      endTime: newEnd,
      zone: newZone,
      energyLevel: newEnergy,
      completed: false,
    });
    onRewardXp(15);
    setNewTitle('');
    setModalOpen(false);
  };

  const handleToggleBlock = (block: CalendarBlock) => {
    if (!block.completed) {
      sound.playLevelUp();
      firePastelConfetti();
      onRewardXp(25);
    } else {
      sound.playPop();
    }
    onToggleCompleteBlock(block.id);
  };

  // Filter blocks for selected date
  const dayBlocks = blocks
    .filter(b => b.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // 7 days for weekly view
  const getWeekDates = () => {
    const curr = new Date(selectedDate);
    const firstDay = curr.getDate() - curr.getDay() + 1; // Monday
    const week = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(curr.setDate(firstDay + i));
      week.push(nextDate.toISOString().split('T')[0]);
    }
    return week;
  };

  const weekDates = getWeekDates();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pastel-border shadow-soft-md transition-all">
      {/* Top Bar: Title, View Switcher & "Ideal Week" Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-pastel-butter-100 flex items-center justify-center text-pastel-butter-500 shadow-soft-sm">
            <CalendarIcon className="w-5 h-5 text-pastel-butter-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">Energy & Time Flow</h2>
              <span className="text-[11px] font-semibold bg-stone-100 px-2 py-0.5 rounded-full text-slate-500 border border-stone-200">
                Energy Timeboxing
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Align tasks with circadian energy instead of rigid hours
            </p>
          </div>
        </div>

        {/* View Controls & "Ideal vs Actual" Filter */}
        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* Ideal vs Actual Pill */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/80 text-xs">
            <button
              onClick={() => {
                sound.playPop();
                setScheduleType('actual');
              }}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                scheduleType === 'actual'
                  ? 'bg-white text-slate-800 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Actual Flow
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setScheduleType('ideal');
              }}
              className={`px-3 py-1 rounded-xl font-bold transition flex items-center gap-1 ${
                scheduleType === 'ideal'
                  ? 'bg-pastel-lilac-200 text-pastel-lilac-500 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Ideal Week Blueprint"
            >
              <Sparkles className="w-3 h-3" />
              <span>Ideal Week</span>
            </button>
          </div>

          {/* Day vs Week Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/80 text-xs">
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('day');
              }}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                viewMode === 'day' ? 'bg-white text-slate-800 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              24h Horizon
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('week');
              }}
              className={`px-3 py-1 rounded-xl font-bold transition ${
                viewMode === 'week' ? 'bg-white text-slate-800 shadow-soft-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Energy Matrix
            </button>
          </div>

          {/* Add Custom Block Button */}
          <button
            onClick={() => {
              sound.playPop();
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-pastel-sage-300" />
            <span>Timebox</span>
          </button>
        </div>
      </div>

      {/* Date Navigation Strip */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              const d = new Date(selectedDate);
              d.setDate(d.getDate() - 1);
              setSelectedDate(d.toISOString().split('T')[0]);
            }}
            className="p-1.5 rounded-xl hover:bg-stone-100 text-slate-500 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-bold text-slate-700">
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <button
            onClick={() => {
              sound.playPop();
              const d = new Date(selectedDate);
              d.setDate(d.getDate() + 1);
              setSelectedDate(d.toISOString().split('T')[0]);
            }}
            className="p-1.5 rounded-xl hover:bg-stone-100 text-slate-500 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setSelectedDate(new Date().toISOString().split('T')[0]);
            }}
            className="text-xs text-pastel-lilac-500 hover:underline font-semibold ml-2"
          >
            Today
          </button>
        </div>

        {/* Quick Timebox Presets Strip */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400">Quick Drop:</span>
          <button
            onClick={() => handleQuickPreset({
              title: '🎯 Daily Highlight Focus',
              start: '09:00',
              end: '10:30',
              zone: 'highlight',
              energy: 'high'
            })}
            className="px-2.5 py-1 rounded-xl bg-pastel-rose-50 hover:bg-pastel-rose-100 text-pastel-rose-500 border border-pastel-rose-200 text-xs font-semibold transition"
          >
            + Highlight 90m
          </button>
          <button
            onClick={() => handleQuickPreset({
              title: '⚡ Deep Work Sprint',
              start: '11:00',
              end: '11:45',
              zone: 'creative',
              energy: 'high'
            })}
            className="px-2.5 py-1 rounded-xl bg-pastel-lilac-50 hover:bg-pastel-lilac-100 text-pastel-lilac-500 border border-pastel-lilac-200 text-xs font-semibold transition"
          >
            + Sprint 45m
          </button>
          <button
            onClick={() => handleQuickPreset({
              title: '💌 Batched Admin & Inbox',
              start: '16:00',
              end: '16:45',
              zone: 'admin',
              energy: 'low'
            })}
            className="px-2.5 py-1 rounded-xl bg-pastel-peach-50 hover:bg-pastel-peach-100 text-pastel-peach-500 border border-pastel-peach-200 text-xs font-semibold transition"
          >
            + Admin Batch 45m
          </button>
          <button
            onClick={() => handleQuickPreset({
              title: '🌿 Guilt-Free Walk / Recharge',
              start: '17:30',
              end: '18:15',
              zone: 'recharge',
              energy: 'low'
            })}
            className="px-2.5 py-1 rounded-xl bg-pastel-sage-50 hover:bg-pastel-sage-100 text-pastel-sage-500 border border-pastel-sage-200 text-xs font-semibold transition"
          >
            + Rest 45m
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: 24h Horizon & Day Flow */}
      {viewMode === 'day' ? (
        <div className="space-y-4">
          {/* Circadian Energy Guidance Banner */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs p-2.5 rounded-2xl bg-pastel-cream border border-pastel-border">
            <div className="p-1.5 rounded-xl bg-pastel-rose-50/60 border border-pastel-rose-200/50">
              <span className="font-bold text-pastel-rose-500 block">🌅 08:00 - 12:00</span>
              <span className="text-[10px] text-slate-500">Peak Creative (Highlight)</span>
            </div>
            <div className="p-1.5 rounded-xl bg-pastel-butter-50/60 border border-pastel-butter-200/50">
              <span className="font-bold text-pastel-butter-500 block">☀️ 12:00 - 14:00</span>
              <span className="text-[10px] text-slate-500">Social / Collaboration</span>
            </div>
            <div className="p-1.5 rounded-xl bg-pastel-peach-50/60 border border-pastel-peach-200/50">
              <span className="font-bold text-pastel-peach-500 block">☕ 14:00 - 17:00</span>
              <span className="text-[10px] text-slate-500">Admin & Execution</span>
            </div>
            <div className="p-1.5 rounded-xl bg-pastel-sage-50/60 border border-pastel-sage-200/50">
              <span className="font-bold text-pastel-sage-500 block">🌙 17:00 - 22:00</span>
              <span className="text-[10px] text-slate-500">Guilt-Free Recharge</span>
            </div>
          </div>

          {/* Visual 24h Horizon Bar */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>06:00 Dawn</span>
              <span>12:00 Noon</span>
              <span>18:00 Dusk</span>
              <span>23:00 Night</span>
            </div>
            <div className="relative w-full h-8 bg-stone-200/50 rounded-xl overflow-hidden p-1 flex items-center">
              {/* Hour Grid Markers */}
              <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-20">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-slate-500" />
                ))}
              </div>

              {/* Render Blocks onto the 06:00 - 23:00 timeline (17h = 1020m) */}
              {dayBlocks.map(block => {
                const parseMinutes = (timeStr: string) => {
                  const [h, m] = timeStr.split(':').map(Number);
                  return (h || 0) * 60 + (m || 0);
                };
                const startM = Math.max(360, Math.min(1380, parseMinutes(block.startTime)));
                const endM = Math.max(startM + 15, Math.min(1380, parseMinutes(block.endTime)));
                const leftPct = ((startM - 360) / 1020) * 100;
                const widthPct = Math.max(3, ((endM - startM) / 1020) * 100);
                const zStyle = zoneColors[block.zone] || zoneColors.creative;

                return (
                  <div
                    key={`bar-${block.id}`}
                    onClick={() => handleToggleBlock(block)}
                    className={`absolute top-1 bottom-1 rounded-lg border text-[10px] font-bold flex items-center px-1.5 truncate cursor-pointer transition-all hover:scale-105 hover:z-10 shadow-sm ${zStyle.bg} ${zStyle.text} ${zStyle.border} ${
                      block.completed ? 'opacity-50 line-through' : ''
                    }`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    title={`${block.title} (${block.startTime} - ${block.endTime})`}
                  >
                    <span className="truncate">{block.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* List of Scheduled Time Blocks */}
          {dayBlocks.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-pastel-border bg-stone-50/50">
              <div className="w-12 h-12 rounded-2xl bg-pastel-butter-100 flex items-center justify-center text-pastel-butter-500 mx-auto mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-700">No timeboxes scheduled for this date</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                "If it’s not on your calendar, it doesn’t exist." Drop your Daily Highlight or use the quick buttons above.
              </p>
              <button
                onClick={() => handleQuickPreset({
                  title: '🎯 Daily Highlight Focus',
                  start: '09:00',
                  end: '10:30',
                  zone: 'highlight',
                  energy: 'high'
                })}
                className="mt-4 px-4 py-2 rounded-2xl bg-pastel-lilac-100 hover:bg-pastel-lilac-200 text-pastel-lilac-500 border border-pastel-lilac-300 font-bold text-xs transition"
              >
                + Drop Daily Highlight
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {dayBlocks.map(block => {
                const zStyle = zoneColors[block.zone] || zoneColors.creative;
                return (
                  <div
                    key={block.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                      block.completed
                        ? 'bg-stone-50/80 border-stone-200 opacity-60'
                        : `${zStyle.bg} ${zStyle.border} shadow-soft-sm`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleBlock(block)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                          block.completed
                            ? 'bg-pastel-sage-500 border-pastel-sage-500 text-white'
                            : 'bg-white border-stone-300 hover:border-pastel-sage-400'
                        }`}
                      >
                        {block.completed && <CheckCircle2 className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${block.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {block.title}
                          </h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${zStyle.bg} ${zStyle.text} border ${zStyle.border}`}>
                            {zStyle.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{block.startTime} — {block.endTime}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 capitalize font-medium text-slate-600">
                            <Zap className="w-3 h-3 text-pastel-peach-500" />
                            {block.energyLevel} Energy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() => {
                          sound.playPop();
                          onDeleteBlock(block.id);
                        }}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-white/60 transition"
                        title="Delete block"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: Weekly Energy Matrix */
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {weekDates.map(dateStr => {
            const dateObj = new Date(dateStr + 'T00:00:00');
            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = dateObj.getDate();
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate;
            const blocksThisDay = blocks.filter(b => b.date === dateStr);

            return (
              <div
                key={dateStr}
                onClick={() => {
                  sound.playPop();
                  setSelectedDate(dateStr);
                }}
                className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col min-h-[220px] ${
                  isSelected
                    ? 'border-pastel-lilac-400 bg-pastel-lilac-50/40 shadow-soft-sm'
                    : 'border-pastel-border bg-stone-50/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <span className="text-xs font-bold text-slate-600">{dayName}</span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isToday ? 'bg-slate-900 text-white' : 'text-slate-500'
                  }`}>
                    {dayNum}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  {blocksThisDay.length === 0 ? (
                    <div className="text-[11px] text-slate-300 italic pt-4 text-center">
                      Empty
                    </div>
                  ) : (
                    blocksThisDay.map(b => {
                      const z = zoneColors[b.zone] || zoneColors.creative;
                      return (
                        <div
                          key={b.id}
                          className={`p-1.5 rounded-xl text-[11px] border truncate ${
                            b.completed ? 'opacity-50 line-through' : `${z.bg} ${z.border} ${z.text}`
                          }`}
                          title={`${b.title} (${b.startTime} - ${b.endTime})`}
                        >
                          <div className="font-bold truncate">{b.title}</div>
                          <div className="text-[9px] opacity-80">{b.startTime}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Timebox Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-soft-lg border border-pastel-border animate-pop">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Timebox a Flow Session</h3>
            <p className="text-xs text-slate-500 mb-4">
              Schedule intentional time and match it with your natural energy.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Session Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Write chapter draft / Polish presentation"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-lilac-300"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newStart}
                    onChange={e => setNewStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newEnd}
                    onChange={e => setNewEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Energy Zone
                </label>
                <select
                  value={newZone}
                  onChange={e => setNewZone(e.target.value as EnergyZone)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-medium text-slate-700"
                >
                  <option value="highlight">🎯 Daily Highlight (Primary Win)</option>
                  <option value="creative">⚡ Creative Deep Work</option>
                  <option value="admin">💌 Batched Admin & Messages</option>
                  <option value="recharge">🌿 Guilt-Free Rest & Walks</option>
                  <option value="play">🎮 Play & Hobbies</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Energy Level Required
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['high', 'medium', 'low'] as const).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setNewEnergy(lvl)}
                      className={`py-2 rounded-2xl text-xs font-bold capitalize border transition ${
                        newEnergy === lvl
                          ? 'bg-pastel-lilac-100 text-pastel-lilac-500 border-pastel-lilac-300'
                          : 'bg-stone-50 text-slate-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {lvl} Energy
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-500 hover:bg-stone-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-soft-sm"
                >
                  Schedule (+15 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
