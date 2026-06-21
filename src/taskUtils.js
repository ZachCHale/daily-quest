import { pickFromPool, dateSeed } from './seedRandom';

const seed = dateSeed();

export function getTasksForCategory(category) {
  return [
    ...category.dailyTasks,
    ...pickFromPool(
      category.poolTasks,
      category.pickCount,
      seed + category.id.length,
    ),
  ];
}
