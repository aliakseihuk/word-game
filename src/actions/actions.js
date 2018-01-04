import * as types from './types';

const setWord = word => {
  return {
    type: types.SET_WORD,
    word
  };
};

const checkLetter = letter => {
  return {
    type: types.CHECK_LETTER,
    letter
  };
};

const checkWord = word => {
  return {
    type: types.CHECK_WORD,
    word
  };
};

const shuffle = () => {
  return { type: types.SHUFFLE };
};

const activateAIStep = () => {
  return { type: types.ACTIVATE_AI_STEP };
};

export { setWord, checkLetter, checkWord, shuffle, activateAIStep };
