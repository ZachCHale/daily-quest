function ChoreItem({ id, chore, checked, onToggle }) {
  return (
    <li onClick={() => onToggle(id)}>
      {checked ? '✅' : '⬜'} {chore.emoji} {chore.label}
    </li>
  );
}

export default ChoreItem;
