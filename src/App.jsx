import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AmbientCanvas from './components/AmbientCanvas';
import HeroTicker from './components/HeroTicker';
import StatTrio from './components/StatTrio';
import MilestoneProgress from './components/MilestoneProgress';
import SafetyComparison from './components/SafetyComparison';
import CountriesModal from './components/CountriesModal';
import TelemetryControls from './components/TelemetryControls';
import Footnotes from './components/Footnotes';
import { useFsdCounter } from './hooks/useFsdCounter';
import { useAudioClick } from './hooks/useAudioClick';

export default function App() {
  // Start with Light Mode to match the user's uploaded screenshot, with option to toggle to dark
  const [isDark, setIsDark] = useState(false);
  const [unit, setUnit] = useState('miles');
  const [multiplier, setMultiplier] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showAmbient, setShowAmbient] = useState(false);
  const [showCountriesModal, setShowCountriesModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sound generator
  const { isEnabled: soundEnabled, toggleSound, playTick } = useAudioClick();

  // Primary telemetry hook starting at the exact number from the user's screenshot: 14,586,254,064
  const {
    miles,
    sessionMiles,
    effectiveRate,
    resetToBaseline,
    setManualMiles
  } = useFsdCounter({
    initialBase: 14586254064,
    multiplier,
    isPaused
  });

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-tesla bg-white dark:bg-[#050505] text-[#171a20] dark:text-[#eeeeee] transition-colors duration-300 relative ${isFullscreen ? 'p-0' : ''}`}>
      
      {/* Background Subtle FSD Vector Lane Perception Canvas */}
      <AmbientCanvas isDark={isDark} isEnabled={showAmbient} />

      {/* Navigation Header */}
      {!isFullscreen && (
        <Navbar
          unit={unit}
          onToggleUnit={setUnit}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          effectiveRate={effectiveRate}
          onOpenCountries={() => setShowCountriesModal(true)}
          onScrollTo={scrollToSection}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        
        {/* Dominant Hero Counter (The Main Big Thing) */}
        <HeroTicker
          miles={miles}
          unit={unit}
          effectiveRate={effectiveRate}
          sessionMiles={sessionMiles}
          playTick={playTick}
        />

        {/* 3-Column Statistics Bar from User Screenshot */}
        <StatTrio
          miles={miles}
          unit={unit}
          onOpenCountries={() => setShowCountriesModal(true)}
          onOpenSafety={() => scrollToSection('safety')}
        />

        {/* 15 Billion Mile Milestone Progress Section */}
        <MilestoneProgress
          miles={miles}
          unit={unit}
          effectiveRate={effectiveRate}
        />

        {/* Safety Comparison Section (7x Safer) */}
        <SafetyComparison unit={unit} />

      </main>

      {/* Interactive Telemetry Simulation Controls (Floating Drawer) */}
      <TelemetryControls
        isPaused={isPaused}
        onTogglePause={() => setIsPaused(!isPaused)}
        multiplier={multiplier}
        onChangeMultiplier={setMultiplier}
        onReset={resetToBaseline}
        showAmbient={showAmbient}
        onToggleAmbient={() => setShowAmbient(!showAmbient)}
        onSetManualMiles={setManualMiles}
        currentMiles={miles}
        unit={unit}
      />

      {/* Countries Showcase Modal (12 Countries) */}
      <CountriesModal
        isOpen={showCountriesModal}
        onClose={() => setShowCountriesModal(false)}
      />

      {/* Authentic Tesla Footnotes */}
      <Footnotes />

    </div>
  );
}
