import SHOP_ITEMS from '../../data/shopItems';
import CURRENCIES from '../../data/currencies';
import styles from './Shop.module.scss';

function Shop({ inventory, onPurchase, purchases, onConsume, onRefund }) {
  const coins = inventory?.coin || 0;
  const pendingPurchases = purchases.filter((p) => !p.consumed);

  return (
    <div className={styles.shop}>
      <div className={styles.shopHeader}>
        <h2 className={styles.title}>Shop</h2>
        <span className={styles.balance}>🪙 {coins} coins</span>
      </div>

      {pendingPurchases.length > 0 && (
        <div className={styles.pendingSection}>
          <h3 className={styles.sectionTitle}>Pending Rewards</h3>
          <div className={styles.items}>
            {pendingPurchases.map((purchase, index) => {
              const item = SHOP_ITEMS.find((i) => i.id === purchase.id);
              return (
                <div key={index} className={styles.item}>
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemLabel}>{item.label}</p>
                    <p className={styles.itemCost}>
                      Purchased {purchase.purchasedAt}
                    </p>
                  </div>
                  <button
                    className={styles.consumeButton}
                    onClick={() => onConsume(index)}
                  >
                    Redeem
                  </button>
                  <button
                    className={styles.refundButton}
                    onClick={() => onRefund(index)}
                  >
                    Refund
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h3 className={styles.sectionTitle}>Available Rewards</h3>
      <div className={styles.items}>
        {SHOP_ITEMS.map((item) => (
          <div key={item.id} className={styles.item}>
            <span className={styles.itemEmoji}>{item.emoji}</span>
            <div className={styles.itemInfo}>
              <p className={styles.itemLabel}>{item.label}</p>
              <p className={styles.itemCost}>🪙 {item.cost} coins</p>
            </div>
            <button
              className={styles.buyButton}
              onClick={() => onPurchase(item)}
              disabled={coins < item.cost}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
