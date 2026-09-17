import { useState, useEffect, useRef } from 'react';

// Baseline calibrated directly from the official Tesla screenshot: 14,586,254,064
const BASE_MILES = 14586254064;
// Estimated global rate: ~20 million miles/day across the worldwide FSD Supervised fleet
// 20,000,000 / 86400 ≈ 231.4815 miles per second
const DEFAULT_RATE_PER_SEC = 231.48;

export function useFsdCounter({
  initialBase = BASE_MILES,
  defaultRate = DEFAULT_RATE_PER_SEC,
  multiplier = 1,
  isPaused = false
} = {}) {
  const [miles, setMiles] = useState(initialBase);
  const [sessionMiles, setSessionMiles] = useState(0);
  const [rate, setRate] = useState(defaultRate);
  
  const lastTimeRef = useRef(performance.now());
  const milesRef = useRef(initialBase);
  const sessionMilesRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // Sync ref with initialBase if changed externally
  useEffect(() => {
    milesRef.current = initialBase;
    setMiles(initialBase);
  }, [initialBase]);

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const tick = (now) => {
      const deltaMs = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (!isPaused && deltaMs > 0) {
        // Cap max catch-up per frame to 5 seconds to handle backgrounded tabs gracefully without crazy jumps
        const clampedDelta = Math.min(deltaMs, 5000);
        // Organic micro-variation in fleet velocity (+/- 4%)
        const jitter = 1 + (Math.sin(now / 800) * 0.04);
        const effectiveRate = rate * multiplier * jitter;
        const addedMiles = (effectiveRate * clampedDelta) / 1000;

        milesRef.current += addedMiles;
        sessionMilesRef.current += addedMiles;

        setMiles(milesRef.current);
        setSessionMiles(sessionMilesRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [rate, multiplier, isPaused]);

  const resetToBaseline = () => {
    lastTimeRef.current = performance.now();
    milesRef.current = initialBase;
    sessionMilesRef.current = 0;
    setMiles(initialBase);
    setSessionMiles(0);
  };

  const setManualMiles = (val) => {
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      lastTimeRef.current = performance.now();
      milesRef.current = num;
      setMiles(num);
    }
  };

  return {
    miles,
    sessionMiles,
    rate,
    setRate,
    resetToBaseline,
    setManualMiles,
    effectiveRate: rate * multiplier
  };
}
