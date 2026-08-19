import styles from './ShopHeader.module.scss'

function ShopHeader({ coins }) {
  return (
    <div className={styles.shopHeader}>
      <h2 className={styles.title}>Shop</h2>
      <span className={styles.balance}>🪙 {coins} coins</span>
    </div>
  )
}

export default ShopHeader