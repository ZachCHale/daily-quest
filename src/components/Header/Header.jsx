import StorefrontIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from './Header.module.scss';

function Header({
  inventory,
  theme,
  onToggleTheme,
  currentPage,
  onNavigate,
  activeProfile,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <button
            className={styles.navButton}
            onClick={() => onNavigate(currentPage === 'shop' ? 'home' : 'shop')}
          >
            {currentPage === 'shop' ? <HomeIcon /> : <StorefrontIcon />}
          </button>
          <button
            className={styles.profileButton}
            onClick={() =>
              onNavigate(currentPage === 'profiles' ? 'home' : 'profiles')
            }
          >
            {activeProfile.label}
          </button>
          <button
            className={styles.themeButton}
            onClick={onToggleTheme}
            aria-label='Toggle dark mode'
          >
            {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
        <div className={styles.right}>
          <span className={styles.coinDisplay}>🪙 {inventory?.coin || 0}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
