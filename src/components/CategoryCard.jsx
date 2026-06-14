import ChoreItem from './ChoreItem';
import { pickFromPool, dateSeed } from '../seedRandom';

const seed = dateSeed();
function getTasksForCategory(category) {
  return [
    ...category.dailyTasks,
    ...pickFromPool(
      category.poolTasks,
      category.pickCount,
      seed + category.id.length,
    ),
  ];
}

function CategoryCard({
  category,
  expanded,
  checkedIds,
  onToggle,
  onToggleExpanded,
}) {
  const tasks = getTasksForCategory(category);

  return (
    <div className='card'>
      <div
        className='card-header'
        onClick={() => onToggleExpanded(category.id)}
      >
        <h1>{category.label}</h1>
      </div>
      {expanded && (
        <ul>
          {tasks.map((task) => (
            <ChoreItem
              key={`${category.id}-${task.label}`}
              id={`${category.id}-${task.label}`}
              chore={task}
              checked={checkedIds.has(`${category.id}-${task.label}`)}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryCard;
