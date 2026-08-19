import styles from './RewardItem.module.scss'

function RewardItem({ item, purchase, onConsume, onRefund }) {
  return (
    <div className={styles.item}>
      <span className={styles.itemEmoji}>{item.emoji}</span>
      <div className={styles.itemInfo}>
        <p className={styles.itemLabel}>{item.label}</p>
        <p className={styles.itemDate}>Purchased {purchase.purchasedAt}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.consumeButton} onClick={onConsume}>
          Redeem
        </button>
        <button className={styles.refundButton} onClick={onRefund}>
          Refund
        </button>
      </div>
    </div>
  )
}

export default RewardItem