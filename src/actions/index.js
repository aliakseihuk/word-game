import * as types from './types';

const setWord = word => {
  return {
    type: types.SET_WORD,
    word
  };
};

const checkLetterByUser = letter => {
  return {
    type: types.CHECK_LETTER_BY_USER,
    letter
  };
};

const checkWordByUser = word => {
  return {
    type: types.CHECK_WORD_BY_USER,
    word
  };
};

const shuffleByUser = () => {
  return { type: types.SHUFFLE_BY_USER };
};

// const activateAIStep = () => { return {type: types.ACTIVATE_AI_STEP}; }

const checkLetterByAI = letter => {
  return {
    type: types.CHECK_LETTER_BY_AI,
    letter
  };
};

const checkWordByAI = word => {
  return {
    type: types.CHECK_WORD_BY_AI,
    word
  };
};

const shuffleByAI = () => {
  return { type: types.SHUFFLE_BY_AI };
};

export {
  setWord,
  checkLetterByUser,
  checkWordByUser,
  shuffleByUser,
  checkLetterByAI,
  checkWordByAI,
  shuffleByAI
};
