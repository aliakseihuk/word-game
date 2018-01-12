import * as errors from '../constants/errors';

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

const validateValue = (value, wordLength) => {
  if (value.length === 0) {
    return createError(errors.ERROR_1_ID, errors.ERROR_1_MSG);
  } else if (value.length > 1 && value.length < wordLength) {
    return createError(errors.ERROR_2_ID, errors.ERROR_2_MSG);
  }
  return undefined;
};

const createError = (id, message) => {
  return { id, message };
};

export { checkLetter, shuffle, validateValue, createError };
