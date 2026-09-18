import React, { useMemo, useState, useEffect, useRef } from 'react';
import { formatDistance, getTimeUntilTarget, formatNumber } from '../utils/formatters';
import confetti from 'canvas-confetti';
import { Award, Clock, Calendar, CheckCircle2, ChevronRight, Sparkles, Orbit, Milestone } from 'lucide-react';

const MILESTONE_ROADMAP = [
  {
    targetMiles: 1000000000,
    labelMiles: '1 Billion Miles',
    labelKm: '1.6 Billion Kilometers',
    shortLabel: '1B',
    subtitle: 'Initial FSD Beta Milestone',
    spaceEquiv: '10.7 Astronomical Units (AU)',
    year: 'Q1 2024'
  },
  {
    targetMiles: 5000000000,
    labelMiles: '5 Billion Miles',
    labelKm: '8.0 Billion Kilometers',
    shortLabel: '5B',
    subtitle: 'V12 End-to-End Neural Net Rollout',
    spaceEquiv: '53.8 AU (Past Pluto)',
    year: 'Q4 2024'
  },
  {
    targetMiles: 10000000000,
    labelMiles: '10 Billion Miles',
    labelKm: '16.1 Billion Kilometers',
    shortLabel: '10B',
    subtitle: 'Global Fleet Expansion Scale',
    spaceEquiv: '107.5 AU (Interstellar Boundary)',
    year: 'Mid 2025'
  },
  {
    targetMiles: 15000000000,
    labelMiles: '15 Billion Miles',
    labelKm: '24.1 Billion Kilometers',
    shortLabel: '15B',
    subtitle: 'Supervised Fleet Maturity Benchmark',
    spaceEquiv: '~161 AU (Voyager 1 Distance)',
    year: 'Target: 2026'
  },
  {
    targetMiles: 20000000000,
    labelMiles: '20 Billion Miles',
    labelKm: '32.2 Billion Kilometers',
    shortLabel: '20B',
    subtitle: 'Unsupervised Robotaxi Validation Scale',
    spaceEquiv: '215 AU',
    year: 'Future'
  },
  {
    targetMiles: 25000000000,
    labelMiles: '25 Billion Miles',
    labelKm: '40.2 Billion Kilometers',
    shortLabel: '25B',
    subtitle: 'Cybercab Commercial Production Scale',
    spaceEquiv: '269 AU',
    year: 'Future'
  },
  {
    targetMiles: 50000000000,
    labelMiles: '50 Billion Miles',
    labelKm: '80.5 Billion Kilometers',
    shortLabel: '50B',
    subtitle: 'Planetary Autonomous Transport Network',
    spaceEquiv: '538 AU (Inner Oort Cloud)',
    year: 'Future'
  },
  {
    targetMiles: 100000000000,
    labelMiles: '100 Billion Miles',
    labelKm: '160.9 Billion Kilometers',
    shortLabel: '100B',
    subtitle: 'Universal Autonomous Transportation',
    spaceEquiv: '1,075 AU (Deep Oort Cloud)',
    year: 'Long-term'
  }
];

export default function MilestoneProgress({
  miles,
  unit = 'miles',
  effectiveRate
}) {
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(null);
  const prevCrossedRef = useRef(null);

  // Automatically find the active milestone based on live accumulated miles
  const currentActiveIndex = useMemo(() => {
    const idx = MILESTONE_ROADMAP.findIndex(m => m.targetMiles > miles);
    return idx !== -1 ? idx : MILESTONE_ROADMAP.length - 1;
  }, [miles]);

  // Which milestone is being displayed (either active or user-selected)
  const activeIndex = selectedTargetIndex !== null ? selectedTargetIndex : currentActiveIndex;
  const activeMilestone = MILESTONE_ROADMAP[activeIndex];

  const prevMilestoneTarget = activeIndex > 0 ? MILESTONE_ROADMAP[activeIndex - 1].targetMiles : 0;
  const targetDistanceMiles = activeMilestone.targetMiles;
  const remainingMiles = Math.max(targetDistanceMiles - miles, 0);

  // Detect when milestone is crossed live and fire celebration
  useEffect(() => {
    if (prevCrossedRef.current === null) {
      prevCrossedRef.current = currentActiveIndex;
    } else if (currentActiveIndex > prevCrossedRef.current) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#e82127', '#ffffff', '#ffd700']
      });
      prevCrossedRef.current = currentActiveIndex;
    }
  }, [currentActiveIndex]);

  // Progress percentage towards the current active milestone
  const progressPercent = useMemo(() => {
    if (miles >= targetDistanceMiles) return 100;
    const range = targetDistanceMiles - prevMilestoneTarget;
    if (range <= 0) return 100;
    const completed = miles - prevMilestoneTarget;
    const pct = (completed / range) * 100;
    return Math.min(Math.max(pct, 0), 100);
  }, [miles, targetDistanceMiles, prevMilestoneTarget]);

  // Countdown clock
  const countdown = useMemo(() => {
    return getTimeUntilTarget(remainingMiles, effectiveRate);
  }, [remainingMiles, effectiveRate]);

  // Projected arrival date
  const projectedDate = useMemo(() => {
    if (miles >= targetDistanceMiles) return 'Milestone Achieved 🎉';
    if (effectiveRate <= 0) return 'Estimating...';
    const secondsNeeded = remainingMiles / effectiveRate;
    const target = new Date(Date.now() + secondsNeeded * 1000);
    return target.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [miles, targetDistanceMiles, remainingMiles, effectiveRate]);

  const activeLabel = unit === 'km' ? activeMilestone.labelKm : activeMilestone.labelMiles;

  const handleManualCelebrate = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e82127', '#ffffff', '#34c759']
    });
  };

  return (
    <section id="milestone" className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-200 dark:border-neutral-800/80 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-md bg-tesla-red/10 text-tesla-red">
                <Milestone size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-tesla-red">
                Dynamic Fleet Milestone Engine
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mt-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-tesla text-neutral-900 dark:text-white">
                {miles >= targetDistanceMiles ? `Achieved Milestone: ${activeLabel}` : `Next Target: ${activeLabel}`}
              </h3>
              <span className="text-[11px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400">
                ({formatDistance(targetDistanceMiles, unit, 0)} {unit})
              </span>
              {miles >= targetDistanceMiles && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Completed {activeMilestone.year}
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {activeMilestone.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto mt-1 sm:mt-0">
            {selectedTargetIndex !== null && (
              <button
                onClick={() => setSelectedTargetIndex(null)}
                className="text-[11px] sm:text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                Reset to Current
              </button>
            )}
            <button
              onClick={handleManualCelebrate}
              className="text-[11px] sm:text-xs font-medium px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-800 dark:text-neutral-200 flex items-center space-x-1.5"
            >
              <Sparkles size={13} className="text-tesla-red shrink-0" />
              <span>Simulate Confetti</span>
            </button>
          </div>
        </div>

        {/* Multi-Tier Milestone Selector Tabs */}
        <div className="mt-4 sm:mt-6 flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
          {MILESTONE_ROADMAP.map((m, idx) => {
            const isCompleted = miles >= m.targetMiles;
            const isCurrent = idx === currentActiveIndex;
            const isSelected = idx === activeIndex;

            return (
              <button
                key={m.targetMiles}
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    try { navigator.vibrate(8); } catch {}
                  }
                  setSelectedTargetIndex(idx);
                }}
                aria-label={`Select milestone ${m.labelMiles}`}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 border shrink-0 ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                    : isCurrent
                    ? 'bg-red-500/10 text-tesla-red border-red-500/30'
                    : isCompleted
                    ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-tesla-red animate-pulse shrink-0" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700 shrink-0" />
                )}
                <span>{m.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Progress Bar Track */}
        <div className="mt-4 sm:mt-6">
          <div className="flex justify-between items-end mb-2 text-[11px] sm:text-sm font-semibold">
            <span className="text-neutral-600 dark:text-neutral-300 truncate mr-2">
              Progress: <span className="text-neutral-900 dark:text-white font-mono">{progressPercent.toFixed(3)}%</span>
            </span>
            {miles >= targetDistanceMiles ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1 shrink-0">
                <CheckCircle2 size={13} className="shrink-0" />
                <span>Achieved in {activeMilestone.year}</span>
              </span>
            ) : (
              <span className="text-neutral-600 dark:text-neutral-300 shrink-0">
                Remaining: <span className="text-neutral-900 dark:text-white font-mono">
                  {formatDistance(remainingMiles, unit, 0)} {unit}
                </span>
              </span>
            )}
          </div>

          {/* Bar track */}
          <div 
            role="progressbar"
            aria-valuenow={Math.round(progressPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress to ${activeLabel}`}
            className="h-4 sm:h-5 w-full bg-neutral-200/80 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-300/60 dark:border-neutral-700/60 shadow-inner"
          >
            <div
              className="h-full bg-gradient-to-r from-red-700 via-[#e82127] to-red-400 rounded-full transition-all duration-300 relative shadow-md shadow-red-500/30"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-neutral-400 dark:text-neutral-400 font-medium">
            <span>
              Previous: {prevMilestoneTarget > 0 ? (unit === 'km' ? (prevMilestoneTarget * 1.609344 / 1e9).toFixed(1) + 'B km' : (prevMilestoneTarget / 1e9).toFixed(0) + 'B mi') : '0'}
            </span>
            <span>
              Target: {unit === 'km' ? (targetDistanceMiles * 1.609344 / 1e9).toFixed(1) + 'B km' : (targetDistanceMiles / 1e9).toFixed(0) + 'B mi'}
            </span>
          </div>
        </div>

        {/* Countdown Grid (Live ETA) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-center shadow-xs">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-tesla text-neutral-900 dark:text-white tabular-nums">
              {countdown.days}
            </span>
            <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase mt-0.5">
              Days
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-center shadow-xs">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-tesla text-neutral-900 dark:text-white tabular-nums">
              {String(countdown.hours).padStart(2, '0')}
            </span>
            <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase mt-0.5">
              Hours
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-center shadow-xs">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-tesla text-neutral-900 dark:text-white tabular-nums">
              {String(countdown.minutes).padStart(2, '0')}
            </span>
            <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase mt-0.5">
              Minutes
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-center shadow-xs">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-tesla text-tesla-red tabular-nums">
              {String(countdown.seconds).padStart(2, '0')}
            </span>
            <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase mt-0.5">
              Seconds
            </p>
          </div>
        </div>

        {/* Projected Crossing Date & Astronomical Equivalence */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 text-xs text-neutral-600 dark:text-neutral-400 gap-2">
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-neutral-500 shrink-0" />
            <span>Projected Arrival:</span>
            <strong className="text-neutral-900 dark:text-white">{projectedDate}</strong>
          </div>
          
          <div className="flex items-center space-x-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
            <Orbit size={13} className="text-tesla-red shrink-0" />
            <span>Cosmic scale: <strong>{activeMilestone.spaceEquiv}</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
