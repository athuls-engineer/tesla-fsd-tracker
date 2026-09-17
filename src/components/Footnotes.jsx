import React from 'react';

export default function Footnotes() {
  return (
    <footer className="relative z-10 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-black/50 py-12 px-4 sm:px-6 lg:px-8 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-4 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
        
        <p>
          <sup className="font-semibold text-neutral-700 dark:text-neutral-300 mr-1">1</sup>
          <strong>Miles Driven and Regional Availability:</strong> Data reflects cumulative global Tesla fleet telematics collected from all customer vehicles equipped with Full Self-Driving (Supervised) hardware (Hardware 3 and AI4/Hardware 4). The 12 countries and territories represent jurisdictions where FSD (Supervised) is actively accessible to customers or operating under authorized regional supervised deployment programs (including the US, Canada, Mexico, Puerto Rico, Australia, New Zealand, South Korea, and European pilot markets).
        </p>

        <p>
          <sup className="font-semibold text-neutral-700 dark:text-neutral-300 mr-1">5</sup>
          <strong>Safety Comparison Methodology (5-Second Disengagement Rule):</strong> Sourced from the official Tesla Vehicle Safety Report telematics benchmarked against US National Highway Traffic Safety Administration (NHTSA) and Federal Highway Administration (FHWA) national collision frequency datasets (~1 crash per 670,000 miles). To ensure rigorous reporting integrity, Tesla's safety methodology records any collision where FSD (Supervised) was disengaged within <strong>5 seconds</strong> of the crash as an FSD-engaged incident. In normalized fleet driving, vehicles with FSD (Supervised) engaged logged approximately 1 collision per ~4.96 million miles, representing a ~7.4x improvement over the national average.
        </p>

        <div className="pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-600">
          <div className="flex flex-wrap items-center space-x-4 mb-2 sm:mb-0">
            <span>Tesla &copy; {new Date().getFullYear()}</span>
            <a href="https://www.tesla.com/fsd" target="_blank" rel="noreferrer" className="hover:underline">tesla.com/fsd</a>
            <a href="https://www.tesla.com/Vehicle-Safety-Report" target="_blank" rel="noreferrer" className="hover:underline">Vehicle Safety Report</a>
            <a href="https://www.nhtsa.gov" target="_blank" rel="noreferrer" className="hover:underline">NHTSA Benchmark Data</a>
          </div>
          <span className="font-mono text-[10px]">Fact-Checked Against Official Disclosures</span>
        </div>

      </div>
    </footer>
  );
}
