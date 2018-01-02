import * as types from '../actions/types';

const initialState = {
  vocabulary: ['hello', 'dayly'],
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
  mode: 'start'
};

export function game(state = initialState, action) {
  switch (action.type) {
    case types.SET_WORD: {
      const user = { word: action.word, letters: [] };

      const wIndex = Math.floor(Math.random() * state.vocabulary.length);
      const aiWord = state.vocabulary[wIndex];
      const ai = { word: aiWord, letters: [] };

      return { ...state, user, ai, mode: 'game' };
    }

    case types.CHECK_LETTER_BY_USER: {
      const stats = checkLetter(state.ai, action.letter);
      return { ...state, ai: stats };
    }

    case types.CHECK_LETTER_BY_AI: {
      const stats = checkLetter(state.user, action.letter);
      return { ...state, user: stats };
    }

    case types.SHUFFLE_BY_USER: {
      const ls = shuffle(state.ai.letters);
      return { ...state, ai: { ...state.ai, letters: ls } };
    }

    case types.SHUFFLE_BY_AI: {
      const ls = shuffle(state.user.letters);
      return { ...state, user: { ...state.user, letters: ls } };
    }

    case types.CHECK_WORD_BY_USER: {
      const win = state.ai.word === action.word;
      const mode = win ? 'end' : state.mode;
      return { ...state, user: { ...state.user, win }, mode };
    }

    case types.CHECK_WORD_BY_AI: {
      const win = state.user.word === action.word;
      const mode = win ? 'end' : state.mode;
      return { ...state, ai: { ...state.ai, win }, mode };
    }
    default:
      return state;
  }
}

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
