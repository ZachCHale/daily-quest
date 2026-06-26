import styles from './ChoreItem.module.scss';
import CURRENCIES from '../../data/currencies';

function ChoreItem({ id, chore, checked, onToggle }) {
  const rewardCurrency = CURRENCIES[chore.reward];

  return (
    <li
      className={`${styles.choreItem} ${checked ? styles.checked : ''}`}
      onClick={() => !checked && onToggle(id)}
    >
      <span className={styles.checkbox} />
      <span className={styles.choreLabel}>
        {chore.emoji} {chore.label}
      </span>
      <span className={styles.reward}>{rewardCurrency.emoji}</span>
    </li>
  );
}

export default ChoreItem;
