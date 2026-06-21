import styles from './CategoryCard.module.scss';
import ChoreItem from '../ChoreItem/ChoreItem';
import { getTasksForCategory } from '../../taskUtils';
import { motion, AnimatePresence } from 'framer-motion';

function CategoryCard({
  category,
  expanded,
  checkedIds,
  onToggle,
  onToggleExpanded,
}) {
  const tasks = getTasksForCategory(category);

  const sortedTasks = tasks.slice().sort((a, b) => {
    const aChecked = checkedIds.has(`${category.id}-${a.label}`);
    const bChecked = checkedIds.has(`${category.id}-${b.label}`);
    if (aChecked === bChecked) return 0;
    return aChecked ? 1 : -1;
  });

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
          <AnimatePresence>
            {sortedTasks.map((task) => (
              <motion.div
                key={`${category.id}-${task.label}`}
                layout
                transition={{ duration: 0.3 }}
              >
                <ChoreItem
                  id={`${category.id}-${task.label}`}
                  chore={task}
                  checked={checkedIds.has(`${category.id}-${task.label}`)}
                  onToggle={onToggle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default CategoryCard;
