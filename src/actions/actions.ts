import LocalStorage from 'src/services/localStorage/LocalStorage';
import * as types from './types';
import { ILoadedState, IUser, IAi } from 'src/interfaces';
import { GAME_MODES } from 'src/constants';

const setWord = (word: unknown) => {
  return {
    type: types.SET_WORD,
    word
  };
};

const check = (value: unknown) => {
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
  return { type: types.SET_WORD };
};

const load = () => {
  let loadedState: ILoadedState = {
    error: false,
  };

  if (!LocalStorage.isEmpty()) {
    const ai = LocalStorage.readData<IAi>('ai');
    const user = LocalStorage.readData<IUser>('user');
    const mode = LocalStorage.readData<GAME_MODES>('mode');

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
