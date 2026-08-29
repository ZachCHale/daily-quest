import styles from './ShopHeader.module.scss';

function ShopHeader({ coins }) {
  return (
    <div className={styles.shopHeader}>
      <h2 className={styles.title}>Shop</h2>
    </div>
  );
}

export default ShopHeader;
