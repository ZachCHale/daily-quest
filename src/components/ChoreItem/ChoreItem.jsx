import './ChoreItem.css';

function ChoreItem({ id, chore, checked, onToggle }) {
  return (
    <li
      className={`chore-item ${checked ? 'checked' : ''}`}
      onClick={() => onToggle(id)}
    >
      <span className='checkbox' />
      <span className='chore-label'>
        {chore.emoji} {chore.label}
      </span>
    </li>
  );
}

export default ChoreItem;
