import './App.scss';
import { useState, useEffect, useRef } from 'react';
import {
  loadState,
  saveState,
  loadInventory,
  saveInventory,
  loadTheme,
  saveTheme,
  loadPurchases,
  savePurchases,
} from './storage';
import { loadProfiles, saveProfiles } from './storage';
import { DEFAULT_PROFILE } from './data/profiles';
import { getTasksForCategory } from './taskUtils';
import { motion, AnimatePresence } from 'framer-motion';

import CategoryCard from './components/CategoryCard/CategoryCard';
import Header from './components/Header/Header';
import RewardsSummary from './components/RewardsSummary/RewardsSummary';
import Shop from './components/Shop/Shop';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { DEFAULT_PROFILE_DATA } from './data/defaultProfile';

function App() {
  const [profiles, setProfiles] = useState(() => loadProfiles());
  const [activeProfile, setActiveProfile] = useState(() => loadProfiles()[0]);

  const activeCategories =
    activeProfile.categories ?? DEFAULT_PROFILE_DATA.categories;
  const activeShopItems =
    activeProfile.shopItems ?? DEFAULT_PROFILE_DATA.shopItems;

  const [checkedIds, setCheckedIds] = useState(
    () => loadState(activeProfile.id) ?? new Set(),
  );

  const [expandedIds, setExpandedIds] = useState(new Set());

  const prevCheckedIds = useRef(checkedIds);

  const [inventory, setInventory] = useState(() =>
    loadInventory(activeProfile.id),
  );

  const [currentPage, setCurrentPage] = useState('home');

  const [purchases, setPurchases] = useState(() =>
    loadPurchases(activeProfile.id),
  );

  useEffect(() => {
    savePurchases(purchases, activeProfile.id);
  }, [purchases]);

  const [theme, setTheme] = useState(() => {
    const saved = loadTheme();
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    saveState(checkedIds, activeProfile.id);
  }, [checkedIds]);

  useEffect(() => {
    saveInventory(inventory, activeProfile.id);
  }, [inventory]);

  const awardTaskRewards = (task) => {
    setInventory((prev) => {
      const next = { ...prev };
      next[task.reward] = (next[task.reward] || 0) + 1;
      return next;
    });
  };

  useEffect(() => {
    activeCategories.forEach((category) => {
      const tasks = getTasksForCategory(category);
      const wasComplete = tasks.every((task) =>
        prevCheckedIds.current.has(task.id),
      );
      const isComplete = tasks.every((task) => checkedIds.has(task.id));

      if (!wasComplete && isComplete) {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          next.delete(category.id);
          return next;
        });

        // Award category completion bonus (2x all task rewards)
        setInventory((prev) => {
          const next = { ...prev };
          tasks.forEach((task) => {
            next[task.reward] = (next[task.reward] || 0) + 1;
          });
          return next;
        });
      }
    });

    prevCheckedIds.current = checkedIds;
  }, [checkedIds]);

  const toggleExpanded = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggle = (id, task) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    awardTaskRewards(task);
  };

  const incompleteCategories = activeCategories.filter((category) => {
    const tasks = getTasksForCategory(category);
    return !tasks.every((task) => checkedIds.has(task.id));
  });

  const completeCategories = activeCategories.filter((category) => {
    const tasks = getTasksForCategory(category);
    return tasks.every((task) => checkedIds.has(task.id));
  });

  const totalEarnedRewards = activeCategories.reduce((acc, category) => {
    const tasks = getTasksForCategory(category);
    const isComplete = tasks.every((task) => checkedIds.has(task.id));
    const multiplier = isComplete ? 2 : 1;
    tasks
      .filter((task) => checkedIds.has(task.id))
      .forEach((task) => {
        acc[task.reward] = (acc[task.reward] || 0) + multiplier;
      });
    return acc;
  }, {});

  const handlePurchase = (item) => {
    setInventory((prev) => {
      const next = { ...prev };
      next.coin = (next.coin || 0) - item.cost;
      return next;
    });
    setPurchases((prev) => [
      ...prev,
      {
        id: item.id,
        purchaseId: crypto.randomUUID(),
        purchasedAt: new Date().toLocaleDateString(),
        consumed: false,
      },
    ]);
  };
  const handleConsume = (purchaseId) => {
    setPurchases((prev) =>
      prev.map((p) =>
        p.purchaseId === purchaseId ? { ...p, consumed: true } : p,
      ),
    );
  };

  const handleRefund = (purchaseId) => {
    const purchase = purchases.find((p) => p.purchaseId === purchaseId);
    const item = activeShopItems.find((i) => i.id === purchase.id);
    setInventory((prev) => {
      const next = { ...prev };
      next.coin = (next.coin || 0) + item.cost;
      return next;
    });
    setPurchases((prev) => prev.filter((p) => p.purchaseId !== purchaseId));
  };

  const handleSelectProfile = (profile) => {
    setActiveProfile(profile);
    setCheckedIds(loadState(profile.id) ?? new Set());
    setInventory(loadInventory(profile.id));
    setPurchases(loadPurchases(profile.id));
    setCurrentPage('home');
  };

  return (
    <>
      <Header
        inventory={inventory}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        activeProfile={activeProfile}
      />
      <div className='app'>
        {currentPage === 'profiles' ? (
          <ProfilePage
            profiles={profiles}
            activeProfile={activeProfile}
            onSelectProfile={handleSelectProfile}
          />
        ) : currentPage === 'shop' ? (
          <Shop
            inventory={inventory}
            onPurchase={handlePurchase}
            purchases={purchases}
            onConsume={handleConsume}
            onRefund={handleRefund}
            shopItems={activeShopItems}
          />
        ) : (
          <>
            <div className='pageTitleRow'>
              <h2 className='pageTitle'>Tasks</h2>
              <RewardsSummary totalEarnedRewards={totalEarnedRewards} />
            </div>
            {incompleteCategories.length > 0 && (
              <>
                <h3 className='sectionTitle'>Incomplete</h3>
                <AnimatePresence>
                  {incompleteCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      layout
                      transition={{ duration: 0.3 }}
                      className='categoryWrapper'
                    >
                      <CategoryCard
                        key={category.id}
                        category={category}
                        expanded={expandedIds.has(category.id)}
                        checkedIds={checkedIds}
                        onToggle={toggle}
                        onToggleExpanded={toggleExpanded}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
            {completeCategories.length > 0 && (
              <>
                <h3 className='sectionTitle'>Complete</h3>
                <AnimatePresence>
                  {completeCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      layout
                      transition={{ duration: 0.3 }}
                      className='categoryWrapper'
                    >
                      <CategoryCard
                        key={category.id}
                        category={category}
                        expanded={expandedIds.has(category.id)}
                        checkedIds={checkedIds}
                        onToggle={toggle}
                        onToggleExpanded={toggleExpanded}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
