import './App.css';
import { useState } from 'react';

import CATEGORIES from './chores';

function ChoreItem({ chore, checked, onToggle }) {
  return (
    <li onClick={() => onToggle(chore.id)}>
      {checked ? '✅' : '⬜'} {chore.emoji} {chore.label}
    </li>
  );
}

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
    <div className='app'>
      {CATEGORIES.map((category) => (
        <div key={category.id} className='card'>
          <div
            className='card-header'
            onClick={() => toggleExpanded(category.id)}
          >
            <h1>{category.label}</h1>
          </div>
          {expandedIds.has(category.id) && (
            <ul>
              {category.chores.map((chore) => (
                <ChoreItem
                  key={chore.id}
                  chore={chore}
                  checked={checkedIds.has(chore.id)}
                  onToggle={toggle}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
