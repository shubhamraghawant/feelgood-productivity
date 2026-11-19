import React, { useState } from 'react';
import { X, Sparkles, Moon, Send, Compass, CheckCircle2, History } from 'lucide-react';
import { CompassReflection } from '../types';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

interface CompassReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  reflections: CompassReflection[];
  onSaveReflection: (reflection: Omit<CompassReflection, 'createdAt'>) => void;
}

export const CompassReflectionModal: React.FC<CompassReflectionModalProps> = ({
  isOpen,
  onClose,
  reflections,
  onSaveReflection,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const existingToday = reflections.find(r => r.date === todayStr);

  const [energized, setEnergized] = useState(existingToday?.energized || '');
  const [drained, setDrained] = useState(existingToday?.drained || '');
  const [experiment, setExperiment] = useState(existingToday?.experiment || '');
  const [viewHistory, setViewHistory] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!energized.trim() && !drained.trim() && !experiment.trim()) return;

    sound.playLevelUp();
    firePastelConfetti();
    onSaveReflection({
      date: todayStr,
      energized: energized.trim(),
      drained: drained.trim(),
      experiment: experiment.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 sm:p-7 shadow-soft-lg border border-pastel-border animate-pop overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-pastel-lilac-100 flex items-center justify-center text-pastel-lilac-500 shadow-soft-sm">
              <Moon className="w-4 h-4 fill-pastel-lilac-300 text-pastel-lilac-500" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">The 3 Compass Questions</h3>
              <p className="text-xs text-slate-400">Evening Wind-Down & Daily Review</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playPop();
                setViewHistory(!viewHistory);
              }}
              className="p-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-stone-100 transition flex items-center gap-1"
              title="View past reflection logs"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{viewHistory ? 'Write' : 'History'}</span>
            </button>
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
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {viewHistory ? (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Past Reflections ({reflections.length})
              </h4>
              {reflections.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-8">
                  No reflection logs yet. Complete your first one today!
                </p>
              ) : (
                reflections.map(r => (
                  <div key={r.date} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 block">{r.date}</span>
                    {r.energized && (
                      <p className="text-slate-600">
                        <strong className="text-pastel-sage-500">⚡ Energized:</strong> {r.energized}
                      </p>
                    )}
                    {r.drained && (
                      <p className="text-slate-600">
                        <strong className="text-pastel-peach-500">☁️ Drained:</strong> {r.drained}
                      </p>
                    )}
                    {r.experiment && (
                      <p className="text-slate-600">
                        <strong className="text-pastel-lilac-500">🧪 Experiment:</strong> {r.experiment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Intentional days compound into extraordinary lives. Take 2 minutes to debrief today’s energy.
              </p>

              {/* Question 1 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-pastel-sage-200 text-pastel-sage-500 text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>What gave me joy and energy today?</span>
                </label>
                <textarea
                  rows={2}
                  value={energized}
                  onChange={e => setEnergized(e.target.value)}
                  placeholder="e.g. Morning coffee sprint, solving the bug, calling a friend..."
                  className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pastel-sage-300 resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-pastel-peach-200 text-pastel-peach-500 text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>What drained me or created friction?</span>
                </label>
                <textarea
                  rows={2}
                  value={drained}
                  onChange={e => setDrained(e.target.value)}
                  placeholder="e.g. Procrastinating on the email, scrolling at 3 PM, skipping lunch..."
                  className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pastel-peach-300 resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-pastel-lilac-200 text-pastel-lilac-500 text-[10px] flex items-center justify-center font-bold">3</span>
                  <span>What small experiment will I try tomorrow?</span>
                </label>
                <textarea
                  rows={2}
                  value={experiment}
                  onChange={e => setExperiment(e.target.value)}
                  placeholder="e.g. Leave phone in another room during highlight, drink 500ml on wake-up..."
                  className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pastel-lilac-300 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-bold text-pastel-butter-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> +30 XP Reward
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-soft-sm transition active:scale-95 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Lock In Reflection</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
