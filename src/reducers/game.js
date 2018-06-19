import LocalStorage from '../localStorage/LocalStorage';

import * as types from '../actions/types';
import {
  checkLetter,
  shuffle,
  validateValue,
  createError
} from './reducer.helper';
import * as errors from '../constants/errors';
import * as mods from '../constants/mods';

import enWords from '../data/en-vocabulary.json';

const initialState = {
  vocabulary: {
    language: 'en',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    dictionary: enWords
  },
  user: {
    word: '',
    letters: [],
    win: false
  },
  ai: {
    word: '',
    letters: [],
    win: false
  },
  mode: mods.START
};

export function game(state = initialState, action) {
  switch (action.type) {
    case types.SET_WORD: {
      if (action.word.length < 3) {
        return {
          ...state,
          error: createError(errors.ERROR_0_ID, errors.ERROR_0_MSG)
        };
      }
      state = { ...state, error: undefined };
      const user = { word: action.word.toUpperCase(), letters: [] };

      const words = state.vocabulary.dictionary.filter(
        w => w.length === action.word.length
      );
      const wIndex = Math.floor(Math.random() * words.length);
      const aiWord = words[wIndex];
      const ai = { word: aiWord, letters: [] };

      return { ...state, user, ai, mode: mods.GAME };
    }

    case types.CHECK: {
      const value = action.value.toUpperCase();
      const error = validateValue(value, state.ai.word.length);
      if (error) {
        return { ...state, error };
      }
      state = { ...state, error: undefined };
      if (value.length === 1) {
        const stats = checkLetter(state.ai, value);
        return { ...state, ai: stats };
      } else {
        // check word
        const win = state.ai.word === value;
        const mode = win ? mods.END : state.mode;
        return {
          ...state,
          user: { ...state.user, win },
          mode
        };
      }
    }

    case types.SHUFFLE: {
      state = { ...state, error: undefined };
      const error =
        state.ai.letters.length < 2
          ? createError(errors.ERROR_3_ID, errors.ERROR_3_MSG)
          : undefined;
      const ls = error ? state.ai.letters : shuffle(state.ai.letters);
      return { ...state, ai: { ...state.ai, letters: ls }, error };
    }

    case types.ACTIVATE_AI_STEP: {
      // todo: check if ai win after each ai action not
      if (state.user.word === state.user.letters.reduce((p, c) => p + c, '')) {
        return {
          ...state,
          ai: { ...state.ai, win: true },
          mode: mods.END
        };
      }

      if (state.user.letters.length === state.user.word.length) {
        // shuffle letters if ai can't find
        const ls = shuffle(state.user.letters);
        return { ...state, user: { ...state.user, letters: ls } };
      } else {
        const alphabet = state.vocabulary.alphabet;
        const letter = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        const stats = checkLetter(state.user, letter);
        return { ...state, user: stats };
      }
    }

    case types.LOAD: {
      if (action.value.error) {
        const error = createError(errors.ERROR_4_ID, errors.ERROR_4_MSG);
        const mode = mods.START;

        return { ...initialState, error, mode };
      }

      return action.value;
    }

    case types.SAVE: {
      LocalStorage.saveData('ai', state.ai);
      LocalStorage.saveData('user', state.user);
      LocalStorage.saveData('mode', state.mode);

      return state;
    }

    case types.RESTART: {
      return initialState;
    }

    default:
      return state;
  }
}
