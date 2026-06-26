const CATEGORIES = [
  {
    id: 'morning-chores',
    label: 'Morning Chores',
    rewards: ['gold'],
    dailyTasks: [
      { label: 'Make the bed', emoji: '🛏️' },
      { label: 'Wash the dishes', emoji: '🍽️' },
      { label: 'Clean Desk', emoji: '🍵' },
    ],
    poolTasks: [
      { label: 'Take out the trash', emoji: '🗑️' },
      { label: 'Vacuum the floors', emoji: '🧹' },
      { label: 'Do the laundry', emoji: '👕' },
      { label: 'Wipe down counters', emoji: '🧽' },
      { label: 'Clean floor clutter', emoji: '👞' },
      { label: 'Organize Closet', emoji: '🚪' },
      { label: 'Cat Litter', emoji: '🐈' },
    ],
    pickCount: 2,
  },
  {
    id: 'hygiene',
    label: 'Hygiene',
    rewards: ['gold', 'health-potion', 'barter-token'],
    dailyTasks: [
      { label: 'Brush teeth', emoji: '🪥' },
      { label: 'Shower', emoji: '🚿' },
      { label: 'Wash face', emoji: '🧴' },
      { label: 'Deodorant', emoji: '🧼' },
    ],
    poolTasks: [
      { label: 'Floss', emoji: '🦷' },
      { label: 'Moisturize', emoji: '🧴' },
    ],
    pickCount: 1,
  },
  {
    id: 'fitness',
    label: 'Fitness',
    rewards: ['gold', 'travel-ticket', 'stamina-potion'],
    dailyTasks: [
      { label: 'Morning stretch', emoji: '🧘' },
      { label: '30 minute walk', emoji: '🏃' },
    ],
    poolTasks: [
      { label: 'Push-ups', emoji: '💪' },
      { label: 'Squats', emoji: '🦵' },
      { label: 'Lunges', emoji: '🦵' },
      { label: 'Plank', emoji: '😤' },
      { label: 'Burpees', emoji: '🔥' },
      { label: 'Mountain climbers', emoji: '🧗' },
      { label: 'Jump squats', emoji: '⬆️' },
      { label: 'Tricep dips', emoji: '💪' },
      { label: 'Crunches', emoji: '🎯' },
      { label: 'Leg raises', emoji: '🦵' },
    ],
    pickCount: 2,
  },
  {
    id: 'mental',
    label: 'Mental Exercises',
    rewards: ['gold', 'mana-potion', 'field-report'],
    dailyTasks: [{ label: 'Read for 30 minutes', emoji: '📖' }],
    poolTasks: [
      { label: 'Do a crossword puzzle', emoji: '✏️' },
      { label: 'Play a game of chess', emoji: '♟️' },
      { label: 'Solve a sudoku', emoji: '🔢' },
      { label: 'Draw something', emoji: '📝' },
      { label: 'Expand your vocabulary', emoji: '💭' },
      { label: 'Watch an educational video', emoji: '🎓' },
    ],
    pickCount: 2,
  },
];

export default CATEGORIES;
