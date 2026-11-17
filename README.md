# ✨ FeelGood Productivity

> A minimal, playful, pastel-themed productivity companion inspired by **Ali Abdaal's** bestselling book *Feel-Good Productivity* and top videos.

Designed with light pastel aesthetics, smooth rounded corners, delightful sound effects, and an interactive flow system to make work energizing and fun.

---

## 🌟 Key Features

### 1. 💡 Daily Ali Abdaal Productivity Tips (30+ Authentic Principles)
- **Daily Wisdom Rotation**: Shows a brand-new Ali Abdaal productivity principle every day based on the calendar date.
- **Categorized by the 3 Energizers & Blockers**:
  - *Energize* (Play, Power, People, Temptation Bundling)
  - *Unblock* (5-Minute Rule, Friction Removal, Confidence-Competence Loop)
  - *Sustain* (Guilt-Free Rest, Energy Audit, Compass Questions)
  - *Focus* (Parkinson's Law, Active Recall, Timeboxing)
  - *Mindset* (Reframing "I Have To" → "I Get To", 10/10/10 Rule)
- **Interactive Actions**:
  - 🎲 **Roll Surprise Tip**: Spin to explore another principle with sound & animations.
  - ✨ **Apply Tip Today (+25 XP)**: Log application of the tip to boost your Feel-Good Energy Battery with pastel confetti!
  - 📚 **Searchable Catalog**: Full vault of 30+ principles with category filtering and favorites.

### 2. 💧 Interactive Hydration Reminder & Wave Tracker
- **Playful Water Tumbler**: Visual animated pastel liquid wave fill that rises from 0% to 100%+ as you log drinks.
- **Quick Logging**: `+250ml (Cup)`, `+500ml (Bottle)`, `+100ml (Sip)`, and undo.
- **Smart Hydration Reminders**: Configurable timer intervals (30m, 45m, 60m, 90m) with desktop browser notifications and pleasant audio chimes.
- **Celebration Confetti**: Hitting your daily water goal triggers a confetti blast and audio fanfare.
- Grounded in Ali's medical advice: *Even 1–2% dehydration drops working cognitive speed by 14%*.

### 3. 📅 Unique Calendar (24h Horizon & Energy Matrix)
- **Circadian Energy Matching**: Schedules tasks according to natural mental energy:
  - 🌅 *Morning (08:00–12:00)*: Peak Creative (Daily Highlight)
  - ☀️ *Midday (12:00–14:00)*: Social & Collaborative Flow
  - ☕ *Afternoon (14:00–17:00)*: Batched Admin & Quick Wins
  - 🌙 *Evening (17:00–22:00)*: Guilt-Free Recharge
- **Ali's "Ideal Week" vs "Actual Week" Toggle**: Compare your aspirational weekly blueprint against real day execution.
- **One-Click Timebox Presets**:
  - `🎯 Daily Highlight (90m)`
  - `⚡ Creative Sprint (45m)`
  - `💌 Admin Batching (45m)`
  - `🌿 Guilt-Free Walk (45m)`

### 4. ⏰ Reminders & Daily Highlight Spotlight
- **The #1 Daily Highlight**: Prominent spotlight on the single outcome that makes today a win (+50 XP).
- **Time-based Reminders**: Automatic notifications and sound alerts when scheduled task times arrive.
- **Filter Tabs**: Reminders, Deep Work, Admin, and Completed.

### 5. 🎮 Playful Focus Timer & Ambient Audio Generator
- **Focus Sprint Modes**:
  - `⚡ 5-Minute Inertia Buster`: Overcome starting resistance.
  - `🎯 25m Sprint`: Focused pomodoro.
  - `✨ 45m Deep Flow`: Ali's sweet spot.
  - `🌿 5m Mindful Break`: Recharge interval.
- **Offline Web Audio Synthesizer**:
  - 🧠 40Hz Gamma Focus Binaural Beats (pure offline sine synthesis)
  - 🌊 Soothing Ocean Waves (filtered noise modulation)
  - 🌧️ Cozy Soft Rain
- **Playful Micro-Prompts**: *"What would this look like if it were fun?"*

### 6. 🔋 Feel-Good Energy Battery (XP & Leveling)
- Earn XP by completing tasks, drinking water, timeboxing, and applying daily tips.
- Level progression (Mindful Beginner → Joyful Starter → Focus Alchemist → Energy Master → Feel-Good Sage).

---

## 🎨 Design Philosophy
- **Light Theme Only**: Crisp, calm, bright daylight aesthetic with soft cream (`#FAF8F5`) backgrounds.
- **Pastel Palette**: Mint sage, soft lilac, warm peach, honey butter, sky blue, and gentle rose.
- **Smooth Elements**: Rounded corners (`rounded-2xl`, `rounded-3xl`), pill toggles, and soft colored shadows.

---

## 🚀 Tech Stack
- **Framework**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS + Custom Pastel Color Tokens
- **Icons**: Lucide React
- **Audio**: Web Audio API (100% native synthesizer, no external asset dependencies)
- **Effects**: Canvas-Confetti
- **Notifications**: Web Notifications API

---

## 🛠️ Getting Started

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
