# Toki

A minimal, native desktop time tracker built with Tauri.

![Tauri](https://img.shields.io/badge/Tauri-24C8DB?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## About the Project

Toki is a lightweight, distraction-free time tracker for the desktop. Start a timer, assign it to a project, add a short summary, and save it. Every tracking is stored locally in a SQLite database, so there's no account, no sync, and no cloud dependency.

**Core features:**
- Start / stop a single active timer with duration, project, and summary
- Add, rename, delete projects
- Browse, search, and filter past trackings by project, date, or time range, or by text in a dedicated window
- Fully local, all data lives in a SQLite database on your machine

Built as a Tauri app, so it ships as a small native binary rather than an Electron-style bundled browser.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Rust](https://www.rust-lang.org/tools/install) and the Tauri CLI prerequisites for your OS - see the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/DominikDragon/time-tracker.git
   cd time-tracker
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run in development mode
   ```bash
   npm run tauri dev
   ```
4. Build a release binary
   ```bash
   npm run tauri build
   ```
   The packaged app will be in `src-tauri/target/release/bundle/`.