import React from 'react';
import { Shield, CheckCircle, Info } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

export default function SafetyComparison({ unit = 'miles' }) {
  const isKm = unit === 'km';
  const multiplier = isKm ? 1.609344 : 1;
  const unitLabel = isKm ? 'kilometers' : 'miles';

  const fsdDistance = Math.round(4960000 * multiplier);
  const passiveSafetyDistance = Math.round(1510000 * multiplier);
  const nationalAvgDistance = Math.round(670000 * multiplier);

  return (
    <section id="safety" className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div className="bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 sm:pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-emerald-500">
                Tesla Vehicle Safety Report Benchmark
              </span>
            </div>
            <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold font-tesla text-neutral-900 dark:text-white">
              7x Safer Than The US National Average⁵
            </h3>
          </div>

          <span className="text-[11px] sm:text-xs font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start sm:self-auto font-mono">
            Fleet Safety Benchmark
          </span>
        </div>

        {/* Comparative Bars */}
        <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          
          {/* FSD Supervised Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center space-x-1.5 sm:space-x-2">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>Tesla FSD (Supervised) Engaged</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-500">
                1 crash per {formatNumber(fsdDistance)} {unitLabel}
              </span>
            </div>
            <div className="h-4 sm:h-5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden p-0.5">
              <div 
                role="progressbar"
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Tesla FSD Supervised relative safety level: 100%"
                className="h-full bg-emerald-500 rounded-md transition-all duration-700 w-full relative"
              >
                <span className="absolute inset-y-0 right-2 my-auto flex items-center text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">
                  7.4x Safer
                </span>
              </div>
            </div>
          </div>

          {/* Tesla Fleet Without Autopilot Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center space-x-1.5 sm:space-x-2">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-500 shrink-0"></span>
                <span>Tesla Vehicles (Active Safety only, No FSD)</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-neutral-600 dark:text-neutral-400">
                1 crash per {formatNumber(passiveSafetyDistance)} {unitLabel}
              </span>
            </div>
            <div className="h-3.5 sm:h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden p-0.5">
              <div 
                role="progressbar"
                aria-valuenow={30.4}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Tesla Vehicles without FSD relative safety level: 30.4%"
                className="h-full bg-blue-500 rounded-md transition-all duration-700 w-[30.4%]" 
              />
            </div>
          </div>

          {/* NHTSA US National Average Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 flex items-center space-x-1.5 sm:space-x-2">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-neutral-400 shrink-0"></span>
                <span>US National Average (NHTSA / FHWA Data)</span>
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-neutral-600 dark:text-neutral-400">
                1 crash per {formatNumber(nationalAvgDistance)} {unitLabel}
              </span>
            </div>
            <div className="h-3.5 sm:h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden p-0.5">
              <div 
                role="progressbar"
                aria-valuenow={13.5}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="US National Average relative safety level: 13.5%"
                className="h-full bg-neutral-400 dark:bg-neutral-600 rounded-md transition-all duration-700 w-[13.5%]" 
              />
            </div>
          </div>

        </div>

        {/* Factual Regulatory Notice */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-start space-x-2.5 text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400">
          <Info size={15} className="text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>Supervision Notice:</strong> Full Self-Driving (Supervised) is an SAE Level 2 advanced driver assistance system. The human driver remains responsible at all times, must keep their hands on the wheel, eyes on the road, and be prepared to take immediate corrective action.
          </span>
        </div>

        {/* Safety Pillars Grid */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 pt-6 sm:pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center space-x-1.5 sm:space-x-2">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>End-to-End Neural Nets</span>
            </h4>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Camera photon inputs directly generate vehicle control outputs without hardcoded heuristic decision trees.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center space-x-1.5 sm:space-x-2">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>360° Vision Awareness</span>
            </h4>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Eight external optical cameras provide continuous situational awareness with sub-millisecond perception refresh rates.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center space-x-1.5 sm:space-x-2">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>Fleet Telematics Learning</span>
            </h4>
            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Disengagements and complex driving situations captured across the global fleet are ingested into AI training clusters.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
