import React, { useState, useMemo, useRef } from 'react';
import { HISTORICAL_FSD_DATA } from '../data/historicalData';
import { formatNumber, formatDistance, MILES_TO_KM } from '../utils/formatters';
import { TrendingUp, Layers, Info, Calendar, Sparkles, Activity, Shield } from 'lucide-react';

export default function GrowthCurve({ currentLiveMiles, unit = 'miles' }) {
  const [scaleMode, setScaleMode] = useState('linear'); // 'linear' | 'log'
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [cursorPos, setCursorPos] = useState(null);
  const svgRef = useRef(null);

  // Append or dynamically update the current live miles at the end of the curve
  const data = useMemo(() => {
    const list = [...HISTORICAL_FSD_DATA];
    if (currentLiveMiles && currentLiveMiles > list[list.length - 1].miles) {
      list[list.length - 1] = {
        ...list[list.length - 1],
        miles: currentLiveMiles,
        labelMiles: `${(currentLiveMiles / 1e9).toFixed(2)}B`,
        notes: 'Live dynamically accumulating telemetry from 2M+ active vehicles worldwide.'
      };
    }
    return list;
  }, [currentLiveMiles]);

  // Chart dimensions
  const width = 1000;
  const height = 400;
  const padding = { top: 40, right: 50, bottom: 60, left: 75 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const minMiles = 0;
  const maxMiles = 16000000000; // 16 Billion for headroom

  // Calculate coordinates for each data point
  const points = useMemo(() => {
    return data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth;
      
      let yNorm;
      if (scaleMode === 'log') {
        const logMin = Math.log10(10000000); // 10M min
        const logMax = Math.log10(maxMiles);
        const logVal = Math.log10(Math.max(d.miles, 10000000));
        yNorm = (logVal - logMin) / (logMax - logMin);
      } else {
        yNorm = d.miles / maxMiles;
      }

      const y = padding.top + (1 - yNorm) * graphHeight;
      return { ...d, x, y };
    });
  }, [data, scaleMode, graphWidth, graphHeight, maxMiles]);

  // Generate smooth cubic Bezier path string
  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }, [points]);

  // Area path for gradient fill
  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    return `${pathD} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
  }, [pathD, points, graphHeight]);

  // Handle mouse / touch scrubbing
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const isTouch = Boolean(e.touches && e.touches.length > 0);
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * width;

    // Find nearest point
    let nearest = points[0];
    let minDiff = Infinity;
    points.forEach(p => {
      const diff = Math.abs(p.x - relativeX);
      if (diff < minDiff) {
        minDiff = diff;
        nearest = p;
      }
    });

    // Haptic feedback on mobile touch scrubbing when snapping to a historical milestone epoch
    if (nearest && (!hoveredPoint || hoveredPoint.date !== nearest.date)) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          navigator.vibrate(8);
        } catch {
          // Ignore if unsupported or restricted by browser permissions
        }
      }
    }

    setHoveredPoint(nearest);
    setCursorPos({ x: nearest.x, y: nearest.y });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setCursorPos(null);
  };

  const activeDisplayPoint = hoveredPoint || points[points.length - 1];
  const displayDistance = formatDistance(activeDisplayPoint.miles, unit, 2);

  return (
    <section id="acceleration" className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div className="bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 shadow-xs">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 sm:pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-md bg-tesla-red/10 text-tesla-red">
                <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px]" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-tesla-red">
                Fleet Telemetry Analytics
              </span>
            </div>
            <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold font-tesla text-neutral-900 dark:text-white">
              Exponential Fleet Acceleration Curve
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Tracking cumulative supervised miles from early beta release to global multi-billion fleet expansion.
            </p>
          </div>

          {/* Scale Selector Tabs & Stats */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start lg:self-auto">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setScaleMode('linear')}
                className={`px-3 py-1.5 rounded-md transition-all text-xs ${
                  scaleMode === 'linear'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Linear Scale
              </button>
              <button
                onClick={() => setScaleMode('log')}
                className={`px-3 py-1.5 rounded-md transition-all text-xs ${
                  scaleMode === 'log'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Logarithmic (Rate)
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium font-mono">
              <Activity size={13} className="shrink-0" />
              <span>291x Ramp Multiplier</span>
            </div>
          </div>
        </div>

        {/* Dynamic Key Metric Banner */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase">
              Current Epoch
            </span>
            <div className="text-base sm:text-xl font-bold font-tesla text-neutral-900 dark:text-white mt-0.5">
              {activeDisplayPoint.date}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase">
              Mileage at Point
            </span>
            <div className="text-base sm:text-xl font-bold font-mono text-tesla-red mt-0.5">
              {displayDistance} {unit}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase">
              Active Software Stack
            </span>
            <div className="text-base sm:text-xl font-bold font-tesla text-neutral-900 dark:text-white mt-0.5 truncate">
              {activeDisplayPoint.version}
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase">
              Accumulation Velocity
            </span>
            <div className="text-base sm:text-xl font-bold font-mono text-emerald-500 mt-0.5">
              {activeDisplayPoint.dailyRate}
            </div>
          </div>
        </div>

        {/* Interactive SVG Trend Line Chart */}
        <div className="mt-6 sm:mt-8 relative w-full overflow-hidden select-none">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-h-[440px] cursor-crosshair overflow-visible"
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleMouseLeave}
          >
            <defs>
              <linearGradient id="teslaRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e82127" stopOpacity="0.32" />
                <stop offset="50%" stopColor="#e82127" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#e82127" stopOpacity="0.00" />
              </linearGradient>
              <linearGradient id="curveStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#888888" stopOpacity="0.6" />
                <stop offset="40%" stopColor="#e82127" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ff3b30" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
              const y = padding.top + (1 - pct) * graphHeight;
              const valMiles = pct * maxMiles;
              const label = unit === 'km' 
                ? `${((valMiles * MILES_TO_KM) / 1e9).toFixed(0)}B km`
                : `${(valMiles / 1e9).toFixed(0)}B mi`;

              return (
                <g key={pct}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="currentColor"
                    className="text-neutral-200/80 dark:text-neutral-800/80"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 12}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[11px] font-mono fill-neutral-400 dark:fill-neutral-500 font-medium"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#teslaRedGrad)" />

            {/* Main Exponential Spline Curve */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#curveStrokeGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* X-Axis Date Labels */}
            {points.map((p, idx) => {
              // Show alternate labels on small view to avoid crowding
              const showLabel = idx % 2 === 0 || idx === points.length - 1;
              if (!showLabel) return null;

              return (
                <text
                  key={p.date}
                  x={p.x}
                  y={padding.top + graphHeight + 25}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-neutral-400 dark:fill-neutral-500"
                >
                  {p.date}
                </text>
              );
            })}

            {/* Data Point Circles */}
            {points.map((p, idx) => {
              const isCurrent = idx === points.length - 1;
              const isHovered = hoveredPoint && hoveredPoint.date === p.date;

              return (
                <g key={p.date}>
                  {isCurrent && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="10"
                      className="fill-tesla-red/30 animate-ping"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : isCurrent ? 5 : 3.5}
                    className={`${
                      isCurrent
                        ? 'fill-tesla-red stroke-white dark:stroke-black stroke-2'
                        : isHovered
                        ? 'fill-white dark:fill-white stroke-tesla-red stroke-2'
                        : 'fill-neutral-300 dark:fill-neutral-700 hover:fill-tesla-red transition-colors'
                    }`}
                  />
                </g>
              );
            })}

            {/* Hover Scrubber Line */}
            {cursorPos && (
              <g>
                <line
                  x1={cursorPos.x}
                  y1={padding.top}
                  x2={cursorPos.x}
                  y2={padding.top + graphHeight}
                  stroke="#e82127"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="opacity-80"
                />
                <circle
                  cx={cursorPos.x}
                  cy={cursorPos.y}
                  r="6.5"
                  className="fill-tesla-red stroke-white dark:stroke-black stroke-2"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Milestone Detail Insight Strip */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-start space-x-2">
            <Info size={15} className="text-tesla-red shrink-0 mt-0.5" />
            <span>
              <strong>{activeDisplayPoint.version}:</strong> {activeDisplayPoint.notes}
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 shrink-0 self-end sm:self-auto">
            Architecture: {activeDisplayPoint.architecture}
          </span>
        </div>

      </div>
    </section>
  );
}
