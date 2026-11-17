import { DailyTip } from '../types';

export const PRODUCTIVITY_TIPS: DailyTip[] = [
  {
    id: 'tip-1',
    title: 'The Daily Highlight',
    quote: 'The secret to feeling productive isn’t getting 50 things done; it’s getting the ONE thing that truly matters done.',
    takeaway: 'Pick one activity each day to prioritize, protect, and celebrate. If you accomplish only this, the day is an absolute win.',
    actionableStep: 'Choose your #1 highlight right now. Block 60–90 distraction-free minutes for it before afternoon.',
    category: 'Energize',
    source: 'Daily Planning & Priority Architecture',
    chapter: 'Play & Focus',
    tags: ['focus', 'priority', 'daily-highlight']
  },
  {
    id: 'tip-2',
    title: 'The 5-Minute Rule (Overcoming Inertia)',
    quote: 'The hardest part is almost always starting. Lower the barrier until resistance vanishes.',
    takeaway: 'Promise yourself you will only work on the dreaded task for exactly 5 minutes. If you want to stop after 5 minutes, you are free to do so.',
    actionableStep: 'Pick that intimidating task and start a 5-minute timer. Just open the document or write one sentence.',
    category: 'Unblock',
    source: 'Overcoming Inertia & Resistance',
    chapter: 'The Friction Formula',
    tags: ['procrastination', 'inertia', 'quick-start']
  },
  {
    id: 'tip-3',
    title: 'Temptation Bundling',
    quote: 'Pair an activity you need to do with an indulgence you love doing.',
    takeaway: 'Associate mundane tasks with sensory pleasures: listen to your favorite podcast only while washing dishes, or do spreadsheet work at your favorite cozy cafe with a matcha latte.',
    actionableStep: 'Pair today’s most boring chore with an enjoyable drink, playlist, or pleasant environment.',
    category: 'Energize',
    source: 'The Science of Joyful Productivity',
    chapter: 'Power & Pleasure',
    tags: ['dopamine', 'habit-stacking', 'fun']
  },
  {
    id: 'tip-4',
    title: 'The 2-Minute Rule',
    quote: 'If a task takes less than two minutes, do it right now instead of filing or stressing over it.',
    takeaway: 'Storing tiny items in your brain or task list costs more cognitive energy than just doing them on the spot.',
    actionableStep: 'Scan your inbox or desk. Reply to that quick email or file that receipt immediately.',
    category: 'Unblock',
    source: 'Getting Things Done Method',
    chapter: 'Streamlining Friction',
    tags: ['gtd', 'quick-wins', 'speed']
  },
  {
    id: 'tip-5',
    title: 'Parkinson’s Law: Shrink the Container',
    quote: 'Work expands to fill the time available for its completion.',
    takeaway: 'If you give yourself all day to finish a slide deck, it takes all day. Give yourself 45 minutes, and your brain naturally filters out trivial perfectionism.',
    actionableStep: 'Halve the time you planned for your next task and set a countdown clock.',
    category: 'Focus',
    source: 'Essential Laws of Productivity',
    chapter: 'The Efficiency Illusion',
    tags: ['deadlines', 'efficiency', 'focus']
  },
  {
    id: 'tip-6',
    title: 'The 10/10/10 Rule for Stress & Perspective',
    quote: 'Most things we stress over will not matter tomorrow, let alone in a year.',
    takeaway: 'Ask yourself: Will this issue matter in 10 minutes? In 10 months? In 10 years? 95% of everyday worries dissolve at the 10-month mark.',
    actionableStep: 'Whenever you feel anxiety rising about a mistake or delay, run the 10/10/10 perspective filter.',
    category: 'Mindset',
    source: 'Emotional Resilience & Clarity',
    chapter: 'Emotional Grounding',
    tags: ['mindset', 'perspective', 'calm']
  },
  {
    id: 'tip-7',
    title: 'Guilt-Free Rest: Scheduled Recharging',
    quote: 'Rest is not a reward for work; rest is a prerequisite for good work.',
    takeaway: 'When you take a break while secretly feeling guilty, you get neither the benefit of resting nor the output of working. Schedule genuine play and relaxation.',
    actionableStep: 'Put a 30-minute block on your calendar today titled "Guilt-Free Rest" and spend it reading, walking, or relaxing.',
    category: 'Sustain',
    source: 'Burnout Prevention & Recovery',
    chapter: 'Deep Recharge',
    tags: ['burnout', 'rest', 'self-care']
  },
  {
    id: 'tip-8',
    title: 'Energy Investment Portfolio',
    quote: 'Treat your weekly hours like an investment portfolio: Active Yield vs Speculative Joy.',
    takeaway: 'Balance high-priority bread-and-butter tasks (70%) with experimental creative side projects (20%) and rejuvenating leisure (10%).',
    actionableStep: 'Audit your week: Are you allocating at least 2 hours to a project that brings pure creative excitement?',
    category: 'Sustain',
    source: 'Time Allocation & Portfolio Strategy',
    chapter: 'Long-term Alignment',
    tags: ['energy', 'balance', 'creativity']
  },
  {
    id: 'tip-9',
    title: 'Play Mentality: What Would This Look Like If It Were Fun?',
    quote: 'The single most transformative question: "What would this look like if it were fun?"',
    takeaway: 'Approaching a project with curiosity and lightheartedness unlocks higher dopamine and effortless flow.',
    actionableStep: 'Ask yourself: Can I turn this task into a game? Can I race a timer or put on an uplifting soundtrack?',
    category: 'Energize',
    source: 'The Play Principle',
    chapter: 'Curiosity & Game Design',
    tags: ['fun', 'gamification', 'flow']
  },
  {
    id: 'tip-10',
    title: 'The "Hell Yeah or No" Rule',
    quote: 'If you’re not saying "HELL YEAH!" about something, say no.',
    takeaway: 'Every time you agree to an uninspiring meeting or obligation, you are saying no to your core creative energy and rest.',
    actionableStep: 'Identify one commitment on your plate this week that is a lukewarm "maybe", and politely decline or delegate it.',
    category: 'Mindset',
    source: 'Boundary Setting & Saying No',
    chapter: 'Clarity of Commitments',
    tags: ['boundaries', 'saying-no', 'clarity']
  },
  {
    id: 'tip-11',
    title: 'The Energy Audit: Drains vs Boosters',
    quote: 'Fatigue is rarely about physical exhaustion; it’s about an imbalance of energizers and drains.',
    takeaway: 'Keep track throughout the day of which tasks give you energy versus which ones leave you feeling wiped out.',
    actionableStep: 'Draw two columns: "Gave Energy" and "Drained Energy". Note 3 items from yesterday.',
    category: 'Sustain',
    source: 'Energy Architecture',
    chapter: 'The Daily Audit',
    tags: ['audit', 'energy', 'awareness']
  },
  {
    id: 'tip-12',
    title: 'Friction Removal: The 20-Second Rule',
    quote: 'Reduce friction for good habits; add friction for bad ones.',
    takeaway: 'Making good tools 20 seconds easier to reach causes adoption to soar. Placing phones out of reach removes mindless distraction.',
    actionableStep: 'Place your water bottle directly on your desk, and put your phone in another room during your Daily Highlight.',
    category: 'Unblock',
    source: 'Habit Architecture & Environment Design',
    chapter: 'Environment Design',
    tags: ['friction', 'environment', 'habits']
  },
  {
    id: 'tip-13',
    title: 'The Feynman Technique for Deep Learning',
    quote: 'If you cannot explain something simply to a 10-year-old, you don’t truly understand it.',
    takeaway: 'True comprehension comes from deconstructing jargon and teaching concepts with metaphors.',
    actionableStep: 'Take one concept you recently learned and summarize it in 3 bullet points using plain, simple language.',
    category: 'Focus',
    source: 'Mastery Learning Strategies',
    chapter: 'Active Learning',
    tags: ['learning', 'feynman', 'mastery']
  },
  {
    id: 'tip-14',
    title: 'Body Doubling & Silent Coworking',
    quote: 'Just having someone present in the room triples your accountability and quiet focus.',
    takeaway: 'Working silently alongside a peer or in a virtual focus room eliminates the urge to browse distractingly.',
    actionableStep: 'Arrange a 45-minute focus session with a colleague or friend, or open a live study/work stream.',
    category: 'Energize',
    source: 'Social Momentum & Accountability',
    chapter: 'People as Power',
    tags: ['accountability', 'coworking', 'focus']
  },
  {
    id: 'tip-15',
    title: 'The Power of Identity Framing',
    quote: 'Don’t focus on what you want to achieve. Focus on who you want to become.',
    takeaway: 'Shift from "I have to write 500 words" to "I am a writer who loves expressing ideas". Your actions naturally follow your internal identity.',
    actionableStep: 'Repeat to yourself: "I am someone who handles important work with calm clarity."',
    category: 'Mindset',
    source: 'Identity & Habit Psychology',
    chapter: 'Power and Agency',
    tags: ['identity', 'mindset', 'habits']
  },
  {
    id: 'tip-16',
    title: 'Batched Admin Hours',
    quote: 'Fragmented admin is the silent killer of deep creative flow.',
    takeaway: 'Instead of checking invoices, Slack messages, and emails throughout the day, batch them into a dedicated 45-minute window in the late afternoon.',
    actionableStep: 'Batch all administrative tasks into one 4:00 PM sprint today. Protect your morning for deep focus.',
    category: 'Focus',
    source: 'Calendar Architecture & Timeboxing',
    chapter: 'Protecting Flow',
    tags: ['batching', 'admin', 'deep-work']
  },
  {
    id: 'tip-17',
    title: 'The Confidence-Competence Loop',
    quote: 'You do not wait for confidence to take action. Action creates competence, which breeds confidence.',
    takeaway: 'Waiting until you feel ready is a trap. Start awkwardly, gain feedback, build competence, and real confidence will follow naturally.',
    actionableStep: 'Take one clumsy, imperfect action today on a skill or project you have been hesitating on.',
    category: 'Unblock',
    source: 'Overcoming Imposter Syndrome',
    chapter: 'Action-First Momentum',
    tags: ['confidence', 'action', 'imposter-syndrome']
  },
  {
    id: 'tip-18',
    title: 'The 3 Compass Questions (Evening Reflection)',
    quote: 'Reflective days build intentional lives; unreflective days slip away unnoticed.',
    takeaway: 'End your day by asking: 1. What gave me joy and energy today? 2. What drained me? 3. What small experiment will I try tomorrow?',
    actionableStep: 'Jot down 1 sentence answering each compass question in your evening wind-down.',
    category: 'Sustain',
    source: 'Evening Wind-Down & Daily Review',
    chapter: 'The Compass Technique',
    tags: ['reflection', 'journaling', 'evening']
  },
  {
    id: 'tip-19',
    title: 'Hydration as a Cognitive Lever',
    quote: 'Even mild 1–2% dehydration drops attention span, memory retrieval, and working speed.',
    takeaway: 'Drinking water is the easiest biological productivity lever. When your brain feels foggy or resistant, drink a full glass of cool water before reaching for coffee.',
    actionableStep: 'Drink 250ml right now. Notice the immediate refreshing lift in mental alertness.',
    category: 'Energize',
    source: 'Biological Foundations for Focus',
    chapter: 'Physical Energy',
    tags: ['water', 'hydration', 'energy']
  },
  {
    id: 'tip-20',
    title: 'The Someday / Maybe List',
    quote: 'Your brain is for having ideas, not for holding them.',
    takeaway: 'When an idea or project isn’t actionable this week, store it in a designated Someday list so it doesn’t hijack your current focus.',
    actionableStep: 'Empty all random thoughts and future project ideas out of your head onto a backlog list.',
    category: 'Unblock',
    source: 'Personal Knowledge & Focus Management',
    chapter: 'Freeing Cognitive Bandwidth',
    tags: ['mental-clarity', 'ideas', 'gtd']
  },
  {
    id: 'tip-21',
    title: 'Reframing: "I Have To" → "I Get To"',
    quote: 'A single word change from obligation to privilege alters your brain chemistry.',
    takeaway: 'Saying "I have to review this document" triggers resentment and threat responses. Saying "I get to solve this problem" activates curiosity and gratitude.',
    actionableStep: 'Catch yourself saying "I have to" today and audibly replace it with "I get to".',
    category: 'Mindset',
    source: 'Cognitive Reframing',
    chapter: 'Reframe & Relish',
    tags: ['reframing', 'gratitude', 'mindset']
  },
  {
    id: 'tip-22',
    title: 'Soft Focus Sprints',
    quote: 'Productivity timers should feel like a cozy rhythm, not an angry school bell.',
    takeaway: 'Traditional timers can feel rigid. Use a soft 35–45 minute flow sprint, followed by a gentle stretch or water sip.',
    actionableStep: 'Run a 35-minute flow session with lofi music and give yourself 5 minutes of mindful breathing after.',
    category: 'Focus',
    source: 'Focus Rhythms & Stamina',
    chapter: 'Sprint Architecture',
    tags: ['pomodoro', 'focus', 'sprint']
  },
  {
    id: 'tip-23',
    title: 'The Rule of 3 (Weekly & Daily Wins)',
    quote: 'Three outcomes define a triumphant day. Everything else is a bonus.',
    takeaway: 'When our to-do list has 20 items, everything feels urgent. Narrowing down to the Top 3 keeps cognitive load low and satisfaction high.',
    actionableStep: 'Identify your Top 3 tasks for today: 1 Daily Highlight and 2 supportive tasks.',
    category: 'Focus',
    source: 'Outcome-Oriented Planning',
    chapter: 'The Essential Three',
    tags: ['rule-of-3', 'clarity', 'planning']
  },
  {
    id: 'tip-24',
    title: 'Celebrate Micro-Wins',
    quote: 'Dopamine doesn’t just come after massive victories; your brain releases it whenever you acknowledge progress.',
    takeaway: 'Give yourself a physical nod, fist pump, or celebratory tick whenever you complete a task. Celebrating reinforces positive neural pathways.',
    actionableStep: 'Celebrate right now: check off a task and celebrate the feeling of forward momentum!',
    category: 'Energize',
    source: 'Dopamine & Momentum',
    chapter: 'Rewarding the Journey',
    tags: ['dopamine', 'wins', 'celebration']
  },
  {
    id: 'tip-25',
    title: 'The "Ideal Week" Calendar Blueprint',
    quote: 'Design your calendar proactively for how you want your life to feel, not reactively to other people’s demands.',
    takeaway: 'Create a template for your ideal rhythm: deep creative focus in mornings, exercise before lunch, meetings grouped in dedicated afternoon blocks.',
    actionableStep: 'Look at your week ahead and block out your sacred morning focus hours before anyone can book over them.',
    category: 'Sustain',
    source: 'Proactive Scheduling & Blueprinting',
    chapter: 'Calendar Design',
    tags: ['calendar', 'ideal-week', 'timeboxing']
  },
  {
    id: 'tip-26',
    title: 'Curiosity Over Judgment: The Experimenter Mindset',
    quote: 'When something goes wrong, don’t judge yourself as lazy. Treat it as interesting laboratory data.',
    takeaway: 'If you procrastinated today, don’t spiral into guilt. Ask with curiosity: "What made that task feel uncertain or unappealing? How can I tweak the formula?"',
    actionableStep: 'Next time you procrastinate, write down the exact friction point: Was it lack of clarity or fear of doing it badly?',
    category: 'Mindset',
    source: 'Self-Compassion & Behavioral Science',
    chapter: 'The Curious Scientist',
    tags: ['curiosity', 'self-compassion', 'experiment']
  },
  {
    id: 'tip-27',
    title: 'Active Recall Beats Passive Rereading',
    quote: 'Testing yourself strengthens neural retrieval pathways 300% faster than highlighting notes.',
    takeaway: 'Whether studying a discipline or preparing for a presentation, close the book and quiz yourself or write from memory.',
    actionableStep: 'After reading any article or book chapter, write 3 key takeaways from memory without looking.',
    category: 'Focus',
    source: 'Evidence-Based Learning Science',
    chapter: 'Active Recall Mastery',
    tags: ['study', 'learning', 'recall']
  },
  {
    id: 'tip-28',
    title: 'Uncalendar: Planning For Flexibility',
    quote: 'Rigid schedules break under real-world pressure. Build margin and buffer blocks into your day.',
    takeaway: 'Leave at least 20% of your calendar open for spontaneous conversations, delays, or impromptu creative rabbit holes.',
    actionableStep: 'Add a 45-minute "Buffer & Overflow" block to your afternoon to absorb surprises calmly.',
    category: 'Sustain',
    source: 'Flexible Time Architecture',
    chapter: 'The Elastic Schedule',
    tags: ['calendar', 'flexibility', 'buffer']
  },
  {
    id: 'tip-29',
    title: 'The Power of Public Accountability',
    quote: 'Committing your intention to another human creates positive social momentum.',
    takeaway: 'Tell a friend or post online: "I am writing draft 1 by 5 PM today." Social commitment makes follow-through second nature.',
    actionableStep: 'Text a friend your Daily Highlight and tell them you’ll check in when it’s done.',
    category: 'Energize',
    source: 'Social Synergy & Focus',
    chapter: 'Commitment Architecture',
    tags: ['accountability', 'people', 'consistency']
  },
  {
    id: 'tip-30',
    title: 'Decide to Be an Amateur',
    quote: 'Give yourself permission to make terrible first drafts. Perfectionism is just fear in disguise.',
    takeaway: 'The first version of anything is supposed to be messy. Lower your standards for the first draft to allow momentum to ignite.',
    actionableStep: 'Commit to creating a "messy first draft" today without editing a single word while writing.',
    category: 'Unblock',
    source: 'Overcoming Perfectionism',
    chapter: 'Lowering the Stakes',
    tags: ['perfectionism', 'drafts', 'creativity']
  }
];

export function getDailyTipForDate(date: Date = new Date()): DailyTip {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs(dayOfYear) % PRODUCTIVITY_TIPS.length;
  return PRODUCTIVITY_TIPS[index];
}

export function getRandomTip(excludeId?: string): DailyTip {
  const filtered = excludeId 
    ? PRODUCTIVITY_TIPS.filter(t => t.id !== excludeId)
    : PRODUCTIVITY_TIPS;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
