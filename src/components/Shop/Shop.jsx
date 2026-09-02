import ShopHeader from '../ShopHeader/ShopHeader';
import RewardsSection from '../RewardsSection/RewardsSection';
import ShopSection from '../ShopSection/ShopSection';
import styles from './Shop.module.scss';

function Shop({
  inventory,
  onPurchase,
  purchases,
  onConsume,
  onRefund,
  shopItems,
}) {
  const coins = inventory?.coin || 0;

  return (
    <div className={styles.shop}>
      <ShopHeader coins={coins} />
      <RewardsSection
        purchases={purchases}
        onConsume={onConsume}
        onRefund={onRefund}
        shopItems={shopItems}
      />
      <ShopSection
        coins={coins}
        onPurchase={onPurchase}
        shopItems={shopItems}
      />
    </div>
  );
}

export default Shop;
