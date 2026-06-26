import CURRENCIES from '../../data/currencies';
import styles from './Header.module.scss';

function Header({ inventory }) {
  return (
    <header className={styles.header}>
      <div>
        <h1>Daily Quest</h1>
      </div>
      <div className={styles.inventory}>
        {Object.entries(CURRENCIES).map(([key, currency]) => (
          <span key={key} className={styles.inventoryItem}>
            {currency.emoji} {inventory?.[key] || 0}
          </span>
        ))}
      </div>
    </header>
  );
}

export default Header;
