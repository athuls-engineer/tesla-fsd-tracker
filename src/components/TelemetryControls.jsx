import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Sliders, Eye, EyeOff, FastForward } from 'lucide-react';

export default function TelemetryControls({
  isPaused,
  onTogglePause,
  multiplier,
  onChangeMultiplier,
  onReset,
  showAmbient,
  onToggleAmbient,
  onSetManualMiles,
  currentMiles,
  unit = 'miles'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      const cleanVal = inputVal.replace(/,/g, '');
      const milesVal = unit === 'km' ? Number(cleanVal) / 1.609344 : Number(cleanVal);
      onSetManualMiles(milesVal);
      setInputVal('');
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40">
      
      {/* Floating Pill Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1.5 sm:space-x-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xl hover:opacity-95 transition-all text-[11px] sm:text-xs font-semibold tracking-wide border border-neutral-700/30"
      >
        <Sliders size={13} className="shrink-0" />
        <span>Telemetry</span>
        {multiplier > 1 && (
          <span className="px-1.5 py-0.2 rounded-full bg-tesla-red text-white text-[9px] sm:text-[10px] font-mono">
            {multiplier}x
          </span>
        )}
      </button>

      {/* Expanded Controls Drawer (Fluid Responsive Width for All Mobile Screens) */}
      {isOpen && (
        <div className="absolute bottom-12 sm:bottom-14 right-0 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 shadow-2xl animate-fadeIn text-neutral-800 dark:text-neutral-200">
          
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white flex items-center space-x-2">
              <Sliders size={15} className="text-tesla-red shrink-0" />
              <span>Simulation Controls</span>
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Simulation Multipliers */}
          <div className="mt-3 sm:mt-4">
            <label className="text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
              Accumulation Velocity
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 5, 20, 100].map((m) => (
                <button
                  key={m}
                  onClick={() => onChangeMultiplier(m)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    multiplier === m
                      ? 'bg-tesla-red text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3 sm:mt-4 flex items-center space-x-2">
            <button
              onClick={onTogglePause}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                isPaused
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{isPaused ? 'Resume Ticker' : 'Pause Ticker'}</span>
            </button>

            <button
              onClick={onReset}
              title="Reset to official baseline (14,586,254,064 miles)"
              className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold flex items-center space-x-1"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Custom Baseline Input */}
          <form onSubmit={handleManualSubmit} className="mt-3 sm:mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <label className="text-[10px] sm:text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
              Custom Start ({unit === 'km' ? 'Kilometers' : 'Miles'})
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={unit === 'km' ? 'e.g. 25000000000' : 'e.g. 15000000000'}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-tesla-red min-w-0"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 shrink-0"
              >
                Set
              </button>
            </div>
          </form>

        </div>
      )}
    </div>
  );
}
