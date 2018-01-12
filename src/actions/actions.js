import * as types from './types';

const setWord = word => {
  return {
    type: types.SET_WORD,
    word
  };
};

const check = value => {
  return {
    type: types.CHECK,
    value
  };
};

const shuffle = () => {
  return { type: types.SHUFFLE };
};

const activateAIStep = () => {
  return { type: types.ACTIVATE_AI_STEP };
};

const restart = () => {
  return { type: types.RESTART };
};

export { setWord, check, shuffle, activateAIStep, restart };
