import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Flame, 
  Zap, 
  Headphones, 
  Calendar as CalendarIcon, 
  Droplets, 
  BookOpen, 
  CheckCircle2, 
  Timer,
  Trophy,
  Feather,
  Moon
} from 'lucide-react';
import { UserStats } from '../types';
import { sound } from '../utils/audio';

export type ActiveTab = 'today' | 'calendar' | 'hydrate' | 'wisdom' | 'timer';

interface HeaderProps {
  stats: UserStats;
  onOpenStatsModal: () => void;
  onOpenBadges: () => void;
  onOpenBreathing: () => void;
  onOpenReflection: () => void;
  ambientSound: 'none' | 'waves' | 'rain' | 'binaural';
  setAmbientSound: (val: 'none' | 'waves' | 'rain' | 'binaural') => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  onOpenStatsModal,
  onOpenBadges,
  onOpenBreathing,
  onOpenReflection,
  ambientSound,
  setAmbientSound,
  isMuted,
  setIsMuted,
  activeTab,
  setActiveTab,
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

  const handleTabChange = (tab: ActiveTab) => {
    sound.playPop();
    setActiveTab(tab);
  };

  const batteryPct = Math.min(100, Math.max(15, (stats.xp % 100) || 20));

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'calendar', label: 'Rhythm', icon: <CalendarIcon className="w-3.5 h-3.5" /> },
    { id: 'hydrate', label: 'Hydrate', icon: <Droplets className="w-3.5 h-3.5" /> },
    { id: 'timer', label: 'Sprint', icon: <Timer className="w-3.5 h-3.5" /> },
    { id: 'wisdom', label: 'Wisdom', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-stone-200/50 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pastel-peach-200 via-pastel-lilac-200 to-pastel-sky-200 flex items-center justify-center shadow-soft-sm text-base">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Aura
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest pl-1">
                Flow
              </span>
            </div>
          </div>
        </div>

        {/* Aesthetic Center Navigation Tabs */}
        <nav className="flex items-center bg-stone-100/80 p-1 rounded-2xl border border-stone-200/60 shadow-inner order-3 sm:order-2 w-full sm:w-auto justify-center">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-800 shadow-soft-sm font-bold scale-[1.02]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                }`}
              >
                <span className={isActive ? 'text-pastel-lilac-500' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Aesthetic Quick Controls */}
        <div className="flex items-center gap-2 ml-auto order-2 sm:order-3">
          {/* Ambient Sound Selector */}
          <div className="relative">
            <button
              onClick={() => setAmbientMenuOpen(!ambientMenuOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                ambientSound !== 'none'
                  ? 'bg-pastel-sky-100 text-pastel-sky-500 border border-pastel-sky-200 animate-pulse-gentle'
                  : 'bg-stone-50 hover:bg-stone-100 text-slate-500 border border-stone-200/60'
              }`}
              title="Ambient Soundscape"
            >
              <Headphones className="w-3.5 h-3.5 text-pastel-sky-500" />
              <span className="hidden md:inline capitalize text-[11px]">
                {ambientSound === 'none' ? 'Audio' : ambientSound}
              </span>
            </button>

            {ambientMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-lg border border-pastel-border p-2 z-50 text-xs animate-pop">
                <p className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Zen Soundscapes
                </p>
                <button
                  onClick={() => handleSelectAmbient('none')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl transition ${
                    ambientSound === 'none' ? 'bg-stone-100 font-bold' : 'hover:bg-stone-50'
                  }`}
                >
                  🔇 Off (Silent)
                </button>
                <button
                  onClick={() => handleSelectAmbient('binaural')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl transition flex items-center justify-between ${
                    ambientSound === 'binaural' ? 'bg-pastel-lilac-100 font-bold text-pastel-lilac-500' : 'hover:bg-stone-50'
                  }`}
                >
                  <span>🧠 40Hz Gamma Focus</span>
                </button>
                <button
                  onClick={() => handleSelectAmbient('waves')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl transition ${
                    ambientSound === 'waves' ? 'bg-pastel-sky-100 font-bold text-pastel-sky-500' : 'hover:bg-stone-50'
                  }`}
                >
                  🌊 Ocean Waves
                </button>
                <button
                  onClick={() => handleSelectAmbient('rain')}
                  className={`w-full text-left px-3 py-1.5 rounded-xl transition ${
                    ambientSound === 'rain' ? 'bg-pastel-sage-100 font-bold text-pastel-sage-500' : 'hover:bg-stone-50'
                  }`}
                >
                  🌧️ Gentle Rain
                </button>
              </div>
            )}
          </div>

          {/* 60s Breathe Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenBreathing();
            }}
            className="p-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-slate-500 hover:text-pastel-sky-500 transition hidden sm:flex items-center gap-1 text-xs"
            title="60-Second Box Breathing Reset"
          >
            <Feather className="w-3.5 h-3.5 text-pastel-sky-500" />
            <span className="text-[11px] font-semibold hidden md:inline">Breathe</span>
          </button>

          {/* Evening Reflection Button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenReflection();
            }}
            className="p-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-slate-500 hover:text-pastel-lilac-500 transition hidden sm:flex items-center gap-1 text-xs"
            title="Evening Reflection (3 Compass Questions)"
          >
            <Moon className="w-3.5 h-3.5 text-pastel-lilac-500" />
            <span className="text-[11px] font-semibold hidden md:inline">Review</span>
          </button>

          {/* Badges Trophy */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenBadges();
            }}
            className="p-1.5 rounded-xl bg-pastel-butter-50 hover:bg-pastel-butter-100 border border-pastel-butter-200 text-pastel-butter-500 transition flex items-center gap-1 text-xs"
            title="Milestone Badges"
          >
            <Trophy className="w-3.5 h-3.5 fill-pastel-butter-300" />
            <span className="text-[11px] font-bold">
              {stats.unlockedBadges?.length || 0}
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-slate-400 hover:text-slate-600 transition"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-pastel-sage-500" />}
          </button>

          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pastel-peach-50 border border-pastel-peach-200 text-pastel-peach-500 text-xs font-bold shadow-soft-sm">
            <Flame className="w-3 h-3 fill-pastel-peach-500 text-pastel-peach-500" />
            <span className="text-[11px]">{stats.streak}d</span>
          </div>

          {/* Energy Battery Bar */}
          <button
            onClick={onOpenStatsModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white hover:bg-stone-50 border border-stone-200/70 shadow-soft-sm transition-all cursor-pointer"
            title="View Aura Energy & XP"
          >
            <Zap className="w-3 h-3 text-pastel-butter-500 fill-pastel-butter-400" />
            <span className="text-[11px] font-bold text-slate-700">Lvl {stats.level}</span>
            <div className="w-10 h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200 hidden sm:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pastel-sage-300 to-pastel-peach-300 transition-all duration-500"
                style={{ width: `${batteryPct}%` }}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
