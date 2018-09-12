import { push } from 'react-router-redux';
import * as actions from './actions';

const restart = actions.restart;

// TODO: define disathch and state-related interfaces
const isWin = (state: any) => {
  return state.game.user.win || state.game.ai.win;
};

const check = (value: any) => {
  return (dispatch: any, getState: Callback) => {
    dispatch(actions.check(value));
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
      dispatch(actions.activateAIStep());
    }
    if (isWin(getState())) {
      dispatch(push('/end'));
    }
  };
};

const shuffle = () => {
  return (dispatch: Callback, getState: Callback) => {
    dispatch(actions.shuffle());
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
      dispatch(actions.activateAIStep());
    }
    if (isWin(getState())) {
      dispatch(push('/end'));
    }
  };
};

const setWord = (word: string) => {
  return (dispatch: Callback, getState: Callback) => {
    dispatch(actions.setWord(word));
    dispatch(push('/game'));
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
    }
  };
};

export { setWord, restart, check, shuffle };
