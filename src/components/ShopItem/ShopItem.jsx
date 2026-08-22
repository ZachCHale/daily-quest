import styles from './ShopItem.module.scss';

function ShopItem({ item, canAfford, onPurchase }) {
  return (
    <div className={styles.item}>
      <span className={styles.itemEmoji}>{item.emoji}</span>
      <div className={styles.itemInfo}>
        <p className={styles.itemLabel}>{item.label}</p>
        <p className={styles.itemCost}>🪙 {item.cost} coins</p>
      </div>
      <button
        className={styles.buyButton}
        onClick={() => onPurchase(item)}
        disabled={!canAfford}
      >
        Buy
      </button>
    </div>
  );
}

export default ShopItem;
