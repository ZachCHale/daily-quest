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
import { getTasksForCategory } from './taskUtils';
import { motion, AnimatePresence } from 'framer-motion';

import CategoryCard from './components/CategoryCard/CategoryCard';
import Header from './components/Header/Header';
import RewardsSummary from './components/RewardsSummary/RewardsSummary';
import Shop from './components/Shop/Shop';

import CATEGORIES from './data/chores';
import SHOP_ITEMS from './data/shopItems';

function App() {
  const [checkedIds, setCheckedIds] = useState(() => loadState() ?? new Set());

  const [expandedIds, setExpandedIds] = useState(new Set());

  const prevCheckedIds = useRef(checkedIds);

  const [inventory, setInventory] = useState(() => loadInventory());

  const [currentPage, setCurrentPage] = useState('home');

  const [purchases, setPurchases] = useState(() => loadPurchases());

  useEffect(() => {
    savePurchases(purchases);
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
    saveState(checkedIds);
  }, [checkedIds]);

  useEffect(() => {
    saveInventory(inventory);
  }, [inventory]);

  const awardTaskRewards = (task) => {
    setInventory((prev) => {
      const next = { ...prev };
      next[task.reward] = (next[task.reward] || 0) + 1;
      return next;
    });
  };

  useEffect(() => {
    sortedCategories.forEach((category) => {
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

  const sortedCategories = CATEGORIES.slice().sort((a, b) => {
    const tasks_a = getTasksForCategory(a);
    const tasks_b = getTasksForCategory(b);
    const aComplete = tasks_a.every((task) => checkedIds.has(task.id));
    const bComplete = tasks_b.every((task) => checkedIds.has(task.id));
    if (aComplete === bComplete) return 0;
    return aComplete ? 1 : -1;
  });

  const totalEarnedRewards = sortedCategories.reduce((acc, category) => {
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
        purchasedAt: new Date().toLocaleDateString(),
        consumed: false,
      },
    ]);
  };

  const handleConsume = (index) => {
    setPurchases((prev) =>
      prev.map((p, i) => (i === index ? { ...p, consumed: true } : p)),
    );
  };

  const handleRefund = (index) => {
    const purchase = purchases[index];
    const item = SHOP_ITEMS.find((i) => i.id === purchase.id);
    setInventory((prev) => {
      const next = { ...prev };
      next.coin = (next.coin || 0) + item.cost;
      return next;
    });
    setPurchases((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header
        inventory={inventory}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <div className='app'>
        {currentPage === 'shop' ? (
          <Shop
            inventory={inventory}
            onPurchase={handlePurchase}
            purchases={purchases}
            onConsume={handleConsume}
            onRefund={handleRefund}
          />
        ) : (
          <>
            <RewardsSummary totalEarnedRewards={totalEarnedRewards} />
            <AnimatePresence>
              {sortedCategories.map((category) => (
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
      </div>
    </>
  );
}

export default App;
