import CURRENCIES from '../../data/currencies';
import styles from './RewardsSummary.module.scss';

function RewardsSummary({ totalEarnedRewards }) {
  if (Object.keys(totalEarnedRewards).length === 0) return null;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Today's Rewards</h2>
      <div className={styles.rewards}>
        {Object.entries(totalEarnedRewards).map(([key, amount]) => (
          <span key={key} className={styles.rewardItem}>
            {CURRENCIES[key].emoji} {amount}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RewardsSummary;
