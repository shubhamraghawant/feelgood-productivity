import React from 'react';
import { Flower2, Sparkles, Sprout, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface BloomingGardenProps {
  growth: number; // 0 to 100
  streak: number;
}

export const BloomingGarden: React.FC<BloomingGardenProps> = ({ growth, streak }) => {
  const clampedGrowth = Math.min(100, Math.max(0, growth));

  // Determine stage (1 to 5)
  const stage = clampedGrowth < 20 ? 1 : clampedGrowth < 45 ? 2 : clampedGrowth < 70 ? 3 : clampedGrowth < 95 ? 4 : 5;

  const stageTitles: Record<number, { title: string; subtitle: string }> = {
    1: { title: 'Dormant Seed', subtitle: 'Planting intentional intentions' },
    2: { title: 'Gentle Sprout', subtitle: 'Reaching toward morning light' },
    3: { title: 'Two Leaves', subtitle: 'Consistent daily nourishment' },
    4: { title: 'Budding Stem', subtitle: 'Almost ready to blossom' },
    5: { title: 'Full Bloom Lotus', subtitle: 'Peak vitality & balanced energy' },
  };

  const handlePlantClick = () => {
    sound.playWaterDrop();
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-pastel-sage-50/40 to-white border border-pastel-sage-200/80 shadow-soft-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-pastel-sage-100 flex items-center justify-center text-pastel-sage-500 shadow-soft-sm">
            <Sprout className="w-4 h-4 text-pastel-sage-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">The Blooming Sanctuary</h3>
            <p className="text-[11px] text-slate-400">Habit & consistency garden</p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pastel-sage-100 text-pastel-sage-500 border border-pastel-sage-200">
          Stage {stage}/5
        </span>
      </div>

      {/* Interactive Plant Illustration */}
      <div
        onClick={handlePlantClick}
        className="relative w-full h-36 bg-gradient-to-b from-stone-50/50 to-pastel-sage-50/70 rounded-2xl border border-pastel-sage-100 flex items-center justify-center cursor-pointer group overflow-hidden select-none"
        title="Tap to nurture your plant"
      >
        <svg
          viewBox="0 0 160 140"
          className="w-36 h-32 transition-transform duration-500 group-hover:scale-105"
        >
          {/* Pot */}
          <path
            d="M 50 110 L 110 110 L 102 135 L 58 135 Z"
            fill="#FED7AA"
            stroke="#FDBA74"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 46 104 L 114 104 L 114 110 L 46 110 Z"
            fill="#FDBA74"
            rx="2"
          />

          {/* Plant Stages */}
          {stage === 1 && (
            /* Tiny Seedling */
            <g className="animate-bounce">
              <ellipse cx="80" cy="100" rx="4" ry="3" fill="#86EFAC" />
              <path d="M 80 100 Q 75 92 78 88 Q 83 92 80 100" fill="#22C55E" />
            </g>
          )}

          {stage === 2 && (
            /* Sprout */
            <g className="transition-all duration-500">
              <path d="M 80 104 Q 80 85 80 75" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
              <path d="M 80 85 Q 70 80 68 72 Q 78 75 80 85" fill="#86EFAC" />
              <path d="M 80 78 Q 90 74 92 68 Q 82 72 80 78" fill="#4ADE80" />
            </g>
          )}

          {stage === 3 && (
            /* Two large leaves & taller stem */
            <g className="transition-all duration-500">
              <path d="M 80 104 Q 80 70 80 55" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 80 85 Q 60 80 56 68 Q 72 72 80 85" fill="#86EFAC" />
              <path d="M 80 72 Q 100 68 104 56 Q 88 62 80 72" fill="#4ADE80" />
              <path d="M 80 58 Q 72 50 74 42 Q 82 46 80 58" fill="#BBF7D0" />
            </g>
          )}

          {stage === 4 && (
            /* Budding stem with bud */
            <g className="transition-all duration-500">
              <path d="M 80 104 Q 78 60 80 42" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
              <path d="M 80 88 Q 55 82 50 68 Q 70 72 80 88" fill="#86EFAC" />
              <path d="M 80 72 Q 105 66 110 52 Q 90 60 80 72" fill="#4ADE80" />
              {/* Flower Bud */}
              <circle cx="80" cy="40" r="9" fill="#F472B6" />
              <circle cx="80" cy="40" r="6" fill="#FBCFE8" />
            </g>
          )}

          {stage === 5 && (
            /* Fully Blossomed Pastel Lotus / Flower */
            <g className="animate-float">
              <path d="M 80 104 Q 80 65 80 48" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
              <path d="M 80 88 Q 52 82 46 66 Q 68 70 80 88" fill="#86EFAC" />
              <path d="M 80 70 Q 108 64 114 48 Q 92 56 80 70" fill="#4ADE80" />
              {/* Petals */}
              <circle cx="80" cy="42" r="16" fill="#F472B6" opacity="0.8" />
              <circle cx="70" cy="38" r="11" fill="#FBCFE8" />
              <circle cx="90" cy="38" r="11" fill="#FBCFE8" />
              <circle cx="80" cy="30" r="11" fill="#FDE047" opacity="0.9" />
              <circle cx="80" cy="42" r="7" fill="#FEF08A" />
            </g>
          )}
        </svg>

        {stage === 5 && (
          <span className="absolute top-2 right-2 text-xs font-bold text-pastel-rose-500 bg-white/90 px-2 py-0.5 rounded-full border border-pastel-rose-200 shadow-soft-sm flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 text-pastel-butter-500" /> Blooming!
          </span>
        )}
      </div>

      {/* Progress & Stage Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-700">{stageTitles[stage].title}</span>
            <span className="text-[11px] text-slate-400 block">{stageTitles[stage].subtitle}</span>
          </div>
          <span className="font-extrabold text-pastel-sage-500">{clampedGrowth}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className="h-full bg-gradient-to-r from-pastel-sage-300 to-pastel-peach-300 rounded-full transition-all duration-700"
            style={{ width: `${clampedGrowth}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
          <span>Complete tasks, drink water & reflect to grow</span>
          <span className="font-semibold text-slate-600">{streak}d Streak</span>
        </p>
      </div>
    </div>
  );
};
