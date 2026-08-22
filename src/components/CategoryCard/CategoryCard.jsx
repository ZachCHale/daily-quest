import styles from './CategoryCard.module.scss';
import ChoreItem from '../ChoreItem/ChoreItem';
import { getTasksForCategory } from '../../taskUtils';
import { motion, AnimatePresence } from 'framer-motion';
import CURRENCIES from '../../data/currencies';

function CategoryCard({
  category,
  expanded,
  checkedIds,
  onToggle,
  onToggleExpanded,
}) {
  const tasks = getTasksForCategory(category);

  const sortedTasks = tasks.slice().sort((a, b) => {
    const aChecked = checkedIds.has(a.id);
    const bChecked = checkedIds.has(b.id);
    if (aChecked === bChecked) return 0;
    return aChecked ? 1 : -1;
  });

  const completedCount = tasks.filter((task) => checkedIds.has(task.id)).length;
  const allComplete = completedCount === tasks.length;

  const earnedRewards = sortedTasks
    .filter((task) => checkedIds.has(task.id))
    .reduce((acc, task) => {
      acc[task.reward] = (acc[task.reward] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className={styles.card}>
      <div
        className={`${styles.cardHeader} ${allComplete ? styles.complete : ''}`}
        onClick={() => onToggleExpanded(category.id)}
      >
        <h1>{category.label}</h1>
        <div className={styles.cardHeaderRight}>
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
          {sortedTasks.map((task) => (
            <ChoreItem
              key={task.id}
              id={task.id}
              chore={task}
              checked={checkedIds.has(task.id)}
              onToggle={(id) => onToggle(id, task)}
            />
          ))}
        </ul>
      </div>
      <div
        className={`${styles.cardFooter} ${allComplete ? styles.cardFooterComplete : ''}`}
      >
        <div className={styles.earnedRewards}>
          {Object.entries(earnedRewards).length > 0 ? (
            <div>
              <span className={styles.rewardItem}>Rewards: </span>
              {Object.entries(earnedRewards).map(([key, amount]) => (
                <span key={key} className={styles.rewardItem}>
                  {CURRENCIES[key].emoji} {allComplete ? amount * 2 : amount}
                </span>
              ))}
            </div>
          ) : (
            <span className={styles.rewardItem}>No rewards yet</span>
          )}
        </div>
        <div
          className={`${styles.bonusSection} ${allComplete ? styles.bonusSectionComplete : ''}`}
        >
          <p
            className={`${styles.bonusMessage} ${allComplete ? styles.bonusMessageActive : ''}`}
          >
            {allComplete
              ? 'Category Complete: 2X bonus rewards earned!'
              : 'Category Incomplete: Complete all tasks for 2X rewards!'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
