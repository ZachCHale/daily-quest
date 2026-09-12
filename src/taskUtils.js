import { pickFromPool, dateSeed, seededRandom } from './seedRandom';

const seed = dateSeed();

function getTaskReward(category, task) {
  const taskSeed = seed + task.label.length + category.id.length;
  const index = Math.floor(seededRandom(taskSeed) * category.rewards.length);
  return category.rewards[index];
}

export function getTasksForCategory(category) {
  const withRewards = (task) => ({
    ...task,
    id: `${category.id}-${task.label}`,
    reward: getTaskReward(category, task),
  });

  const alwaysTasks = category.tasks.filter((t) => !t.tags.includes('pool'));
  const poolTasks = category.tasks.filter((t) => t.tags.includes('pool'));

  const effectivePickCount = Math.min(category.pickCount, poolTasks.length);

  const picked = pickFromPool(
    poolTasks,
    effectivePickCount,
    seed + category.id.length,
  );

  return [...alwaysTasks, ...picked].map(withRewards);
}
