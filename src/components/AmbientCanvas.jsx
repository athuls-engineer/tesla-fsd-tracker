import React, { useEffect, useRef } from 'react';

/**
 * AmbientCanvas: Renders an ultra-clean, subtle FSD perception visualizer
 * with lane markers, vector paths, and neural-net detection markers in the background.
 */
export default function AmbientCanvas({ isDark = false, isEnabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.45;
      const centerX = width * 0.5;

      // Color scheme based on dark/light mode
      const strokeColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.035)';

      offset = (offset + 2.5) % 80;

      // Draw subtle perspective grid / road lanes
      const laneSpread = width * 0.45;

      // Left and right boundary lanes
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;

      // Subtle horizon perspective lines (no center triangle wedge)

      // Dashed lane lines
      ctx.strokeStyle = strokeColor;
      ctx.setLineDash([20, 20]);
      ctx.lineDashOffset = -offset;

      // Left lane
      ctx.beginPath();
      ctx.moveTo(centerX - 10, horizonY + 20);
      ctx.lineTo(centerX - laneSpread, height);
      ctx.stroke();

      // Right lane
      ctx.beginPath();
      ctx.moveTo(centerX + 10, horizonY + 20);
      ctx.lineTo(centerX + laneSpread, height);
      ctx.stroke();

      // Center divider
      ctx.beginPath();
      ctx.moveTo(centerX, horizonY + 20);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDark, isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-60"
    />
  );
}
