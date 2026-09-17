import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Maximize2, Minimize2, ChevronDown, Menu, X } from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function Navbar({
  unit,
  onToggleUnit,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  isFullscreen,
  onToggleFullscreen,
  effectiveRate,
  onOpenCountries,
  onScrollTo
}) {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Vehicles', hasMegaMenu: true },
    { name: 'Energy', hasMegaMenu: true },
    { name: 'Charging', hasMegaMenu: true },
    { name: 'Discover', hasMegaMenu: true },
    { name: 'FSD Supervised', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Live Telemetry', action: () => onScrollTo?.('milestone') },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      setActiveMegaMenu(null);
      item.action();
    } else if (item.hasMegaMenu) {
      setActiveMegaMenu(activeMegaMenu === item.name ? null : item.name);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Tesla Logo */}
        <div className="flex items-center space-x-6">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 group"
          >
            {/* Authentic Official Tesla Vector Wordmark */}
            <svg
              className="h-3.5 sm:h-4 w-auto fill-current text-neutral-900 dark:text-white transition-colors duration-200 group-hover:text-tesla-red"
              viewBox="0 0 342 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" />
            </svg>
            <span className="hidden sm:inline-block text-[11px] font-bold tracking-widest text-tesla-red uppercase px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
              FSD TRACKER
            </span>
          </a>

          {/* Connected Telemetry Indicator */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/90 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px]">Fleet Pulse Live</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
              ~{Math.round(effectiveRate)} {unit}/s
            </span>
          </div>
        </div>

        {/* Center Nav Links (Interactive Tesla Mega-Menu) */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {navItems.map((item) => {
            const isActive = activeMegaMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => {
                  if (item.hasMegaMenu) setActiveMegaMenu(item.name);
                }}
                className={`px-3.5 py-1.5 rounded-md transition-all text-xs tracking-wide uppercase font-semibold flex items-center space-x-1 ${
                  isActive
                    ? 'bg-neutral-200/80 dark:bg-neutral-800 text-tesla-red'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                }`}
              >
                <span>{item.name}</span>
                {item.hasMegaMenu && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${isActive ? 'rotate-180 text-tesla-red' : 'text-neutral-400'}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Unit Toggle: Miles / KM */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => onToggleUnit('miles')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'miles'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              MI
            </button>
            <button
              onClick={() => onToggleUnit('km')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                unit === 'km'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              KM
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable Odometer Ticks' : 'Enable Subtle Odometer Ticks'}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-red-500/10 border-red-500/30 text-tesla-red'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Tesla Light Studio' : 'Switch to Obsidian Dark'}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Fullscreen / HUD Mode */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Presentation Mode' : 'Fullscreen / HUD Mode'}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Tesla Mega Menu Dropdown */}
      <MegaMenu
        activeTab={activeMegaMenu}
        onClose={() => setActiveMegaMenu(null)}
        onOpenCountries={onOpenCountries}
        onScrollTo={onScrollTo}
      />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl p-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavClick(item);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide uppercase text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center justify-between"
            >
              <span>{item.name}</span>
              {item.hasMegaMenu && <ChevronDown size={14} className="text-neutral-400" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
