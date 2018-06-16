import LocalStorage from '../localStorage/LocalStorage';
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

const load = () => {
  let loadedState = {
    error: undefined
  };

  if (!LocalStorage.isEmpty()) {
    const ai = LocalStorage.readData('ai');
    const user = LocalStorage.readData('user');
    const mode = LocalStorage.readData('mode');

    loadedState = { ...loadedState, user, ai, mode };
  } else {
    loadedState.error = true;
  }

  return { type: types.LOAD, loadedState };
};

const save = () => {
  return { type: types.SAVE };
};

export { setWord, check, shuffle, activateAIStep, restart, load, save };
