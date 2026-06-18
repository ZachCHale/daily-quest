import styles from './ChoreItem.module.scss';

function ChoreItem({ id, chore, checked, onToggle }) {
  return (
    <li
      className={`${styles.choreItem} ${checked ? styles.checked : ''}`}
      onClick={() => onToggle(id)}
    >
      <span className={styles.checkbox} />
      <span className={styles.choreLabel}>
        {chore.emoji} {chore.label}
      </span>
    </li>
  );
}

export default ChoreItem;
