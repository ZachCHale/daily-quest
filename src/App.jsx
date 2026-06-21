import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { loadState, saveState } from './storage';
import { getTasksForCategory } from './taskUtils';
import { motion, AnimatePresence } from 'framer-motion';

import CategoryCard from './components/CategoryCard/CategoryCard';
import Header from './components/Header/Header';

import CATEGORIES from './chores';

function App() {
  const [checkedIds, setCheckedIds] = useState(() => loadState() ?? new Set());

  const [expandedIds, setExpandedIds] = useState(new Set());

  const prevCheckedIds = useRef(checkedIds);

  useEffect(() => {
    sortedCategories.forEach((category) => {
      const tasks = getTasksForCategory(category);
      const wasComplete = tasks.every((task) =>
        prevCheckedIds.current.has(`${category.id}-${task.label}`),
      );
      const isComplete = tasks.every((task) =>
        checkedIds.has(`${category.id}-${task.label}`),
      );

      if (!wasComplete && isComplete) {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          next.delete(category.id);
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

  const toggle = (id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sortedCategories = CATEGORIES.slice().sort((a, b) => {
    const aComplete = getTasksForCategory(a).every((task) =>
      checkedIds.has(`${a.id}-${task.label}`),
    );
    const bComplete = getTasksForCategory(b).every((task) =>
      checkedIds.has(`${b.id}-${task.label}`),
    );
    if (aComplete === bComplete) return 0;
    return aComplete ? 1 : -1;
  });

  return (
    <>
      <Header />
      <div className='app'>
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
      </div>
    </>
  );
}

export default App;
