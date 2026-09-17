import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Generates an ultra-subtle mechanical tick sound using Web Audio API
 */
export function useAudioClick() {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const lastPlayTimeRef = useRef(0);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playTick = useCallback(() => {
    if (!isEnabled) return;

    const now = performance.now();
    // Throttle clicks to at most 10 times per second for pleasant acoustic cadence
    if (now - lastPlayTimeRef.current < 90) return;
    lastPlayTimeRef.current = now;

    try {
      initAudio();
      if (!audioCtxRef.current) return;

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // High crisp frequency tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.015);

      // Very low volume, subtle haptic feel
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    } catch (e) {
      console.warn('Audio tick error', e);
    }
  }, [isEnabled, initAudio]);

  const toggleSound = () => {
    initAudio();
    setIsEnabled(prev => !prev);
  };

  return { isEnabled, toggleSound, playTick };
}
