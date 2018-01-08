import * as types from '../actions/types';
import {
  checkLetter,
  shuffle,
  validateValue,
  createError
} from './reducer.helper';
import * as constants from '../constants';

const initialState = {
  vocabulary: {
    language: 'en',
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    dictionary: [
      // make as set object
      'HELLO'
    ]
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
  mode: constants.START
};

export function game(state = initialState, action) {
  switch (action.type) {
    case types.SET_WORD: {
      const user = { word: action.word.toUpperCase(), letters: [] };

      const wIndex = Math.floor(
        Math.random() * state.vocabulary.dictionary.length
      );
      const aiWord = state.vocabulary.dictionary[wIndex];
      const ai = { word: aiWord, letters: [] };

      return { ...state, user, ai, mode: constants.GAME, error: undefined };
    }

    case types.CHECK: {
      const value = action.value.toUpperCase();
      const error = validateValue(value, state.ai.word.length);
      if (error) {
        return { ...state, error };
      }
      if (value.length === 1) {
        const stats = checkLetter(state.ai, value);
        return { ...state, ai: stats };
      } else {
        // check word
        const win = state.ai.word === value;
        const mode = win ? constants.END : state.mode;
        return {
          ...state,
          user: { ...state.user, win },
          mode,
          error: undefined
        };
      }
    }

    case types.SHUFFLE: {
      const error =
        state.ai.letters.length < 2
          ? createError(constants.ERROR_3_ID, constants.ERROR_3_MSG)
          : undefined;
      const ls = error ? state.ai.letters : shuffle(state.ai.letters);
      return { ...state, ai: { ...state.ai, letters: ls }, error };
    }

    case types.ACTIVATE_AI_STEP: {
      // todo: check if ai win after each ai action not
      if (state.user.word === state.user.letters.reduce((p, c) => p + c, ''))
        return {
          ...state,
          ai: { ...state.ai, win: true },
          mode: constants.END
        };

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

    case types.RESTART: {
      return initialState;
    }

    default:
      return state;
  }
}
