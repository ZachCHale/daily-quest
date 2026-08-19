import CURRENCIES from '../../data/currencies';
import styles from './Header.module.scss';

function Header({ inventory, theme, onToggleTheme, currentPage, onNavigate }) {
  return (
    <header className={styles.header}>
      <h1>Daily Quest</h1>
      <div className={styles.inventory}>
        {Object.entries(CURRENCIES).map(([key, currency]) => (
          <span key={key} className={styles.inventoryItem}>
            {currency.emoji} {inventory?.[key] || 0}
          </span>
        ))}
        <button
  className={styles.navButton}
  onClick={() => onNavigate(currentPage === 'shop' ? 'home' : 'shop')}
>
  {currentPage === 'shop' ? '🏠 Home' : '🛒 Shop'}
</button>
      </div>
      <div className={styles.toggleWrapper}>
        <span>☀️</span>
        <button
          className={`${styles.toggle} ${theme === 'dark' ? styles.toggleDark : ''}`}
          onClick={onToggleTheme}
          aria-label='Toggle dark mode'
        >
          <span className={styles.knob} />
        </button>
        <span>🌙</span>
      </div>
    </header>
  );
}

export default Header;
