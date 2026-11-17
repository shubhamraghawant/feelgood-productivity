import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyTipCard } from './components/DailyTipCard';
import { WaterReminder } from './components/WaterReminder';
import { UniqueCalendar } from './components/UniqueCalendar';
import { RemindersTasks } from './components/RemindersTasks';
import { PlayfulFocusTimer } from './components/PlayfulFocusTimer';
import { TipsCatalogModal } from './components/TipsCatalogModal';
import { FeelGoodBatteryModal } from './components/FeelGoodBatteryModal';
import { Task, CalendarBlock, AliTip, WaterState, UserStats } from './types';
import { getDailyTipForDate } from './data/aliAbdaalTips';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. User Stats & XP
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('feelgood_stats');
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
    };
  });

  // 2. Daily Tip State
  const [currentTip, setCurrentTip] = useState<AliTip>(() => getDailyTipForDate(new Date()));

  // 3. Water State
  const [water, setWater] = useState<WaterState>(() => {
    const saved = localStorage.getItem('feelgood_water');
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
    const saved = localStorage.getItem('feelgood_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'task-1',
        title: 'Draft the Feel-Good project proposal (My Daily Highlight)',
        category: 'highlight',
        priority: 'high',
        time: '10:00',
        date: todayStr,
        completed: false,
        xpReward: 50,
      },
      {
        id: 'task-2',
        title: 'Drink 500ml water after morning focus session',
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
        title: 'Guilt-Free evening walk listening to audiobooks',
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
    const saved = localStorage.getItem('feelgood_blocks');
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

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('feelgood_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('feelgood_water', JSON.stringify(water));
  }, [water]);

  useEffect(() => {
    localStorage.setItem('feelgood_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('feelgood_blocks', JSON.stringify(blocks));
  }, [blocks]);

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
    // Replace any existing uncompleted highlight or add new
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

  return (
    <div className="min-h-screen bg-pastel-cream text-slate-800 flex flex-col font-sans selection:bg-pastel-lilac-200">
      {/* Top Navigation */}
      <Header
        stats={stats}
        onOpenStatsModal={() => setStatsModalOpen(true)}
        ambientSound={ambientSound}
        setAmbientSound={setAmbientSound}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-7">
        {/* Row 1: Ali Abdaal's Daily Wisdom Banner */}
        <section>
          <DailyTipCard
            currentTip={currentTip}
            onSetTip={setCurrentTip}
            onOpenCatalog={() => setCatalogOpen(true)}
            isApplied={isTipApplied}
            onToggleApplied={toggleTipApplied}
            isFavorite={isTipFavorite}
            onToggleFavorite={toggleFavoriteTip}
          />
        </section>

        {/* Row 2: Water Reminder & Focus Sprint Timer */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <WaterReminder
              water={water}
              onUpdateWater={setWater}
              onRewardXp={rewardXp}
            />
          </div>
          <div className="lg:col-span-5">
            <PlayfulFocusTimer onRewardXp={rewardXp} />
          </div>
        </section>

        {/* Row 3: Unique Calendar Flow & Reminders / Tasks */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Unique Calendar (Horizon / Energy Matrix) */}
          <div className="lg:col-span-7">
            <UniqueCalendar
              blocks={blocks}
              onAddBlock={handleAddBlock}
              onDeleteBlock={handleDeleteBlock}
              onToggleCompleteBlock={handleToggleCompleteBlock}
              onRewardXp={rewardXp}
            />
          </div>

          {/* Tasks & Reminders List */}
          <div className="lg:col-span-5">
            <RemindersTasks
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onSetDailyHighlight={handleSetDailyHighlight}
              onRewardXp={rewardXp}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-pastel-border/60 py-6 px-4 text-center text-xs text-slate-400 bg-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            ✨ <strong>FeelGood Productivity</strong> — Designed with Ali Abdaal's feel-good principles.
          </p>
          <p className="flex items-center gap-1">
            Pure Light Aesthetic • Pastel Calm • Playful Flow
          </p>
        </div>
      </footer>

      {/* Modals */}
      <TipsCatalogModal
        isOpen={catalogOpen}
        onClose={() => setCatalogOpen(false)}
        onSelectTip={setCurrentTip}
        favoriteTips={stats.favoriteTips}
        onToggleFavorite={toggleFavoriteTip}
        appliedTips={stats.appliedTipsToday}
      />

      <FeelGoodBatteryModal
        isOpen={statsModalOpen}
        onClose={() => setStatsModalOpen(false)}
        stats={stats}
      />
    </div>
  );
};

export default App;
