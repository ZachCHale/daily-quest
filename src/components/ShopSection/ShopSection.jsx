import ShopItem from '../ShopItem/ShopItem';
import styles from './ShopSection.module.scss';

function ShopSection({ coins, onPurchase, shopItems }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Available Rewards</h3>
      <div className={styles.items}>
        {shopItems.map((item) => (
          <ShopItem
            key={item.id}
            item={item}
            canAfford={coins >= item.cost}
            onPurchase={onPurchase}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopSection;
