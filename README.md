# Tesla FSD (Supervised) Fleet Mileage Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-tesla--fsd--live.vercel.app-e82127?style=flat-square&logo=tesla&logoColor=white)](https://tesla-fsd-live.vercel.app/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A Tesla-styled real-time telemetry dashboard that visualizes estimated cumulative Full Self-Driving (Supervised) fleet mileage and milestone projections.

Built with **React, Vite, Tailwind CSS**, and hosted on Vercel.

---

## 🌐 Live Demo

* **Web Application**: [https://tesla-fsd-live.vercel.app/](https://tesla-fsd-live.vercel.app/)

---

## ⚡ Features

* **Real-Time Rolling Counter**: High-resolution timestamp interpolation (`performance.now()`) simulating fleet growth (~20M miles/day) with CSS tabular numerals to eliminate horizontal digit jitter.
* **Unit Switching**: Instant toggle between Miles and Kilometers with synchronized velocity and milestone adjustments.
* **Milestone Progress Tracker**: Visual progress bar tracking progression toward 15B, 20B, and long-term fleet milestones.
* **Safety Data Comparison**: Side-by-side comparison illustrating NHTSA national collision averages vs. Tesla's published FSD safety reports.
* **Tesla-Inspired UI**: Minimalist aesthetic featuring dark and light modes, responsive layouts, and clean typography.

---

## 🛠️ Tech Stack

* **Framework**: React 18, Vite
* **Styling**: Tailwind CSS
* **Deployment**: Vercel Serverless Functions

---

## 🚀 Development Setup

```bash
# Clone the repository
git clone https://github.com/athuls-engineer/tesla-fsd-tracker.git

# Navigate and install
cd tesla-fsd-tracker
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🤝 Authors & Contributors

* **Athul S** ([@athuls-engineer](https://github.com/athuls-engineer)) — Project Creator & Frontend Developer
* **Google Gemini** (AI Pair Programmer) — Co-developer assisting with telemetry interpolation logic, milestone math, and Tailwind component design.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
