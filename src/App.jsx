import './App.scss';
import { useState } from 'react';
import CategoryCard from './components/CategoryCard/CategoryCard';
import Header from './components/Header/Header';

import CATEGORIES from './chores';

function App() {
  const [checkedIds, setCheckedIds] = useState(new Set());

  const [expandedIds, setExpandedIds] = useState(new Set());

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

  return (
    <>
      <Header />

      <div className='app'>
        {CATEGORIES.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            expanded={expandedIds.has(category.id)}
            checkedIds={checkedIds}
            onToggle={toggle}
            onToggleExpanded={toggleExpanded}
          />
        ))}
      </div>
    </>
  );
}

export default App;
