const STORAGE_KEY = 'daily-quest';

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  const { date, checkedIds } = JSON.parse(saved);
  const today = new Date().toLocaleDateString();

  if (date !== today) return null;

  return new Set(checkedIds);
}

export function saveState(checkedIds) {
  const state = {
    date: new Date().toLocaleDateString(),
    checkedIds: [...checkedIds],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const INVENTORY_KEY = 'daily-quest:inventory';

export function loadInventory() {
  const saved = localStorage.getItem(INVENTORY_KEY);
  if (!saved) return {};
  return JSON.parse(saved);
}

export function saveInventory(inventory) {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}
