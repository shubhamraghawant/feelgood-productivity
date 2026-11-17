import React, { useState } from 'react';
import { X, Search, Heart, Sparkles, BookOpen, Bookmark, CheckCircle2 } from 'lucide-react';
import { DailyTip, TipCategory } from '../types';
import { PRODUCTIVITY_TIPS } from '../data/productivityTips';
import { sound } from '../utils/audio';

interface TipsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTip: (tip: DailyTip) => void;
  favoriteTips: string[];
  onToggleFavorite: (tipId: string) => void;
  appliedTips: string[];
}

export const TipsCatalogModal: React.FC<TipsCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectTip,
  favoriteTips,
  onToggleFavorite,
  appliedTips,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories: (TipCategory | 'all' | 'favorites')[] = [
    'all',
    'Energize',
    'Unblock',
    'Sustain',
    'Mindset',
    'Focus',
    'favorites',
  ];

  const filteredTips = PRODUCTIVITY_TIPS.filter(tip => {
    if (selectedCategory === 'favorites') {
      if (!favoriteTips.includes(tip.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (tip.category !== selectedCategory) return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = tip.title.toLowerCase().includes(q);
      const matchQuote = tip.quote.toLowerCase().includes(q);
      const matchTakeaway = tip.takeaway.toLowerCase().includes(q);
      const matchTags = tip.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchQuote || matchTakeaway || matchTags;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-soft-lg border border-pastel-border animate-pop overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-pastel-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pastel-lilac-100 flex items-center justify-center text-pastel-lilac-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Productivity Wisdom Vault</h2>
              <p className="text-xs text-slate-400">
                30+ Core Principles for Joyful Focus & Energy Architecture
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-2xl hover:bg-stone-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-6 bg-pastel-cream/50 border-b border-pastel-border space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keyword, source, or tag (e.g. procrastination, feynman, energy)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-pastel-border text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pastel-lilac-300 shadow-soft-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1 rounded-xl font-bold capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-soft-sm'
                    : 'bg-white text-slate-600 border border-pastel-border hover:bg-stone-50'
                }`}
              >
                {cat === 'favorites' ? '❤️ Favorites' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tips List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {filteredTips.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No tips match your filter</p>
            </div>
          ) : (
            filteredTips.map(tip => {
              const isFav = favoriteTips.includes(tip.id);
              const isApp = appliedTips.includes(tip.id);

              return (
                <div
                  key={tip.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white hover:bg-pastel-cream/40 border border-pastel-border transition shadow-soft-sm space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-lilac-100 text-pastel-lilac-500 border border-pastel-lilac-200 uppercase">
                          {tip.category}
                        </span>
                        {isApp && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-sage-100 text-pastel-sage-500 border border-pastel-sage-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Applied
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-800 mt-1">
                        {tip.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          sound.playPop();
                          onToggleFavorite(tip.id);
                        }}
                        className={`p-1.5 rounded-xl border transition ${
                          isFav
                            ? 'bg-pastel-rose-100 text-pastel-rose-500 border-pastel-rose-200'
                            : 'bg-stone-50 hover:bg-stone-100 text-slate-400 border-stone-200'
                        }`}
                        title="Favorite"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-pastel-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={() => {
                          sound.playPop();
                          onSelectTip(tip);
                          onClose();
                        }}
                        className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-soft-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic">
                    "{tip.quote}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-stone-100">
                    <span className="flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-pastel-rose-500" />
                      {tip.source}
                    </span>
                    <span className="hidden sm:inline">{tip.tags.map(t => `#${t}`).join(' ')}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

