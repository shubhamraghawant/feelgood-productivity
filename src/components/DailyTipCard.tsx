import React, { useState } from 'react';
import { Sparkles, Dices, Heart, CheckCircle2, BookOpen, Bookmark, Share2, Compass } from 'lucide-react';
import { DailyTip } from '../types';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';
import { getRandomTip } from '../data/productivityTips';

interface DailyTipCardProps {
  currentTip: DailyTip;
  onSetTip: (tip: DailyTip) => void;
  onOpenCatalog: () => void;
  isApplied: boolean;
  onToggleApplied: (tipId: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (tipId: string) => void;
}

export const DailyTipCard: React.FC<DailyTipCardProps> = ({
  currentTip,
  onSetTip,
  onOpenCatalog,
  isApplied,
  onToggleApplied,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRollRandom = () => {
    setIsRotating(true);
    sound.playPop();
    setTimeout(() => {
      const nextTip = getRandomTip(currentTip.id);
      onSetTip(nextTip);
      setIsRotating(false);
    }, 250);
  };

  const handleApply = () => {
    if (!isApplied) {
      sound.playLevelUp();
      firePastelConfetti();
    } else {
      sound.playPop();
    }
    onToggleApplied(currentTip.id);
  };

  const handleCopy = () => {
    sound.playPop();
    const text = `✨ Daily Wisdom: "${currentTip.title}"\n\n"${currentTip.quote}"\n\nAction: ${currentTip.actionableStep}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pastel Category Badge Styles
  const categoryStyles: Record<string, { bg: string; text: string; border: string }> = {
    Energize: { bg: 'bg-pastel-peach-100', text: 'text-pastel-peach-500', border: 'border-pastel-peach-200' },
    Unblock: { bg: 'bg-pastel-lilac-100', text: 'text-pastel-lilac-500', border: 'border-pastel-lilac-200' },
    Sustain: { bg: 'bg-pastel-sage-100', text: 'text-pastel-sage-500', border: 'border-pastel-sage-200' },
    Mindset: { bg: 'bg-pastel-butter-100', text: 'text-pastel-butter-500', border: 'border-pastel-butter-200' },
    Focus: { bg: 'bg-pastel-sky-100', text: 'text-pastel-sky-500', border: 'border-pastel-sky-200' },
  };

  const catStyle = categoryStyles[currentTip.category] || categoryStyles.Energize;

  return (
    <div className={`relative bg-gradient-to-br from-white via-pastel-cream to-white rounded-3xl p-6 sm:p-7 border border-pastel-border shadow-soft-md transition-all duration-300 ${
      isRotating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
    }`}>
      {/* Top Bar with Category & Playful Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
            {currentTip.category}
          </span>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-pastel-lilac-500" /> Daily Golden Principle
          </span>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Favorite */}
          <button
            onClick={() => {
              sound.playPop();
              onToggleFavorite(currentTip.id);
            }}
            className={`p-2 rounded-full border transition ${
              isFavorite
                ? 'bg-pastel-rose-100 text-pastel-rose-500 border-pastel-rose-200'
                : 'bg-stone-50 hover:bg-stone-100 text-slate-400 border-stone-200/80'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pastel-rose-500' : ''}`} />
          </button>

          {/* Roll Random Tip */}
          <button
            onClick={handleRollRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-stone-100 text-slate-600 border border-stone-200/80 text-xs font-semibold transition active:scale-95"
            title="Surprise me with another principle"
          >
            <Dices className="w-3.5 h-3.5 text-pastel-lilac-500" />
            <span className="hidden sm:inline">Surprise Tip</span>
          </button>

          {/* Browse All */}
          <button
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pastel-lilac-50 hover:bg-pastel-lilac-100 text-pastel-lilac-500 border border-pastel-lilac-200 text-xs font-semibold transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All 30+ Tips</span>
          </button>
        </div>
      </div>

      {/* Main Tip Headline */}
      <div className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
          {currentTip.title}
        </h2>

        {/* Quote Block with pastel background */}
        <div className="relative pl-4 pr-3 py-3 rounded-2xl bg-pastel-cream/70 border-l-4 border-pastel-lilac-300">
          <p className="text-sm sm:text-base italic font-medium text-slate-700 leading-relaxed">
            "{currentTip.quote}"
          </p>
        </div>

        {/* Takeaway */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {currentTip.takeaway}
        </p>

        {/* Actionable Step Pill */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pastel-sage-50/70 border border-pastel-sage-200/80 mt-2">
          <div className="w-6 h-6 rounded-full bg-pastel-sage-200 flex items-center justify-center shrink-0 text-pastel-sage-500 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700">
            <span className="font-bold text-slate-800">Try this today: </span>
            {currentTip.actionableStep}
          </div>
        </div>
      </div>

      {/* Bottom Footer: Source & Applied Button */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Origin info */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Bookmark className="w-3.5 h-3.5 text-pastel-rose-500" />
          <span className="font-medium text-slate-600">{currentTip.source}</span>
          {currentTip.chapter && (
            <span className="text-slate-400 hidden md:inline">
              • {currentTip.chapter}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Share / Copy */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-stone-100 transition text-xs flex items-center gap-1"
            title="Copy tip"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">{copied ? 'Copied!' : ''}</span>
          </button>

          {/* Applied Today Button */}
          <button
            onClick={handleApply}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-soft-sm active:scale-95 ${
              isApplied
                ? 'bg-pastel-sage-100 text-pastel-sage-500 border border-pastel-sage-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-soft-md'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isApplied ? 'text-pastel-sage-500' : 'text-pastel-sage-200'}`} />
            <span>{isApplied ? 'Applied Today (+25 XP)' : 'Apply Tip Today (+25 XP)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

