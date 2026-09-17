# Tesla FSD (Supervised) Real-Time Fleet Tracker

<div align="center">

```
 _____ _____ ____  _        _    
|_   _| ____/ ___|| |      / \   
  | | |  _| \___ \| |     / _ \  
  | | | |___ ___) | |___ / ___ \ 
  |_| |_____|____/|_____/_/   \_\
```

### Cumulative Full Self-Driving (Supervised) Fleet Telemetry Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Telemetry%20Tracker-athuls--engineer.github.io%2Ffsd-e82127?style=for-the-badge&logo=tesla&logoColor=white)](https://athuls-engineer.github.io/fsd/)

<br />

[![CI Build Verification](https://github.com/athuls-engineer/tesla-fsd-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/athuls-engineer/tesla-fsd-tracker/actions)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-black?style=flat-square)](LICENSE)

*An authentic, ultra-sleek Tesla-styled real-time telemetry dashboard showcasing cumulative Full Self-Driving (Supervised) miles driven across the global fleet as the dominating centerpiece.*

</div>

---

## 🌐 Live Application

* **Public Web Link**: **[https://athuls-engineer.github.io/fsd/](https://athuls-engineer.github.io/fsd/)**
* **Local Development**: `http://localhost:5183/`

---

## Overview

The **Tesla FSD Tracker** continuously calculates and monitors global cumulative Full Self-Driving (Supervised) fleet mileage starting from **14,586,254,064 miles** (calibrated directly to official Tesla telematics disclosures). It updates organically in real time at an estimated fleet velocity of **~231.5 miles/sec** (~20 million miles/day across 2M+ active vehicles) with sub-second micro-increments and tabular numerals (`tnum`) to eliminate horizontal layout jitter.

Designed strictly around Tesla's minimalist design system, the interface includes dual presentation modes (**Tesla Studio Light** and **Tesla Obsidian Dark**), authentic typography, interactive mega-menus, safety benchmarks, and a multi-tier milestone progression engine.

---

## Key Features

### 1. Dominating Real-Time Centerpiece Counter
* **Sub-Second Telemetry Interpolation**: Calculates live distance increments using high-resolution timestamps (`performance.now()`) with organic fleet velocity micro-jitter.
* **Jitter-Free Tabular Numerals**: Employs CSS `font-variant-numeric: tabular-nums` and `font-feature-settings: 'tnum'` so individual digits roll without jittering adjacent numbers.
* **Real-time Velocity & Throughput**: Live telemetry indicators showing distance accumulated per second (`+231.5 mi/s`), per minute (`~13,890 mi/m`), and session distance.
* **Instant Unit Conversion**: Site-wide conversion between **Miles** and **Kilometers** (`14.58B mi` $\longleftrightarrow$ `23.47B km`) with real-time recalculation of velocity, milestones, and safety distances.

### 2. Multi-Tier Milestone Progression Engine
* Dynamic roadmap tracking from **1 Billion** to **100 Billion Miles**:
  * **1B Miles** — *Achieved (Q1 2024)* — Initial FSD Beta Milestone
  * **5B Miles** — *Achieved (Q4 2024)* — V12 End-to-End Neural Net Launch
  * **10B Miles** — *Achieved (Mid 2025)* — Global Fleet Expansion Scale
  * **15B Miles** — *Active Target* — Supervised Fleet Maturity Benchmark (~161 AU)
  * **20B Miles** — *Upcoming* — Unsupervised Robotaxi Validation Scale
  * **25B Miles** — *Upcoming* — Cybercab Commercial Production Scale
  * **50B Miles** — *Upcoming* — Planetary Autonomous Transport Network
  * **100B Miles** — *Long-term* — Universal Autonomous Transportation
* **Automatic Roll-over & Celebration**: Crossing any milestone automatically fires a celebratory confetti cannon and advances the active progress bar to the next target tier with live countdown and projected arrival date.

### 3. Verified Safety Telemetry Benchmark (7x Safer)
* **Comparative Visualizer**: Contrasts Tesla FSD (Supervised) collision intervals (**1 crash per ~4.96M miles**) against the US National Average from NHTSA/FHWA data (**1 crash per ~670,000 miles**).
* **The 5-Second Disengagement Rule**: Factually documents Tesla's reporting methodology where any collision occurring within 5 seconds of FSD disengagement is recorded as an FSD-engaged event.
* **SAE Level 2 Supervision Notice**: Clear regulatory compliance disclosure emphasizing driver responsibility.

### 4. Global Rollout & Regulatory Pipeline (12 Countries)
* Interactive modal detailing the 12 official deployment countries/territories:
  * 🇺🇸 United States | 🇨🇦 Canada | 🇲🇽 Mexico | 🇵🇷 Puerto Rico
  * 🇦🇺 Australia | 🇳🇿 New Zealand | 🇰🇷 South Korea | 🇳🇱 Netherlands
  * 🇩🇰 Denmark | 🇧🇪 Belgium | 🇱🇹 Lithuania | 🇪🇪 Estonia
* **Regulatory Pipeline Tracker**: Documents pending approvals in China (MIIT compliance), Germany (UNECE DCAS), and the United Kingdom (Automated Vehicles Act).

### 5. Interactive Tesla Mega-Menu & HUD Mode
* Full-width dropdowns for **Vehicles** (Model S, 3, X, Y, Cybertruck, Cybercab), **Energy** (Solar Roof, Powerwall 3, Megapack), **Charging** (Supercharging, Wall Connector), and **Discover**.
* **HUD / Fullscreen Mode**: Distraction-free full-screen display designed for monitoring displays, wall dashboards, and the Tesla in-car browser.
* **Telemetry Simulation Drawer**: Floating controls to pause/resume the counter, apply simulation multipliers (1x, 5x, 20x, 100x), reset to baseline, or set custom starting mileage.

---

## Fact-Check & Data Integrity

| Metric | Official Source / Methodology | Verification Status |
| :--- | :--- | :--- |
| **`14,586,254,064` Miles** | Official `tesla.com/fsd` telematics snapshot | **Verified Official Snapshot** |
| **7x Safer Benchmark** | Tesla Vehicle Safety Report vs NHTSA/FHWA crash datasets (4.96M mi vs 670k mi) | **Verified with 5s rule disclosure** |
| **12 Countries** | Official international availability and supervised validation fleet distribution | **Verified 12 Jurisdictions** |
| **Vehicle Specs** | Official Tesla design studio acceleration and range figures | **100% Accurate** |

---

## Regulatory & Supervision Disclaimer

> **SAE Level 2 Notice**: Full Self-Driving (Supervised) is an SAE Level 2 advanced driver assistance feature requiring active driver supervision at all times. It does not make the vehicle autonomous. The driver must remain attentive, keep their hands on the steering wheel, and be prepared to take immediate control.

---

## Tech Stack

* **Frontend**: React 18.3, Vite 5.4
* **Styling**: Tailwind CSS 3.4, Lucide React Icons
* **Effects**: Canvas Confetti, HTML5 Canvas
* **Audio**: Web Audio API (subtle tactile odometer click synthesizer)

---

## Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/athuls-engineer/tesla-fsd-tracker.git

# Navigate into project directory
cd tesla-fsd-tracker

# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## License

MIT License © 2026 Athul S. Inspired by Tesla's design language. All product names, logos, and trademarks are property of their respective owners.
