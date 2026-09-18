import React, { useEffect, useRef } from 'react';

/**
 * AmbientCanvas: Authentic Tesla Vision Perception UI visualizer.
 * Renders dynamically curving lane boundaries, optical depth cones, and 
 * 3D vehicle detection bounding boxes responding organically to mouse/touch coordinates.
 */
export default function AmbientCanvas({ isDark = false, isEnabled = true }) {
  const canvasRef = useRef(null);
  const mouseXRef = useRef(typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500);

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

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouseXRef.current = e.touches[0].clientX;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let offset = 0;
    let currentSteer = 0;

    // Simulated detected vehicles in adjacent lanes with depth z (0 = near, 1 = horizon)
    const detectedVehicles = [
      { lane: 0, z: 0.35, speed: 0.0018, width: 38, height: 26, depth: 55 }, // Center lead vehicle
      { lane: -1, z: 0.55, speed: 0.0012, width: 36, height: 25, depth: 52 }, // Left lane
      { lane: 1, z: 0.22, speed: 0.0022, width: 40, height: 28, depth: 58 },  // Right lane overtaker
      { lane: 0, z: 0.78, speed: 0.0009, width: 34, height: 24, depth: 50 },  // Distant lead vehicle
    ];

    const draw3DBox = (x, y, scale, isLead = false) => {
      const boxW = 34 * scale;
      const boxH = 22 * scale;
      const boxD = 40 * scale;

      const baseStroke = isDark
        ? isLead ? 'rgba(52, 199, 89, 0.45)' : 'rgba(255, 255, 255, 0.18)'
        : isLead ? 'rgba(52, 199, 89, 0.55)' : 'rgba(0, 0, 0, 0.14)';
      
      const fillTop = isDark
        ? isLead ? 'rgba(52, 199, 89, 0.08)' : 'rgba(255, 255, 255, 0.04)'
        : isLead ? 'rgba(52, 199, 89, 0.08)' : 'rgba(0, 0, 0, 0.03)';

      ctx.save();
      ctx.strokeStyle = baseStroke;
      ctx.fillStyle = fillTop;
      ctx.lineWidth = Math.max(1 * scale, 0.8);

      const halfW = boxW / 2;
      const rearBottomY = y;
      const rearTopY = y - boxH;
      const frontBottomY = y + boxD * 0.3;
      const frontTopY = rearTopY + boxD * 0.3;

      // Top face
      ctx.beginPath();
      ctx.moveTo(x - halfW, rearTopY);
      ctx.lineTo(x + halfW, rearTopY);
      ctx.lineTo(x + halfW * 1.1, frontTopY);
      ctx.lineTo(x - halfW * 1.1, frontTopY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rear face (closest to camera)
      ctx.beginPath();
      ctx.strokeRect(x - halfW * 1.1, frontTopY, boxW * 1.1, boxH);

      // Connecting edges
      ctx.beginPath();
      ctx.moveTo(x - halfW, rearBottomY);
      ctx.lineTo(x - halfW * 1.1, frontBottomY);
      ctx.moveTo(x + halfW, rearBottomY);
      ctx.lineTo(x + halfW * 1.1, frontBottomY);
      ctx.stroke();

      // Subtle brake/taillight perception markers
      if (isLead && scale > 0.5) {
        ctx.fillStyle = isDark ? 'rgba(232, 33, 39, 0.7)' : 'rgba(232, 33, 39, 0.8)';
        ctx.fillRect(x - halfW * 1.05, frontTopY + boxH * 0.25, 4 * scale, 2.5 * scale);
        ctx.fillRect(x + halfW * 1.05 - 4 * scale, frontTopY + boxH * 0.25, 4 * scale, 2.5 * scale);
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.42;
      const centerX = width * 0.5;

      // Target steering based on cursor X relative to center
      const targetSteer = ((mouseXRef.current - centerX) / (width * 0.5)) * 90;
      currentSteer += (targetSteer - currentSteer) * 0.04;

      // Color scheme based on dark/light mode
      const strokeColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)';
      const activeLaneColor = isDark ? 'rgba(52, 199, 89, 0.15)' : 'rgba(52, 199, 89, 0.12)';
      const trajectoryGlow = isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.05)';

      offset = (offset + 2.8) % 80;

      const laneSpread = width * 0.46;
      const steerCurveX = centerX + currentSteer * 0.6;

      // Draw subtle vehicle trajectory perception cone ahead
      ctx.save();
      const coneGradient = ctx.createLinearGradient(centerX, height, centerX, horizonY);
      coneGradient.addColorStop(0, trajectoryGlow);
      coneGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coneGradient;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, height);
      ctx.quadraticCurveTo(steerCurveX, (height + horizonY) / 2, centerX + currentSteer * 0.25, horizonY + 20);
      ctx.lineTo(centerX + currentSteer * 0.25 + 4, horizonY + 20);
      ctx.quadraticCurveTo(steerCurveX + 40, (height + horizonY) / 2, centerX + 40, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Outer Boundary Lanes (Left & Right)
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;

      // Left boundary
      ctx.moveTo(centerX - 16 + currentSteer * 0.2, horizonY + 15);
      ctx.quadraticCurveTo(centerX - laneSpread * 0.5 + currentSteer * 0.5, (height + horizonY) / 2, centerX - laneSpread, height);
      ctx.stroke();

      // Right boundary
      ctx.beginPath();
      ctx.moveTo(centerX + 16 + currentSteer * 0.2, horizonY + 15);
      ctx.quadraticCurveTo(centerX + laneSpread * 0.5 + currentSteer * 0.5, (height + horizonY) / 2, centerX + laneSpread, height);
      ctx.stroke();

      // Dashed lane divider lines
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.06)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([22, 22]);
      ctx.lineDashOffset = -offset;

      // Center-left divider
      ctx.beginPath();
      ctx.moveTo(centerX - 6 + currentSteer * 0.2, horizonY + 15);
      ctx.quadraticCurveTo(centerX - laneSpread * 0.25 + currentSteer * 0.45, (height + horizonY) / 2, centerX - laneSpread * 0.4, height);
      ctx.stroke();

      // Center-right divider
      ctx.beginPath();
      ctx.moveTo(centerX + 6 + currentSteer * 0.2, horizonY + 15);
      ctx.quadraticCurveTo(centerX + laneSpread * 0.25 + currentSteer * 0.45, (height + horizonY) / 2, centerX + laneSpread * 0.4, height);
      ctx.stroke();

      ctx.restore();

      // Render Detected 3D Vehicles
      detectedVehicles.forEach((veh) => {
        // Animate vehicle forward relative to ego vehicle
        veh.z = (veh.z + veh.speed) % 1.0;

        const depth = 1 - veh.z; // 0 = horizon, 1 = close
        const perspectiveY = horizonY + (height - horizonY) * (depth * depth);
        
        // Lane X calculation with dynamic steering curve
        const laneOffsetRatio = veh.lane * 0.38;
        const currentLaneSpread = (laneSpread * (depth * depth)) * laneOffsetRatio;
        const vehX = centerX + currentLaneSpread + (currentSteer * (depth * 0.5));
        const scale = Math.max(0.3 + depth * 0.7, 0.25);

        // Only draw if within bounds
        if (perspectiveY > horizonY + 15 && perspectiveY < height - 20) {
          draw3DBox(vehX, perspectiveY, scale, veh.lane === 0 && veh.z < 0.5);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDark, isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 opacity-65"
    />
  );
}
