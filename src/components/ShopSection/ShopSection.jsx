import SHOP_ITEMS from '../../data/shopItems';
import ShopItem from '../ShopItem/ShopItem';
import styles from './ShopSection.module.scss';

function ShopSection({ coins, onPurchase }) {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Available Rewards</h3>
      <div className={styles.items}>
        {SHOP_ITEMS.map((item) => (
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
