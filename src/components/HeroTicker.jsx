import React, { useEffect, useRef } from 'react';
import { formatDistance, formatNumber } from '../utils/formatters';
import { ShieldCheck, Zap, Globe, TrendingUp, Sparkles } from 'lucide-react';

export default function HeroTicker({
  miles,
  unit,
  effectiveRate,
  sessionMiles,
  playTick
}) {
  const prevMilesRef = useRef(miles);

  // Play audio tick whenever miles integer ticks significantly
  useEffect(() => {
    if (Math.floor(miles) !== Math.floor(prevMilesRef.current)) {
      playTick?.();
      prevMilesRef.current = miles;
    }
  }, [miles, playTick]);

  // Formatted string representation
  const formattedDistance = formatDistance(miles, unit, 0);

  // Split integer and commas to highlight the rapidly updating end digits
  // e.g. "14,586,254,064" -> prefix "14,586,25" and suffix "4,064"
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
    <section className="relative z-10 pt-10 pb-16 sm:pt-16 sm:pb-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Top Pre-badge */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6 shadow-xs animate-subtle-float">
        <span className="flex h-2 w-2 rounded-full bg-tesla-red animate-pulse"></span>
        <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-300">
          Supervised Fleet Autonomy Telemetry
        </span>
        <span className="text-neutral-400 dark:text-neutral-600">•</span>
        <span className="text-[11px] sm:text-xs font-mono font-medium text-tesla-red">
          V12 / V13 End-to-End Neural Nets
        </span>
      </div>

      {/* Main Headline Label */}
      <h1 className="text-sm sm:text-base md:text-lg font-medium tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mb-3 sm:mb-4">
        Cumulative FSD (Supervised) {unit === 'km' ? 'Kilometers' : 'Miles'} Driven
      </h1>

      {/* THE MAIN BIG THING: Massive Live-Updating Counter */}
      <div className="relative my-2 sm:my-4 group">
        
        {/* Subtle background ambient back-glow in dark mode */}
        <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent blur-2xl opacity-60 dark:opacity-80 pointer-events-none" />

        <div className="relative font-tesla font-extrabold tracking-tight tabular-nums select-none flex items-baseline justify-center text-neutral-900 dark:text-white">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] leading-none transition-all duration-75">
            {stablePart}
            <span className="text-tesla-red dark:text-red-500 inline-block transition-transform duration-75">
              {rapidPart}
            </span>
          </span>
          <span className="text-lg sm:text-2xl md:text-3xl font-bold ml-2 text-neutral-400 dark:text-neutral-500 self-start mt-2">
            ¹
          </span>
        </div>
      </div>

      {/* Real-time Rate Pill and Velocity */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          <TrendingUp size={15} className="text-emerald-500" />
          <span>Velocity:</span>
          <span className="font-mono font-bold text-neutral-900 dark:text-white">
            +{rateDisplay} {unit}/sec
          </span>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          <Zap size={15} className="text-amber-500" />
          <span>Throughput:</span>
          <span className="font-mono font-bold text-neutral-900 dark:text-white">
            +{ratePerMin} {unit}/min
          </span>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
          <Sparkles size={15} className="text-tesla-red" />
          <span>Logged this session:</span>
          <span className="font-mono font-bold text-neutral-900 dark:text-white">
            +{formatDistance(sessionMiles, unit, 1)} {unit}
          </span>
        </div>
      </div>

      {/* Minimal Tesla CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#milestone"
          className="px-6 py-2.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs sm:text-sm font-semibold tracking-wide uppercase hover:opacity-90 transition-opacity shadow-sm"
        >
          Fleet Milestone Roadmap
        </a>
        <a
          href="#safety"
          className="px-6 py-2.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold tracking-wide uppercase hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 transition-colors"
        >
          Safety Benchmark (7x)
        </a>
      </div>

    </section>
  );
}
