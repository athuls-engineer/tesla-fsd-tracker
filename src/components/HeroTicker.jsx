import React from 'react';
import { formatDistance, formatNumber } from '../utils/formatters';
import { Zap, TrendingUp, Sparkles } from 'lucide-react';

export default function HeroTicker({
  miles,
  unit,
  effectiveRate,
  sessionMiles
}) {
  // Formatted string representation
  const formattedDistance = formatDistance(miles, unit, 0);

  // Split integer and commas to highlight the rapidly updating end digits
  const commaIndex = formattedDistance.lastIndexOf(',');
  const stablePart = commaIndex !== -1 ? formattedDistance.substring(0, commaIndex + 1) : '';
  const rapidPart = commaIndex !== -1 ? formattedDistance.substring(commaIndex + 1) : formattedDistance;

  const rateDisplay = unit === 'km' 
    ? (effectiveRate * 1.609344).toFixed(1)
    : effectiveRate.toFixed(1);

  const ratePerMin = unit === 'km'
    ? Math.round(effectiveRate * 1.609344 * 60).toLocaleString()
    : Math.round(effectiveRate * 60).toLocaleString();

  return (
    <section className="relative z-10 pt-6 pb-12 sm:pt-16 sm:pb-24 flex flex-col items-center justify-center text-center px-3 sm:px-4 overflow-hidden w-full max-w-full">
      
      {/* Top Pre-badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 mb-5 shadow-xs backdrop-blur-sm max-w-full">
        <span className="flex h-2 w-2 rounded-full bg-tesla-red animate-pulse shrink-0"></span>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300 truncate">
          Supervised Fleet Autonomy Telemetry
        </span>
        <span className="text-neutral-300 dark:text-neutral-700">•</span>
        <span className="text-[11px] font-semibold text-tesla-red tracking-wide truncate">
          V12 / V13 Neural Nets
        </span>
      </div>

      {/* Main Headline Label */}
      <h1 className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-neutral-500 dark:text-neutral-400 uppercase mb-3 px-2">
        Cumulative FSD (Supervised) {unit === 'km' ? 'Kilometers' : 'Miles'} Driven
      </h1>

      {/* THE MAIN BIG THING: Responsive Fluid Live-Updating Counter */}
      <div className="relative my-2 sm:my-4 group w-full max-w-full overflow-visible">
        
        {/* Subtle background ambient back-glow in dark mode */}
        <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent blur-2xl opacity-60 dark:opacity-80 pointer-events-none" />

        <div className="relative font-tesla font-extrabold tracking-tight tabular-nums select-none flex items-baseline justify-center text-neutral-900 dark:text-white px-1">
          <span className="hero-counter-odometer leading-none transition-all duration-75 whitespace-nowrap">
            {stablePart}
            <span className="text-tesla-red dark:text-red-500 inline-block transition-transform duration-75">
              {rapidPart}
            </span>
            <sup className="text-[0.3em] font-bold ml-1 text-neutral-400 dark:text-neutral-500 relative -top-[0.55em] select-none">
              1
            </sup>
          </span>
        </div>
      </div>

      {/* Real-time Rate Pill and Velocity */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-medium w-full max-w-2xl px-2">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs shadow-xs">
          <TrendingUp size={14} className="text-emerald-500 shrink-0" />
          <span className="text-neutral-500 dark:text-neutral-400">Velocity:</span>
          <span className="font-semibold tabular-nums text-neutral-900 dark:text-white">
            +{rateDisplay} {unit}/s
          </span>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs shadow-xs">
          <Zap size={14} className="text-amber-500 shrink-0" />
          <span className="text-neutral-500 dark:text-neutral-400">Throughput:</span>
          <span className="font-semibold tabular-nums text-neutral-900 dark:text-white">
            +{ratePerMin} {unit}/min
          </span>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs shadow-xs">
          <Sparkles size={14} className="text-tesla-red shrink-0" />
          <span className="text-neutral-500 dark:text-neutral-400">Session:</span>
          <span className="font-semibold tabular-nums text-neutral-900 dark:text-white">
            +{formatDistance(sessionMiles, unit, 1)} {unit}
          </span>
        </div>
      </div>

      {/* Minimal Tesla CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
        <a
          href="#milestone"
          className="w-full sm:w-auto min-w-[210px] px-7 py-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold tracking-wider uppercase hover:opacity-90 active:scale-[0.99] transition-all shadow-sm text-center"
        >
          Fleet Milestone Roadmap
        </a>
        <a
          href="#safety"
          className="w-full sm:w-auto min-w-[210px] px-7 py-3 rounded-full bg-neutral-100 dark:bg-neutral-850 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold tracking-wider uppercase border border-neutral-200 dark:border-neutral-700/80 active:scale-[0.99] transition-all text-center"
        >
          Safety Benchmark (7x)
        </a>
      </div>

    </section>
  );
}
