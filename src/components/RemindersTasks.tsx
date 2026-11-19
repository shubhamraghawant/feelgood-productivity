import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Trash2, 
  Star, 
  Bell, 
  Sparkles, 
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import { Task, TaskCategory, Priority } from '../types';
import { sound } from '../utils/audio';
import { firePastelConfetti, fireBigCelebration } from '../utils/confetti';
import { sendLocalNotification } from '../utils/notifications';

interface RemindersTasksProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'xpReward'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSetDailyHighlight: (title: string) => void;
  onRewardXp: (amount: number) => void;
  onClearCompleted?: () => void;
}

export const RemindersTasks: React.FC<RemindersTasksProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onSetDailyHighlight,
  onRewardXp,
  onClearCompleted,
}) => {
  const [filter, setFilter] = useState<'all' | 'reminders' | 'highlight' | 'deep-work' | 'admin' | 'completed'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('deep-work');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [newTime, setNewTime] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  // Daily Highlight Task (if any)
  const highlightTask = tasks.find(t => t.category === 'highlight');

  // Monitor reminder times
  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${currentHours}:${currentMinutes}`;
      const todayStr = now.toISOString().split('T')[0];

      tasks.forEach(t => {
        if (!t.completed && t.time === timeStr && (!t.date || t.date === todayStr)) {
          sendLocalNotification(
            `Reminder: ${t.title}`,
            `It's ${t.time}! Time for your scheduled task.`
          );
        }
      });
    }, 30 * 1000);

    return () => clearInterval(checkReminders);
  }, [tasks]);

  const handleToggle = (task: Task) => {
    if (!task.completed) {
      if (task.category === 'highlight') {
        sound.playLevelUp();
        fireBigCelebration();
        onRewardXp(50);
      } else {
        sound.playPop();
        firePastelConfetti();
        onRewardXp(task.xpReward || 15);
      }
    } else {
      sound.playPop();
    }
    onToggleTask(task.id);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sound.playPop();
    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      time: newTime || undefined,
      date: new Date().toISOString().split('T')[0],
    });
    onRewardXp(10);
    setNewTitle('');
    setNewTime('');
    setIsAdding(false);
  };

  const handleSaveHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlightInput.trim()) return;
    sound.playPop();
    onSetDailyHighlight(highlightInput.trim());
    setHighlightInput('');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (t.completed) return false;
    if (filter === 'reminders') return !!t.time;
    if (filter === 'highlight') return t.category === 'highlight';
    if (filter === 'deep-work') return t.category === 'deep-work';
    if (filter === 'admin') return t.category === 'admin';
    return true;
  });

  const categoryBadges: Record<TaskCategory, { bg: string; text: string; label: string }> = {
    highlight: { bg: 'bg-pastel-rose-100', text: 'text-pastel-rose-500', label: 'Daily Highlight' },
    'deep-work': { bg: 'bg-pastel-lilac-100', text: 'text-pastel-lilac-500', label: 'Deep Work' },
    admin: { bg: 'bg-pastel-peach-100', text: 'text-pastel-peach-500', label: 'Admin' },
    recharge: { bg: 'bg-pastel-sage-100', text: 'text-pastel-sage-500', label: 'Recharge' },
    health: { bg: 'bg-pastel-sky-100', text: 'text-pastel-sky-500', label: 'Health' },
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pastel-border shadow-soft-md transition-all space-y-6">
      {/* DAILY HIGHLIGHT SPOTLIGHT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pastel-peach-100/90 via-pastel-butter-100/70 to-pastel-rose-100/80 p-5 sm:p-6 border border-pastel-peach-200 shadow-soft-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pastel-peach-500 shadow-soft-sm">
              <Star className="w-4 h-4 fill-pastel-peach-400 text-pastel-peach-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Today's Daily Highlight</h3>
              <p className="text-[11px] text-slate-500">The #1 outcome that makes today satisfying</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 text-pastel-peach-500 border border-pastel-peach-200">
            +50 XP Reward
          </span>
        </div>

        {highlightTask ? (
          <div className="mt-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-pastel-peach-200 flex items-center justify-between gap-3 shadow-soft-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggle(highlightTask)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${
                  highlightTask.completed
                    ? 'bg-pastel-sage-500 border-pastel-sage-500 text-white'
                    : 'border-pastel-peach-300 hover:border-pastel-peach-500 bg-white'
                }`}
                title="Mark Daily Highlight completed"
              >
                {highlightTask.completed && <Check className="w-4 h-4" />}
              </button>
              <div>
                <span className={`text-base font-bold ${
                  highlightTask.completed ? 'line-through text-slate-400' : 'text-slate-800'
                }`}>
                  {highlightTask.title}
                </span>
                {highlightTask.time && (
                  <span className="text-xs text-slate-500 ml-2 font-medium">
                    (Target: {highlightTask.time})
                  </span>
                )}
              </div>
            </div>

            {highlightTask.completed && (
              <span className="text-xs font-bold text-pastel-sage-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Day Won!
              </span>
            )}
          </div>
        ) : (
          <form onSubmit={handleSaveHighlight} className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="What is your single most important highlight today?"
              value={highlightInput}
              onChange={e => setHighlightInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-pastel-peach-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pastel-peach-300 shadow-inner"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-soft-sm active:scale-95"
            >
              Lock In
            </button>
          </form>
        )}
      </div>

      {/* REMINDERS & TASKS HEADER & FILTERS */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">Tasks & Reminders</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-slate-500 border border-stone-200">
              {filteredTasks.length} pending
            </span>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              setIsAdding(!isAdding);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm transition active:scale-95 ml-auto"
          >
            <Plus className="w-3.5 h-3.5 text-pastel-sage-300" />
            <span>Add Reminder / Task</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'reminders', label: '⏰ With Reminders' },
              { id: 'deep-work', label: '⚡ Deep Work' },
              { id: 'admin', label: '💌 Admin' },
              { id: 'completed', label: `✅ Completed (${tasks.filter(t => t.completed).length})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setFilter(tab.id as typeof filter);
                }}
                className={`px-3 py-1 rounded-xl font-semibold transition ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white shadow-soft-sm'
                    : 'bg-stone-50 hover:bg-stone-100 text-slate-500 border border-stone-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filter === 'completed' && onClearCompleted && tasks.some(t => t.completed) && (
            <button
              onClick={() => {
                sound.playPop();
                onClearCompleted();
              }}
              className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 hover:underline px-2 py-1"
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>

      {/* Add Task Form (Collapsible) */}
      {isAdding && (
        <form onSubmit={handleCreateSubmit} className="p-4 rounded-3xl bg-pastel-cream border border-pastel-border space-y-3 animate-pop">
          <div>
            <input
              type="text"
              placeholder="e.g. Call accountant / Review slide deck / 15m inbox clearing"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-lilac-300"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {/* Reminder Time */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                ⏰ Reminder Time (Optional)
              </label>
              <input
                type="time"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs focus:outline-none"
              >
                <option value="deep-work">⚡ Deep Work</option>
                <option value="admin">💌 Admin & Messages</option>
                <option value="recharge">🌿 Recharge / Rest</option>
                <option value="health">💧 Health & Movement</option>
                <option value="highlight">🎯 Daily Highlight</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Priority
              </label>
              <select
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as Priority)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs focus:outline-none"
              >
                <option value="low">🌱 Low</option>
                <option value="medium">⚡ Medium</option>
                <option value="high">🔥 High</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-stone-200/60 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-soft-sm"
            >
              Create Task (+10 XP)
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-stone-50/50 border border-stone-100">
            <p className="text-xs text-slate-400 font-medium">
              No tasks found in this view. Enjoy the mental peace or add one above!
            </p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const badge = categoryBadges[task.category] || categoryBadges['deep-work'];
            return (
              <div
                key={task.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  task.completed
                    ? 'bg-stone-50/60 border-stone-200 opacity-60'
                    : 'bg-white hover:bg-pastel-cream/40 border-stone-200 shadow-soft-sm'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => handleToggle(task)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      task.completed
                        ? 'bg-pastel-sage-500 border-pastel-sage-500 text-white'
                        : 'border-stone-300 hover:border-pastel-sage-400 bg-white'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-semibold truncate ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-700'
                    }`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-bold ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                      {task.time && (
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Clock className="w-3 h-3 text-pastel-lilac-500" /> {task.time}
                        </span>
                      )}
                      <span className="text-pastel-butter-500 font-bold hidden sm:inline">
                        +{task.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playPop();
                    onDeleteTask(task.id);
                  }}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
