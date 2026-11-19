import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { DailyTipCard } from './components/DailyTipCard';
import { WaterReminder } from './components/WaterReminder';
import { UniqueCalendar } from './components/UniqueCalendar';
import { RemindersTasks } from './components/RemindersTasks';
import { PlayfulFocusTimer } from './components/PlayfulFocusTimer';
import { TipsCatalogModal } from './components/TipsCatalogModal';
import { FeelGoodBatteryModal } from './components/FeelGoodBatteryModal';
import { EnergyCheckIn } from './components/EnergyCheckIn';
import { BloomingGarden } from './components/BloomingGarden';
import { BreathingResetModal } from './components/BreathingResetModal';
import { CompassReflectionModal } from './components/CompassReflectionModal';
import { MilestoneBadgesModal } from './components/MilestoneBadgesModal';
import { Task, CalendarBlock, DailyTip, WaterState, UserStats, EnergyMood, CompassReflection } from './types';
import { getDailyTipForDate, PRODUCTIVITY_TIPS } from './data/productivityTips';
import { sound } from './utils/audio';
import { firePastelConfetti, fireBigCelebration } from './utils/confetti';
import { 
  Sparkles, 
  Droplets, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  Search, 
  Heart, 
  Bookmark, 
  Clock, 
  Zap,
  Timer,
  Feather,
  Moon,
  Trophy
} from 'lucide-react';

export const App: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Active Tab: 'today' | 'calendar' | 'hydrate' | 'timer' | 'wisdom'
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');

  // 1. User Stats & XP
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('aura_stats') || localStorage.getItem('feelgood_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      xp: 65,
      level: 1,
      streak: 3,
      dailyHighlightDone: false,
      completedTasksCount: 0,
      tipsAppliedCount: 1,
      appliedTipsToday: [],
      favoriteTips: ['tip-1', 'tip-9'],
      currentMood: 'calm',
      gardenGrowth: 40,
      unlockedBadges: ['badge-streak-3'],
      reflections: [],
      breathingSessionsCount: 0,
    };
  });

  // 2. Daily Tip State
  const [currentTip, setCurrentTip] = useState<DailyTip>(() => getDailyTipForDate(new Date()));

  // 3. Water State
  const [water, setWater] = useState<WaterState>(() => {
    const saved = localStorage.getItem('aura_water') || localStorage.getItem('feelgood_water');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.lastLoggedDate === todayStr) {
          return parsed;
        }
      } catch {}
    }
    return {
      currentMl: 750,
      targetMl: 2000,
      reminderIntervalMinutes: 45,
      remindersEnabled: true,
      streakDays: 3,
      lastLoggedDate: todayStr,
    };
  });

  // 4. Tasks & Reminders State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('aura_tasks') || localStorage.getItem('feelgood_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'task-1',
        title: 'Draft the project proposal (My Daily Highlight)',
        category: 'highlight',
        priority: 'high',
        time: '10:00',
        date: todayStr,
        completed: false,
        xpReward: 50,
      },
      {
        id: 'task-2',
        title: 'Drink 500ml water after morning session',
        category: 'health',
        priority: 'medium',
        time: '11:30',
        date: todayStr,
        completed: true,
        completedAt: todayStr,
        xpReward: 15,
      },
      {
        id: 'task-3',
        title: 'Batch reply to emails & Slack messages',
        category: 'admin',
        priority: 'medium',
        time: '16:00',
        date: todayStr,
        completed: false,
        xpReward: 15,
      },
      {
        id: 'task-4',
        title: 'Guilt-Free evening walk listening to podcasts',
        category: 'recharge',
        priority: 'low',
        time: '18:00',
        date: todayStr,
        completed: false,
        xpReward: 20,
      },
    ];
  });

  // 5. Calendar Blocks State
  const [blocks, setBlocks] = useState<CalendarBlock[]>(() => {
    const saved = localStorage.getItem('aura_blocks') || localStorage.getItem('feelgood_blocks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'block-1',
        title: '🎯 Daily Highlight: Project Blueprint',
        date: todayStr,
        startTime: '09:00',
        endTime: '10:30',
        zone: 'highlight',
        energyLevel: 'high',
        completed: false,
      },
      {
        id: 'block-2',
        title: '⚡ Creative Sprint & Ideation',
        date: todayStr,
        startTime: '11:00',
        endTime: '12:00',
        zone: 'creative',
        energyLevel: 'high',
        completed: false,
      },
      {
        id: 'block-3',
        title: '☕ Recharging Lunch & Mindful Pause',
        date: todayStr,
        startTime: '12:30',
        endTime: '13:30',
        zone: 'recharge',
        energyLevel: 'low',
        completed: true,
      },
      {
        id: 'block-4',
        title: '💌 Batched Admin & Correspondence',
        date: todayStr,
        startTime: '16:00',
        endTime: '16:45',
        zone: 'admin',
        energyLevel: 'medium',
        completed: false,
      },
      {
        id: 'block-5',
        title: '🌿 Guilt-Free Rest & Refresh',
        date: todayStr,
        startTime: '17:30',
        endTime: '18:15',
        zone: 'recharge',
        energyLevel: 'low',
        completed: false,
      },
    ];
  });

  // 6. Sound & UI Modals
  const [ambientSound, setAmbientSound] = useState<'none' | 'waves' | 'rain' | 'binaural'>('none');
  const [isMuted, setIsMuted] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [statsModalOpen, setStatsModalOpen] = useState(false);
  const [breathingModalOpen, setBreathingModalOpen] = useState(false);
  const [reflectionModalOpen, setReflectionModalOpen] = useState(false);
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('aura_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('aura_water', JSON.stringify(water));
  }, [water]);

  useEffect(() => {
    localStorage.setItem('aura_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('aura_blocks', JSON.stringify(blocks));
  }, [blocks]);

  // Badge Unlock helper
  const unlockBadge = (badgeId: string) => {
    setStats(prev => {
      const currentList = prev.unlockedBadges || [];
      if (currentList.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadges: [...currentList, badgeId],
        xp: prev.xp + 25,
      };
    });
  };

  // XP Reward helper
  const rewardXp = (amount: number) => {
    setStats(prev => {
      const nextXp = prev.xp + amount;
      const nextLevel = Math.floor(nextXp / 100) + 1;
      return {
        ...prev,
        xp: nextXp,
        level: nextLevel,
      };
    });
  };

  // Energy Mood Selector
  const handleSelectMood = (mood: EnergyMood) => {
    setStats(prev => ({
      ...prev,
      currentMood: mood,
    }));
    rewardXp(10);
  };

  // 60-Second Box Breathing Completed
  const handleCompleteBreathing = () => {
    setStats(prev => ({
      ...prev,
      breathingSessionsCount: (prev.breathingSessionsCount || 0) + 1,
    }));
    rewardXp(20);
    unlockBadge('badge-breath-1');
  };

  // Evening Reflection Saved
  const handleSaveReflection = (newRef: Omit<CompassReflection, 'createdAt'>) => {
    const fullRef: CompassReflection = {
      ...newRef,
      createdAt: new Date().toISOString(),
    };
    setStats(prev => ({
      ...prev,
      reflections: [fullRef, ...(prev.reflections || []).filter(r => r.date !== newRef.date)],
    }));
    rewardXp(30);
    unlockBadge('badge-compass-1');
  };

  // Handlers for Tip
  const isTipApplied = stats.appliedTipsToday.includes(currentTip.id);
  const isTipFavorite = stats.favoriteTips.includes(currentTip.id);

  const toggleTipApplied = (tipId: string) => {
    setStats(prev => {
      const already = prev.appliedTipsToday.includes(tipId);
      const nextApplied = already
        ? prev.appliedTipsToday.filter(id => id !== tipId)
        : [...prev.appliedTipsToday, tipId];

      if (!already) {
        rewardXp(25);
      }

      return {
        ...prev,
        appliedTipsToday: nextApplied,
        tipsAppliedCount: prev.tipsAppliedCount + (already ? -1 : 1),
      };
    });
  };

  const toggleFavoriteTip = (tipId: string) => {
    setStats(prev => {
      const already = prev.favoriteTips.includes(tipId);
      return {
        ...prev,
        favoriteTips: already
          ? prev.favoriteTips.filter(id => id !== tipId)
          : [...prev.favoriteTips, tipId],
      };
    });
  };

  // Handlers for Tasks
  const handleAddTask = (taskData: Omit<Task, 'id' | 'completed' | 'xpReward'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false,
      xpReward: taskData.category === 'highlight' ? 50 : 15,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleClearCompleted = () => {
    sound.playPop();
    setTasks(prev => prev.filter(t => !t.completed));
  };

  const handleExportData = () => {
    sound.playPop();
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      stats,
      water,
      tasks,
      blocks,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aura-backup-${todayStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    sound.playPop();
    if (window.confirm('Reset all Aura data and restore fresh defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleSetDailyHighlight = (title: string) => {
    const newHighlight: Task = {
      id: `highlight-${Date.now()}`,
      title,
      category: 'highlight',
      priority: 'high',
      date: todayStr,
      completed: false,
      xpReward: 50,
    };
    setTasks(prev => [newHighlight, ...prev.filter(t => t.category !== 'highlight' || t.completed)]);
    rewardXp(15);
  };

  // Handlers for Calendar Blocks
  const handleAddBlock = (blockData: Omit<CalendarBlock, 'id'>) => {
    const newBlock: CalendarBlock = {
      ...blockData,
      id: `block-${Date.now()}`,
    };
    setBlocks(prev => [...prev, newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const handleToggleCompleteBlock = (id: string) => {
    setBlocks(prev =>
      prev.map(b => (b.id === id ? { ...b, completed: !b.completed } : b))
    );
  };

  // Get current hour greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const highlightTask = tasks.find(t => t.category === 'highlight');
  const highlightDone = tasks.some(t => t.category === 'highlight' && t.completed);
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const waterPct = Math.min(100, Math.round((water.currentMl / water.targetMl) * 100));

  // Dynamic Garden Growth calculation
  const waterFactor = Math.min(25, (water.currentMl / water.targetMl) * 25);
  const breathingFactor = (stats.breathingSessionsCount || 0) > 0 ? 15 : 0;
  const reflectionFactor = (stats.reflections || []).some(r => r.date === todayStr) ? 25 : 0;
  const taskFactor = Math.min(30, completedCount * 10);
  const highlightBonus = highlightDone ? 20 : 0;
  const gardenGrowth = Math.min(100, Math.round(15 + taskFactor + highlightBonus + waterFactor + breathingFactor + reflectionFactor));

  // Check milestone badges
  useEffect(() => {
    if (highlightDone) unlockBadge('badge-highlight-1');
    if (water.currentMl >= water.targetMl) unlockBadge('badge-water-1');
    if (stats.streak >= 3) unlockBadge('badge-streak-3');
    if (gardenGrowth >= 100) unlockBadge('badge-bloom-1');
  }, [highlightDone, water.currentMl, water.targetMl, stats.streak, gardenGrowth]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans selection:bg-pastel-lilac-200">
      {/* Top Header with Aesthetic Tab Navigation */}
      <Header
        stats={stats}
        onOpenStatsModal={() => setStatsModalOpen(true)}
        onOpenBadges={() => setBadgesModalOpen(true)}
        onOpenBreathing={() => setBreathingModalOpen(true)}
        onOpenReflection={() => setReflectionModalOpen(true)}
        ambientSound={ambientSound}
        setAmbientSound={setAmbientSound}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* ================= TAB 1: TODAY (CALM, MINIMAL, UNCLUTTERED) ================= */}
        {activeTab === 'today' && (
          <div className="space-y-6 sm:space-y-8 animate-pop">
            {/* Soft Zen Greeting & Mini Summary Bar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-stone-200/60">
              <div>
                <span className="text-xs font-semibold text-pastel-lilac-500 uppercase tracking-widest block mb-1">
                  Daily Sanctuary
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
                  {getGreeting()} ✨
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Protect your energy, focus on one highlight, and enjoy the flow.
                </p>
              </div>

              {/* Aesthetic Quick Status Badges */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    setActiveTab('hydrate');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/70 text-xs shadow-soft-sm transition active:scale-95"
                  title="View Hydration Tracker"
                >
                  <Droplets className="w-3.5 h-3.5 text-pastel-sky-500 fill-pastel-sky-400" />
                  <span className="font-semibold text-slate-700">{waterPct}% Water</span>
                </button>

                <button
                  onClick={() => {
                    sound.playPop();
                    setActiveTab('calendar');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/70 text-xs shadow-soft-sm transition active:scale-95"
                  title="View Calendar Rhythm"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-pastel-butter-500" />
                  <span className="font-semibold text-slate-700">{blocks.length} Blocks</span>
                </button>

                <button
                  onClick={() => {
                    sound.playPop();
                    setActiveTab('timer');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/70 text-xs shadow-soft-sm transition active:scale-95"
                  title="Start Focus Sprint"
                >
                  <Timer className="w-3.5 h-3.5 text-pastel-peach-500" />
                  <span className="font-semibold text-slate-700">Sprint</span>
                </button>
              </div>
            </div>

            {/* Adaptive Energy Check-In */}
            <EnergyCheckIn
              currentMood={stats.currentMood}
              onSelectMood={handleSelectMood}
              onOpenBreathing={() => setBreathingModalOpen(true)}
              onStartTimer={() => setActiveTab('timer')}
            />

            {/* Structured 2-Column Zen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Reminders & Tasks */}
              <div className="lg:col-span-7 space-y-6">
                <RemindersTasks
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onSetDailyHighlight={handleSetDailyHighlight}
                  onRewardXp={rewardXp}
                  onClearCompleted={handleClearCompleted}
                />
              </div>

              {/* Right Column: Daily Golden Principle, Habit Garden & Mindful Reset */}
              <div className="lg:col-span-5 space-y-6">
                <DailyTipCard
                  currentTip={currentTip}
                  onSetTip={setCurrentTip}
                  onOpenCatalog={() => setActiveTab('wisdom')}
                  isApplied={isTipApplied}
                  onToggleApplied={toggleTipApplied}
                  isFavorite={isTipFavorite}
                  onToggleFavorite={toggleFavoriteTip}
                />

                {/* The Blooming Garden Component */}
                <BloomingGarden growth={gardenGrowth} streak={stats.streak} />

                {/* Quick Zen Breath & Focus Card */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-pastel-lilac-50/70 to-pastel-cream border border-pastel-lilac-200/60 shadow-soft-sm flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-pastel-lilac-500 uppercase tracking-widest block">
                      Quick Reset
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">Need a mental pause?</h4>
                    <p className="text-xs text-slate-500">
                      Reset with 60s box breathing or a 5m sprint.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        sound.playPop();
                        setBreathingModalOpen(true);
                      }}
                      className="px-3 py-2 rounded-2xl bg-white hover:bg-stone-50 text-slate-700 text-xs font-bold border border-stone-200 shadow-soft-sm transition active:scale-95 flex items-center gap-1"
                    >
                      <Feather className="w-3.5 h-3.5 text-pastel-sky-500" />
                      <span>Breathe</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playPop();
                        setActiveTab('timer');
                      }}
                      className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm transition active:scale-95"
                    >
                      Sprint →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CALENDAR RHYTHM ================= */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-pop">
            <div className="pb-2 border-b border-stone-200/60">
              <span className="text-xs font-semibold text-pastel-butter-500 uppercase tracking-widest block mb-1">
                Circadian Flow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
                Energy & Time Flow
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Schedule your day around natural energy peaks rather than arbitrary clocks.
              </p>
            </div>

            <UniqueCalendar
              blocks={blocks}
              onAddBlock={handleAddBlock}
              onDeleteBlock={handleDeleteBlock}
              onToggleCompleteBlock={handleToggleCompleteBlock}
              onRewardXp={rewardXp}
            />
          </div>
        )}

        {/* ================= TAB 3: HYDRATION FLOW ================= */}
        {activeTab === 'hydrate' && (
          <div className="space-y-6 animate-pop max-w-2xl mx-auto">
            <div className="text-center pb-2 border-b border-stone-200/60">
              <span className="text-xs font-semibold text-pastel-sky-500 uppercase tracking-widest block mb-1">
                Mindful Wellness
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
                Hydration Sanctuary
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Keep your mind alert and cognitive speed sharp with regular sips.
              </p>
            </div>

            <WaterReminder
              water={water}
              onUpdateWater={setWater}
              onRewardXp={rewardXp}
            />
          </div>
        )}

        {/* ================= TAB 4: FOCUS SPRINT TIMER ================= */}
        {activeTab === 'timer' && (
          <div className="space-y-6 animate-pop max-w-xl mx-auto">
            <div className="text-center pb-2 border-b border-stone-200/60">
              <span className="text-xs font-semibold text-pastel-peach-500 uppercase tracking-widest block mb-1">
                Deep Immersion
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
                Playful Focus Sprints
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Gentle timeboxes with peaceful ambient soundscapes and zero stress.
              </p>
            </div>

            <PlayfulFocusTimer onRewardXp={rewardXp} />
          </div>
        )}

        {/* ================= TAB 5: WISDOM VAULT ================= */}
        {activeTab === 'wisdom' && (
          <div className="space-y-6 animate-pop">
            <div className="pb-2 border-b border-stone-200/60">
              <span className="text-xs font-semibold text-pastel-lilac-500 uppercase tracking-widest block mb-1">
                Wisdom Library
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-800">
                The Productivity Vault
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore 30+ core principles for joyful focus, friction reduction, and energy architecture.
              </p>
            </div>

            {/* Embedded Catalog Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pastel-border shadow-soft-md space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Browse All Principles
                </span>
                <button
                  onClick={() => {
                    sound.playPop();
                    setCatalogOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm transition"
                >
                  Open Full Screen Vault
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTIVITY_TIPS.map(tip => {
                  const isFav = stats.favoriteTips.includes(tip.id);
                  const isApp = stats.appliedTipsToday.includes(tip.id);

                  return (
                    <div
                      key={tip.id}
                      className="p-4 rounded-2xl bg-stone-50/60 hover:bg-pastel-cream border border-stone-200/70 transition flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-lilac-100 text-pastel-lilac-500 border border-pastel-lilac-200 uppercase">
                            {tip.category}
                          </span>
                          <button
                            onClick={() => {
                              sound.playPop();
                              toggleFavoriteTip(tip.id);
                            }}
                            className="p-1 text-slate-400 hover:text-pastel-rose-500 transition"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pastel-rose-500 text-pastel-rose-500' : ''}`} />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug">
                          {tip.title}
                        </h4>
                        <p className="text-xs text-slate-600 italic line-clamp-2">
                          "{tip.quote}"
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-medium">
                          {tip.chapter || tip.source}
                        </span>
                        <button
                          onClick={() => {
                            sound.playPop();
                            setCurrentTip(tip);
                            setActiveTab('today');
                          }}
                          className="text-xs font-bold text-pastel-lilac-500 hover:underline flex items-center gap-1"
                        >
                          Focus on this →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Aesthetic Minimal Footer */}
      <footer className="border-t border-stone-200/50 py-5 px-4 text-center text-xs text-slate-400 bg-white/40 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            ✦ <strong>Aura</strong> — Calm, intentional daily rhythm & joyful productivity.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={handleExportData}
              className="hover:text-slate-700 underline font-medium transition"
              title="Download backup JSON of all your Aura data"
            >
              Export Data
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={handleResetData}
              className="hover:text-rose-500 font-medium transition"
              title="Clear all stored data"
            >
              Reset
            </button>
            <span className="text-stone-300">•</span>
            <span className="text-slate-400">Local-First & Private</span>
          </div>
        </div>
      </footer>

      {/* Catalog & Battery Modals */}
      <TipsCatalogModal
        isOpen={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onSelectTip={tip => {
          setCurrentTip(tip);
          setActiveTab('today');
        }}
        favoriteTips={stats.favoriteTips}
        onToggleFavorite={toggleFavoriteTip}
        appliedTips={stats.appliedTipsToday}
      />

      <FeelGoodBatteryModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
      />

      {/* 60s Box Breathing Modal */}
      <BreathingResetModal
        isOpen={breathingModalOpen}
        onClose={() => setBreathingModalOpen(false)}
        onCompleteSession={handleCompleteBreathing}
      />

      {/* Evening Reflection (3 Compass Questions) Modal */}
      <CompassReflectionModal
        isOpen={reflectionModalOpen}
        onClose={() => setReflectionModalOpen(false)}
        reflections={stats.reflections || []}
        onSaveReflection={handleSaveReflection}
      />

      {/* Milestone Badges Modal */}
      <MilestoneBadgesModal
        isOpen={badgesModalOpen}
        onClose={() => setBadgesModalOpen(false)}
        unlockedBadgeIds={stats.unlockedBadges || []}
      />
    </div>
  );
};

export default App;
