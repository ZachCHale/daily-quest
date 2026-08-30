const STORAGE_KEY = 'daily-quest';
const THEME_KEY = 'daily-quest:theme';
const PURCHASES_KEY = 'daily-quest:purchases';

export function loadState(profileId) {
  const saved = localStorage.getItem(`${STORAGE_KEY}:${profileId}`);
  if (!saved) return null;
  const { date, checkedIds } = JSON.parse(saved);
  const today = new Date().toLocaleDateString();
  if (date !== today) return null;
  return new Set(checkedIds);
}

export function saveState(checkedIds, profileId) {
  const state = {
    date: new Date().toLocaleDateString(),
    checkedIds: [...checkedIds],
  };
  localStorage.setItem(`${STORAGE_KEY}:${profileId}`, JSON.stringify(state));
}

const INVENTORY_KEY = 'daily-quest:inventory';

export function loadInventory(profileId) {
  const saved = localStorage.getItem(`${INVENTORY_KEY}:${profileId}`);
  if (!saved) return {};
  return JSON.parse(saved);
}

export function saveInventory(inventory, profileId) {
  localStorage.setItem(
    `${INVENTORY_KEY}:${profileId}`,
    JSON.stringify(inventory),
  );
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY);
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadPurchases(profileId) {
  const saved = localStorage.getItem(`${PURCHASES_KEY}:${profileId}`);
  if (!saved) return [];
  return JSON.parse(saved);
}

export function savePurchases(purchases, profileId) {
  localStorage.setItem(
    `${PURCHASES_KEY}:${profileId}`,
    JSON.stringify(purchases),
  );
}

import { DEFAULT_PROFILE } from './data/profiles';

const PROFILES_KEY = 'daily-quest:profiles';

export function loadProfiles() {
  const saved = localStorage.getItem(PROFILES_KEY);
  const profiles = saved ? JSON.parse(saved) : [DEFAULT_PROFILE];

  // TEMPORARY: test profile for development
  if (!profiles.find((p) => p.id === 'test-profile')) {
    profiles.push({
      id: 'test-profile',
      label: 'Test Profile',
      editable: true,
    });
  }

  saveProfiles(profiles);
  return profiles;
}

export function saveProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}
