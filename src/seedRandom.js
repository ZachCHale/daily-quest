export function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function pickFromPool(pool, count, seed) {
  const available = [...pool];
  const picked = [];

  for (let i = 0; i < Math.min(count, available.length); i++) {
    const index = Math.floor(seededRandom(seed + i) * available.length);
    picked.push(available.splice(index, 1)[0]);
  }

  return picked;
}

export function dateSeed() {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}
