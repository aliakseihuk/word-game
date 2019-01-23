import * as errors from '../constants/errors';
import { IUser } from 'src/interfaces';

// todo: rename stats
const checkLetter = (user: IUser, letter: string) => {
  const letters = [...user.letters];

  if (letters.every(l => l !== letter)) {
    // check is it a new letter
    for (const l of user.word) {
      if (l === letter) {
        letters.push(letter);
      }
    }
  }
  return { ...user, letters };
};

const shuffleLetters = (letters: string[]) => {
  const ls = [...letters];

  for (let i = ls.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [ls[i], ls[j]] = [ls[j], ls[i]];
  }
  return ls;
};

const validateValue = (value: string, wordLength: number) => {
  if (value.length === 0) {
    return createError(errors.ERROR_1_ID, errors.ERROR_1_MSG);
  } else if (value.length > 1 && value.length < wordLength) {
    return createError(errors.ERROR_2_ID, errors.ERROR_2_MSG);
  }
  return undefined;
};

const createError = (id: number, message: string) => {
  return { id, message };
};

export { checkLetter, shuffleLetters, validateValue, createError };
