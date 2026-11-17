import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Flame, Zap, Headphones, Info } from 'lucide-react';
import { UserStats } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  stats: UserStats;
  onOpenStatsModal: () => void;
  ambientSound: 'none' | 'waves' | 'rain' | 'binaural';
  setAmbientSound: (val: 'none' | 'waves' | 'rain' | 'binaural') => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenStatsModal,
  ambientSound,
  setAmbientSound,
  isMuted,
  setIsMuted,
}) => {
  const [ambientMenuOpen, setAmbientMenuOpen] = useState(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
    if (!next) {
      sound.playPop();
    }
  };

  const handleSelectAmbient = (type: 'none' | 'waves' | 'rain' | 'binaural') => {
    setAmbientSound(type);
    sound.playAmbient(type);
    setAmbientMenuOpen(false);
  };

  // Calculate battery percentage (based on XP % 100)
  const batteryPct = Math.min(100, Math.max(15, (stats.xp % 100) || 20));

  const todayStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pastel-border/60 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pastel-lilac-200 via-pastel-peach-200 to-pastel-sage-200 flex items-center justify-center shadow-soft-sm text-lg animate-float">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-800 font-sans">
                FeelGood
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pastel-lilac-100 text-pastel-lilac-500 border border-pastel-lilac-200">
                Ali Abdaal Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {todayStr} • Joyful productivity, reminders & intentional flow
            </p>
          </div>
        </div>

        {/* Playful Controls & Energy Battery */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Ambient Sound Player */}
          <div className="relative">
            <button
              onClick={() => setAmbientMenuOpen(!ambientMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-soft-sm ${
                ambientSound !== 'none'
                  ? 'bg-pastel-sky-100 text-pastel-sky-500 border border-pastel-sky-200 animate-pulse-gentle'
                  : 'bg-stone-50 text-slate-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
              title="Focus Soundscapes (Waves, Binaural 40Hz, Rain)"
            >
              <Headphones className="w-3.5 h-3.5 text-pastel-sky-500" />
              <span className="capitalize hidden md:inline">
                {ambientSound === 'none' ? 'Focus Audio' : ambientSound}
              </span>
            </button>

            {ambientMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg border border-pastel-border p-2 z-50 text-xs">
                <p className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Offline Synthesized Audio
                </p>
                <button
                  onClick={() => handleSelectAmbient('none')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition ${
                    ambientSound === 'none' ? 'bg-stone-100 font-semibold' : 'hover:bg-stone-50'
                  }`}
                >
                  🔇 Off (Silent)
                </button>
                <button
                  onClick={() => handleSelectAmbient('binaural')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                    ambientSound === 'binaural' ? 'bg-pastel-lilac-100 font-semibold text-pastel-lilac-500' : 'hover:bg-stone-50'
                  }`}
                >
                  <span>🧠 40Hz Gamma Focus</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded-md border">Ali's Pick</span>
                </button>
                <button
                  onClick={() => handleSelectAmbient('waves')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition ${
                    ambientSound === 'waves' ? 'bg-pastel-sky-100 font-semibold text-pastel-sky-500' : 'hover:bg-stone-50'
                  }`}
                >
                  🌊 Ocean Waves
                </button>
                <button
                  onClick={() => handleSelectAmbient('rain')}
                  className={`w-full text-left px-3 py-2 rounded-xl transition ${
                    ambientSound === 'rain' ? 'bg-pastel-sage-100 font-semibold text-pastel-sage-500' : 'hover:bg-stone-50'
                  }`}
                >
                  🌧️ Cozy Soft Rain
                </button>
              </div>
            )}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-stone-50 hover:bg-stone-100 border border-stone-200/80 text-slate-600 transition"
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pastel-sage-500" />}
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-pastel-peach-100/80 border border-pastel-peach-200 text-pastel-peach-500 text-xs font-bold shadow-soft-sm">
            <Flame className="w-3.5 h-3.5 fill-pastel-peach-500 text-pastel-peach-500 animate-bounce" />
            <span>{stats.streak}d Streak</span>
          </div>

          {/* Feel-Good Energy Battery (Interactive XP pill) */}
          <button
            onClick={onOpenStatsModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200/80 shadow-soft-sm transition-all group cursor-pointer"
            title="Click to view Feel-Good Battery & Stats"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-pastel-butter-500 fill-pastel-butter-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-700">Lvl {stats.level}</span>
            </div>

            {/* Visual Battery Bar */}
            <div className="w-14 h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200 flex items-center">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pastel-sage-300 via-pastel-butter-300 to-pastel-peach-300 transition-all duration-500"
                style={{ width: `${batteryPct}%` }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 hidden lg:inline">
              {stats.xp} XP
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
