import { pickFromPool, dateSeed, seededRandom } from './seedRandom';

const seed = dateSeed();

function getTaskReward(category, task) {
  const taskSeed = seed + task.label.length + category.id.length;
  const index = Math.floor(seededRandom(taskSeed) * category.rewards.length);
  return category.rewards[index];
}

export function getTasksForCategory(category) {
  const daily = category.dailyTasks.map((task) => ({
    ...task,
    id: `${category.id}-${task.label}`,
    reward: getTaskReward(category, task),
  }));

  const pooled = pickFromPool(
    category.poolTasks,
    category.pickCount,
    seed + category.id.length,
  ).map((task) => ({
    ...task,
    id: `${category.id}-${task.label}`,
    reward: getTaskReward(category, task),
  }));

  return [...daily, ...pooled];
}
