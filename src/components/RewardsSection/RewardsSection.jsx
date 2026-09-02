import { SHOP_ITEMS } from '../../data/shopItems';
import RewardItem from '../RewardItem/RewardItem';
import styles from './RewardsSection.module.scss';

function RewardsSection({ purchases, onConsume, onRefund, shopItems }) {
  const pendingPurchases = purchases.filter((p) => !p.consumed);

  if (pendingPurchases.length === 0) return null;

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Pending Rewards</h3>
      <div className={styles.items}>
        {pendingPurchases.map((purchase) => (
          <RewardItem
            key={purchase.purchaseId}
            item={shopItems.find((i) => i.id === purchase.id)}
            purchase={purchase}
            onConsume={() => onConsume(purchase.purchaseId)}
            onRefund={() => onRefund(purchase.purchaseId)}
          />
        ))}
      </div>
    </div>
  );
}

export default RewardsSection;
