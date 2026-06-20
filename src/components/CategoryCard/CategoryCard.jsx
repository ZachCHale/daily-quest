import styles from './CategoryCard.module.scss';
import ChoreItem from '../ChoreItem/ChoreItem';
import { pickFromPool, dateSeed } from '../../seedRandom';

const seed = dateSeed();
function getTasksForCategory(category) {
  return [
    ...category.dailyTasks,
    ...pickFromPool(
      category.poolTasks,
      category.pickCount,
      seed + category.id.length,
    ),
  ];
}

function CategoryCard({
  category,
  expanded,
  checkedIds,
  onToggle,
  onToggleExpanded,
}) {
  const tasks = getTasksForCategory(category);
  const completedCount = tasks.filter((task) =>
    checkedIds.has(`${category.id}-${task.label}`),
  ).length;
  const allComplete = completedCount === tasks.length;

  return (
    <div className={styles.card}>
      <div
        className={`${styles.cardHeader} ${allComplete ? styles.complete : ''}`}
        onClick={() => onToggleExpanded(category.id)}
      >
        <h1>{category.label}</h1>
        <div className={styles.cardHeaderRight}>
          {allComplete && <span className={styles.checkmark}>✓</span>}
          <span className={styles.progress}>
            {completedCount}/{tasks.length}
          </span>
          <span
            className={`${styles.chevron} ${expanded ? styles.expanded : ''}`}
          >
            ▼
          </span>
        </div>
      </div>
      <div className={`${styles.cardBody} ${expanded ? styles.expanded : ''}`}>
        <ul>
          {tasks.map((task) => (
            <ChoreItem
              key={`${category.id}-${task.label}`}
              id={`${category.id}-${task.label}`}
              chore={task}
              checked={checkedIds.has(`${category.id}-${task.label}`)}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryCard;
