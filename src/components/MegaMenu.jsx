import React from 'react';
import { ArrowUpRight, Zap, Shield, Car, BatteryCharging, Sun, Compass } from 'lucide-react';

export const MENU_DATA = {
  Vehicles: {
    title: 'Vehicles',
    items: [
      {
        name: 'Model S',
        tagline: 'Dual & Tri-Motor AWD',
        stat: '1.99s 0-60 mph',
        range: '402 mi range',
        url: 'https://www.tesla.com/models'
      },
      {
        name: 'Model 3',
        tagline: 'Upgraded Aerodynamics',
        stat: '2.9s 0-60 mph',
        range: '363 mi range',
        url: 'https://www.tesla.com/model3'
      },
      {
        name: 'Model X',
        tagline: 'Falcon Wing Doors',
        stat: '2.5s 0-60 mph',
        range: '335 mi range',
        url: 'https://www.tesla.com/modelx'
      },
      {
        name: 'Model Y',
        tagline: 'Best-Selling Car in the World',
        stat: '3.5s 0-60 mph',
        range: '320 mi range',
        url: 'https://www.tesla.com/modely'
      },
      {
        name: 'Cybertruck',
        tagline: 'Ultra-Hard Stainless Steel',
        stat: '2.6s 0-60 mph',
        range: '340 mi range',
        url: 'https://www.tesla.com/cybertruck'
      },
      {
        name: 'Cybercab',
        tagline: 'Fully Autonomous Robotaxi',
        stat: 'Vision-Only AI',
        range: 'Inductive Charging',
        url: 'https://www.tesla.com/we-robot'
      }
    ]
  },
  Energy: {
    title: 'Energy',
    items: [
      {
        name: 'Solar Roof',
        tagline: 'Seamlessly Integrated Solar Shingles',
        stat: '25-Year Warranty',
        url: 'https://www.tesla.com/solarroof'
      },
      {
        name: 'Solar Panels',
        tagline: 'Lowest Cost Solar in America',
        stat: 'Clean Self-Generation',
        url: 'https://www.tesla.com/solarpanels'
      },
      {
        name: 'Powerwall 3',
        tagline: 'Whole-Home Energy Storage',
        stat: '13.5 kWh Capacity',
        url: 'https://www.tesla.com/powerwall'
      },
      {
        name: 'Megapack',
        tagline: 'Utility-Scale Energy Storage',
        stat: '3.9 MWh per Unit',
        url: 'https://www.tesla.com/megapack'
      }
    ]
  },
  Charging: {
    title: 'Charging',
    items: [
      {
        name: 'Supercharging Network',
        tagline: '50,000+ Fast Chargers Worldwide',
        stat: 'Up to 200 mi in 15 min',
        url: 'https://www.tesla.com/supercharger'
      },
      {
        name: 'Wall Connector',
        tagline: 'Fastest Home Charging Solution',
        stat: 'Up to 44 mi/hour added',
        url: 'https://www.tesla.com/home-charging'
      },
      {
        name: 'Destination Charging',
        tagline: 'Overnight Charging at Hotels & Resorts',
        stat: '40,000+ Global Locations',
        url: 'https://www.tesla.com/destination-charging'
      },
      {
        name: 'Fleet Charging',
        tagline: 'Turnkey Commercial Depot Solutions',
        stat: 'Scalable Megawatt Power',
        url: 'https://www.tesla.com/commercial'
      }
    ]
  },
  Discover: {
    title: 'Discover',
    items: [
      {
        name: 'Demo Drive FSD',
        tagline: 'Experience Full Self-Driving (Supervised) Firsthand',
        stat: 'Schedule at Local Showroom',
        url: 'https://www.tesla.com/drive'
      },
      {
        name: 'Vehicle Safety Report',
        tagline: 'Verified Real-World Fleet Accident Telemetry',
        stat: '7x Safer Than US Average',
        url: '#safety'
      },
      {
        name: 'Milestone Roadmap',
        tagline: 'Track Global Fleet Progress in Real Time',
        stat: '15B+ Telemetry Counter',
        url: '#milestone'
      },
      {
        name: 'FSD Global Rollout',
        tagline: '12 Countries and Regulatory Approvals',
        stat: 'North America, Europe, Asia',
        action: 'openCountries'
      }
    ]
  }
};

export default function MegaMenu({ activeTab, onClose, onOpenCountries, onScrollTo }) {
  if (!activeTab || !MENU_DATA[activeTab]) return null;

  const data = MENU_DATA[activeTab];

  return (
    <div 
      className="absolute top-16 left-0 w-full bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 shadow-2xl z-40 animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-tesla-red">
              Tesla {data.title}
            </span>
            <span className="text-neutral-400">•</span>
            <span className="text-xs text-neutral-500">Official Lineup &amp; Architecture</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            Close ✕
          </button>
        </div>

        {/* Grid of Items */}
        <div className={`grid gap-4 ${
          data.items.length > 4 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {data.items.map((item) => {
            const isInternal = item.url && item.url.startsWith('#');
            const isAction = Boolean(item.action);

            const handleClick = (e) => {
              if (isAction && item.action === 'openCountries') {
                e.preventDefault();
                onOpenCountries?.();
                onClose();
              } else if (isInternal) {
                e.preventDefault();
                onScrollTo?.(item.url.substring(1));
                onClose();
              }
            };

            return (
              <a
                key={item.name}
                href={item.url || '#'}
                target={!isInternal && !isAction ? '_blank' : undefined}
                rel="noreferrer"
                onClick={handleClick}
                className="group p-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-tesla-red transition-colors">
                      {item.name}
                    </h4>
                    <ArrowUpRight size={14} className="text-neutral-400 group-hover:text-tesla-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {item.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                  <span className="font-mono text-tesla-red">{item.stat}</span>
                  {item.range && <span className="text-neutral-400">{item.range}</span>}
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </div>
  );
}
