// todo: rename stats
const checkLetter = (stats, letter) => {
  const letters = [...stats.letters];
  if (letters.every(l => l !== letter)) {
    // check is it a new letter
    for (const l of stats.word) {
      if (l === letter) {
        letters.push(letter);
      }
    }
  }
  return { ...stats, letters };
};

const shuffle = letters => {
  const ls = [...letters];
  for (let i = ls.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [ls[i], ls[j]] = [ls[j], ls[i]];
  }
  return ls;
};

export { checkLetter, shuffle };
