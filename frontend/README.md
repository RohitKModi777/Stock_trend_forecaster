# StockTrend AI - Frontend

High-fidelity financial intelligence and algorithmic stock trend forecasting terminal built with React, Vite, and Tailwind CSS.

## Tech Stack

- **Runtime & Bundler:** Vite
- **UI Framework:** React 19
- **Routing:** React Router v7
- **Styling:** Tailwind CSS (Custom institutional dark theme tokens)
- **Authentication & Backend:** Supabase Client (`@supabase/supabase-js`)
- **Iconography:** Material Symbols Outlined & Google Fonts (`Inter`, `JetBrains Mono`)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create or verify `.env` in this directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
Build output will be generated in `/dist`.

### 5. Preview Production Build
```bash
npm run preview
```
