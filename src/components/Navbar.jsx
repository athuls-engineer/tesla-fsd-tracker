import React, { useState } from 'react';
import { Sun, Moon, Maximize2, Minimize2, ChevronDown, Menu, X, ArrowUpRight, Milestone, Shield, Globe } from 'lucide-react';
import MegaMenu, { MENU_DATA } from './MegaMenu';

export default function Navbar({
  unit,
  onToggleUnit,
  isDark,
  onToggleTheme,
  isFullscreen,
  onToggleFullscreen,
  effectiveRate,
  onOpenCountries,
  onScrollTo
}) {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const navItems = [
    { name: 'Vehicles', hasMegaMenu: true },
    { name: 'Energy', hasMegaMenu: true },
    { name: 'Charging', hasMegaMenu: true },
    { name: 'Discover', hasMegaMenu: true },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      setActiveMegaMenu(null);
      item.action();
    } else if (item.hasMegaMenu) {
      setActiveMegaMenu(activeMegaMenu === item.name ? null : item.name);
    }
  };

  const toggleMobileCategory = (catName) => {
    setMobileExpanded(mobileExpanded === catName ? null : catName);
  };

  const handleMobileItemClick = (item) => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);

    if (item.action === 'openCountries') {
      onOpenCountries?.();
    } else if (item.url && item.url.startsWith('#')) {
      onScrollTo?.(item.url.substring(1));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Pure Authentic Tesla Wordmark Logo */}
        <div className="flex items-center shrink-0">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center py-2 pr-3 group"
            aria-label="Tesla Telemetry Home"
          >
            <svg
              className="h-3.5 sm:h-4 w-auto fill-current text-neutral-900 dark:text-white transition-colors duration-200 group-hover:text-tesla-red"
              viewBox="0 0 342 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" />
            </svg>
          </a>
        </div>

        {/* Center Nav Links (Desktop Mega-Menu) */}
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
                className={`px-3.5 py-1.5 rounded-md transition-all text-xs tracking-wider uppercase font-semibold flex items-center space-x-1 ${
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                }`}
              >
                <span>{item.name}</span>
                {item.hasMegaMenu && (
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${isActive ? 'rotate-180 text-tesla-red' : 'text-neutral-400'}`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Connected Fleet Telemetry Pulse Badge (Desktop) */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900/90 px-3 py-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px] font-semibold text-neutral-500 dark:text-neutral-400">Pulse Live</span>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <span className="font-semibold tabular-nums text-xs text-neutral-800 dark:text-neutral-200">
              ~{Math.round(effectiveRate)} {unit}/s
            </span>
          </div>
          
          {/* Unit Toggle: Miles / KM */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => onToggleUnit('miles')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md transition-all text-[11px] sm:text-xs ${
                unit === 'miles'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              MI
            </button>
            <button
              onClick={() => onToggleUnit('km')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md transition-all text-[11px] sm:text-xs ${
                unit === 'km'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              KM
            </button>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Tesla Light Studio' : 'Switch to Obsidian Dark'}
            className="p-1.5 sm:p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Fullscreen / HUD Mode (Hidden on small mobile) */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Presentation Mode' : 'Fullscreen / HUD Mode'}
            className="hidden sm:inline-flex p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Tesla Mega Menu Dropdown (Desktop Only) */}
      <div className="hidden lg:block">
        <MegaMenu
          activeTab={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
          onOpenCountries={onOpenCountries}
          onScrollTo={onScrollTo}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl p-4 space-y-3 animate-fadeIn max-h-[82vh] overflow-y-auto">
          
          {/* Mobile Quick Action Chips */}
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollTo?.('milestone');
              }}
              className="px-2 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center justify-center space-y-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <Milestone size={14} className="text-tesla-red" />
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollTo?.('safety');
              }}
              className="px-2 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center justify-center space-y-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <Shield size={14} className="text-emerald-500" />
              <span>7x Safety</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCountries?.();
              }}
              className="px-2 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center justify-center space-y-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <Globe size={14} className="text-blue-500" />
              <span>12 Nations</span>
            </button>
          </div>

          {/* Accordion List for Products */}
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const isExpanded = mobileExpanded === item.name;
              const menuData = MENU_DATA[item.name];

              return (
                <div key={item.name} className="border border-neutral-200/60 dark:border-neutral-800/80 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleMobileCategory(item.name)}
                    className="w-full text-left px-4 py-2.5 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs sm:text-sm font-semibold tracking-wide uppercase text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={14}
                      className={`text-neutral-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-tesla-red' : ''}`}
                    />
                  </button>

                  {isExpanded && menuData && (
                    <div className="p-2 space-y-1 bg-white dark:bg-black/40 border-t border-neutral-100 dark:border-neutral-800 animate-fadeIn">
                      {menuData.items.map((subItem) => {
                        const isInternal = subItem.url && subItem.url.startsWith('#');
                        const isAction = Boolean(subItem.action);

                        return (
                          <a
                            key={subItem.name}
                            href={subItem.url || '#'}
                            target={!isInternal && !isAction ? '_blank' : undefined}
                            rel="noreferrer"
                            onClick={(e) => {
                              if (isInternal || isAction) {
                                e.preventDefault();
                                handleMobileItemClick(subItem);
                              } else {
                                setIsMobileMenuOpen(false);
                              }
                            }}
                            className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                          >
                            <div>
                              <div className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-tesla-red transition-colors">
                                {subItem.name}
                              </div>
                              <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                                {subItem.tagline}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0 ml-2">
                              <span className="text-[10px] font-mono text-tesla-red">
                                {subItem.stat}
                              </span>
                              <ArrowUpRight size={12} className="text-neutral-400 group-hover:text-tesla-red" />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
}
