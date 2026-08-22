import SHOP_ITEMS from '../../data/shopItems';
import RewardItem from '../RewardItem/RewardItem';
import styles from './RewardsSection.module.scss';

function RewardsSection({ purchases, onConsume, onRefund }) {
  const pendingPurchases = purchases.filter((p) => !p.consumed);

  if (pendingPurchases.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Pending Rewards</h3>
      <div className={styles.items}>
        {pendingPurchases.map((purchase, index) => {
          const item = SHOP_ITEMS.find((i) => i.id === purchase.id);
          return (
            <RewardItem
              key={index}
              item={item}
              purchase={purchase}
              onConsume={() => onConsume(index)}
              onRefund={() => onRefund(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RewardsSection;
