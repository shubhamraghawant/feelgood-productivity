# ✦ Aura — Mindful Daily Rhythm & Productivity

> A minimal, aesthetic, pastel-themed productivity companion built on evidence-based feel-good productivity principles and intentional daily flow.

🌐 **Live Online Application**: [https://shubhamraghawant.github.io/feelgood-productivity/](https://shubhamraghawant.github.io/feelgood-productivity/)

---

## 🌿 Organized & Categorized Architecture

Designed with light pastel aesthetics, smooth rounded corners, delicate soundscapes, and an uncluttered tabbed workspace that prevents cognitive overload:

### 1. ✦ Today (Daily Sanctuary)
- **Mindful Greeting & Status Strip**: Warm time-of-day greeting with instant visibility into water goal %, calendar blocks, and focus sprint status.
- **#1 Daily Highlight**: Prominent spotlight on the single most important outcome that makes today satisfying (+50 XP).
- **Tasks & Reminders**: Clean, prioritized to-do list with time alarms, category filtering, and one-click "Clear Completed".
- **Daily Golden Principle**: Today's curated productivity wisdom with actionable guidance and practical experiments.

### 2. 📅 Rhythm (Circadian Calendar)
- **24-Hour Horizon Bar & Arc**: Visual timeline matching tasks to circadian energy (Morning Creative Peak, Midday Social, Afternoon Admin, Evening Recharge).
- **"Ideal Week" vs "Actual Week" Blueprint**: Contrast your aspirational week against real execution.
- **One-Click Timebox Presets**: Drop ready-made 90m highlights, 45m sprints, or 45m walks with a single click.

### 3. 💧 Hydrate (Wellness Sanctuary)
- **Interactive Water Tumbler**: Animated liquid wave fill that rises from 0% to 100%+ as you log drinks.
- **Customizable Daily Target**: Easily switch targets (1500ml, 2000ml, 2500ml, 3000ml).
- **Quick Logging**: `+250ml (Cup)`, `+500ml (Bottle)`, `+100ml (Sip)`, and undo.
- **Interval Reminders**: Gentle notification timers (30m, 45m, 60m, 90m) with soft sound chimes and celebration confetti on reaching the daily goal.

### 4. ⏱️ Sprint (Playful Focus Timer)
- **Flow Modes**: `5m Inertia Buster` (to conquer procrastination), `25m Sprint`, `45m Deep Flow`, and `5m Mindful Break`.
- **Fine-Tuning Controls**: Quick `+5m` and `-5m` adjustment buttons.
- **Circular SVG Progress Ring**: Pastel animated timer with smooth transitions.
- **Offline Synthesized Audio**: Built natively with the Web Audio API (40Hz Gamma Focus Beats, Ocean Waves, Soft Rain).

### 5. 📚 Wisdom (The Productivity Vault)
- **Full Library**: 30+ core principles categorized into *Energize*, *Unblock*, *Sustain*, *Focus*, and *Mindset*.
- **Search & Filter**: Search by keyword or tag, bookmark favorites, and set any principle as today's active focus.

### 6. 🔒 Privacy & Local-First Freedom
- **100% Client-Side**: All data stays private in your browser's local storage.
- **One-Click Export**: Download a timestamped JSON backup anytime from the footer.
- **Full Reset**: Easily clear or restore fresh defaults.

---

## 🎨 Design Philosophy
- **Light Theme Only**: Crisp daylight aesthetic with soothing cream (`#FAF8F5`) backgrounds and glassmorphism.
- **Soft Pastel Tones**: Mint sage, soft lilac, warm peach, honey butter, sky water blue, and blush rose.
- **Smooth & Tactile**: High border radius (`rounded-2xl`, `rounded-3xl`), pill toggles, and gentle sound synthesis.

---

## 🚀 Online Deployment Ready

Aura is configured with relative base paths (`./`) and includes turnkey configurations for all major hosting platforms:

### 1. GitHub Pages (Active)
Live at: **[https://shubhamraghawant.github.io/feelgood-productivity/](https://shubhamraghawant/feelgood-productivity/)**
```bash
# To redeploy updates anytime:
npm run deploy
```

### 2. Vercel
Includes `vercel.json` for instant single-page routing:
- Connect the GitHub repository `shubhamraghawant/feelgood-productivity` on [Vercel](https://vercel.com)
- Set Branch to `develop`
- Framework Preset: `Vite` (automatic)

### 3. Netlify
Includes `netlify.toml` with redirect rules:
- Connect repo on [Netlify](https://netlify.com)
- Build command: `npm run build`
- Publish directory: `dist`

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/shubhamraghawant/feelgood-productivity.git
cd feelgood-productivity

# Ensure develop branch is checked out
git checkout develop

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.
