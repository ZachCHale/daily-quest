import './App.css';
import { useState } from 'react';
import { pickFromPool, dateSeed } from './seedRandom';

import CATEGORIES from './chores';

function ChoreItem({ id, chore, checked, onToggle }) {
  return (
    <li onClick={() => onToggle(id)}>
      {checked ? '✅' : '⬜'} {chore.emoji} {chore.label}
    </li>
  );
}

function App() {
  const [checkedIds, setCheckedIds] = useState(new Set());

  const [expandedIds, setExpandedIds] = useState(new Set());

  const seed = dateSeed();

  const getTasksForCategory = (category) => {
    const pooled = pickFromPool(
      category.poolTasks,
      category.pickCount,
      seed + category.id.length,
    );
    return [...category.dailyTasks, ...pooled];
  };

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
      {CATEGORIES.map((category) => {
        const tasks = getTasksForCategory(category);
        return (
          <div key={category.id} className='card'>
            <div
              className='card-header'
              onClick={() => toggleExpanded(category.id)}
            >
              <h1>{category.label}</h1>
            </div>
            {expandedIds.has(category.id) && (
              <ul>
                {tasks.map((task) => (
                  <ChoreItem
                    key={`${category.id}-${task.label}`}
                    id={`${category.id}-${task.label}`}
                    chore={task}
                    checked={checkedIds.has(`${category.id}-${task.label}`)}
                    onToggle={toggle}
                  />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
