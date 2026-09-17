import React from 'react';

export default function StatTrio({
  onOpenCountries,
  onOpenSafety
}) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Container replicating the authentic Tesla stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-start border-t border-neutral-200/80 dark:border-neutral-800/80 pt-6 sm:pt-8">
        
        {/* Column 1: Global Fleet Scale */}
        <div className="md:pr-8 md:pl-2 flex flex-col justify-start pb-4 md:pb-0 border-b md:border-b-0 border-neutral-100 dark:border-neutral-800">
          <div className="flex items-baseline">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-tesla tracking-tight text-neutral-900 dark:text-white">
              2M+ <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl">Fleet</span>
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-neutral-400 dark:text-neutral-400 ml-1 self-start mt-1">
              ¹
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base font-normal text-neutral-500 dark:text-neutral-400">
            Active Vehicles with AI Hardware
          </p>
        </div>

        {/* Column 2: 7x Safer */}
        <div 
          onClick={onOpenSafety}
          className="md:px-8 md:border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-start cursor-pointer group pb-4 md:pb-0 border-b md:border-b-0 border-neutral-100 dark:border-neutral-800"
        >
          <div className="flex items-baseline">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-tesla tracking-tight text-neutral-900 dark:text-white group-hover:text-tesla-red transition-colors">
              7x <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl">Safer</span>
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-neutral-400 dark:text-neutral-400 ml-1 self-start mt-1">
              ⁵
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base font-normal text-neutral-500 dark:text-neutral-400 max-w-xs leading-snug">
            Than a Human Driver When FSD (Supervised) Is Engaged⁵
          </p>
          <span className="mt-1.5 sm:mt-2 text-xs font-semibold text-tesla-red opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            View NHTSA Safety Benchmark &rarr;
          </span>
        </div>

        {/* Column 3: 12 Countries */}
        <div 
          onClick={onOpenCountries}
          className="md:pl-8 md:border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-start cursor-pointer group"
        >
          <div className="flex items-baseline">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-tesla tracking-tight text-neutral-900 dark:text-white group-hover:text-tesla-red transition-colors">
              12 <span className="font-semibold text-2xl sm:text-3xl lg:text-4xl">Countries</span>
            </h2>
            <span className="text-xs sm:text-sm font-semibold text-neutral-400 dark:text-neutral-400 ml-1 self-start mt-1">
              ¹
            </span>
          </div>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base font-normal text-neutral-500 dark:text-neutral-400">
            And Counting¹
          </p>
          <span className="mt-1.5 sm:mt-2 text-xs font-semibold text-tesla-red opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            Explore Global Rollout &rarr;
          </span>
        </div>

      </div>
    </section>
  );
}
