import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Heart, Sparkles, Feather } from 'lucide-react';
import { sound } from '../utils/audio';
import { firePastelConfetti } from '../utils/confetti';

interface BreathingResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSession: () => void;
}

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';

export const BreathingResetModal: React.FC<BreathingResetModalProps> = ({
  isOpen,
  onClose,
  onCompleteSession,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [totalSeconds, setTotalSeconds] = useState(60);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setPhase('Inhale');
      setPhaseSeconds(4);
      setTotalSeconds(60);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            // Completed 60s
            setIsActive(false);
            sound.playLevelUp();
            firePastelConfetti();
            onCompleteSession();
            return 0;
          }
          return prev - 1;
        });

        setPhaseSeconds(prev => {
          if (prev <= 1) {
            // Advance phase
            setPhase(curr => {
              let nextPhase: BreathPhase = 'Inhale';
              if (curr === 'Inhale') nextPhase = 'Hold';
              else if (curr === 'Hold') nextPhase = 'Exhale';
              else if (curr === 'Exhale') nextPhase = 'Rest';
              else if (curr === 'Rest') nextPhase = 'Inhale';

              if (nextPhase === 'Inhale') {
                sound.playSingingBowl();
              } else {
                sound.playPop();
              }
              return nextPhase;
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, totalSeconds, onCompleteSession]);

  if (!isOpen) return null;

  const toggleActive = () => {
    sound.playPop();
    if (!isActive && phase === 'Inhale') {
      sound.playSingingBowl();
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    sound.playPop();
    setIsActive(false);
    setPhase('Inhale');
    setPhaseSeconds(4);
    setTotalSeconds(60);
  };

  // Visual scale for breath orb
  const orbScale =
    phase === 'Inhale'
      ? 'scale-125 bg-pastel-sky-200/80 shadow-pastel-blue'
      : phase === 'Hold'
      ? 'scale-125 bg-pastel-lilac-200/80 shadow-pastel-purple'
      : phase === 'Exhale'
      ? 'scale-90 bg-pastel-sage-200/80 shadow-pastel-green'
      : 'scale-90 bg-stone-100 shadow-soft-sm';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-soft-lg border border-pastel-border animate-pop text-center space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-pastel-sky-100 flex items-center justify-center text-pastel-sky-500">
              <Feather className="w-4 h-4" />
            </span>
            <div className="text-left">
              <h3 className="text-base font-bold text-slate-800">Box Breathing Reset</h3>
              <p className="text-xs text-slate-400">4-4-4-4 Nervous System Grounding</p>
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

        {/* Breathing Circle Visualizer */}
        <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
          {/* Outer Ripple */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed border-pastel-sky-300 transition-all duration-1000 ${
              isActive ? 'animate-spin' : 'opacity-40'
            }`}
            style={{ animationDuration: '16s' }}
          />

          {/* Dynamic Expanding/Contracting Breath Orb */}
          <div
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${orbScale}`}
          >
            <span className="text-xl font-extrabold text-slate-800 tracking-wide font-sans">
              {phase}
            </span>
            <span className="text-3xl font-extrabold text-slate-700 font-mono mt-1">
              {phaseSeconds}s
            </span>
          </div>
        </div>

        {/* Status & Subtext */}
        <div>
          <span className="text-xs font-semibold text-slate-500">
            {totalSeconds === 0 ? '✨ Session Complete! Nervous system reset.' : `${totalSeconds}s remaining`}
          </span>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
            Deep diaphragmatic breathing lowers heart rate, clears cortisol, and restores creative flow.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleActive}
            className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-soft-sm flex items-center gap-2 active:scale-95 ${
              isActive
                ? 'bg-pastel-peach-500 hover:bg-pastel-peach-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-white" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" /> Start 60s Reset
              </>
            )}
          </button>

          <button
            onClick={reset}
            className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-600 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
