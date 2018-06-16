import { push } from 'react-router-redux';
import * as actions from './actions';

const restart = actions.restart;

const isWin = state => {
  return state.game.user.win || state.game.ai.win;
};

const check = value => {
  return (dispatch, getState) => {
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
  return (dispatch, getState) => {
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

const setWord = word => {
  return (dispatch, getState) => {
    dispatch(actions.setWord(word));
    dispatch(push('/game'));
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
    }
  };
};

export { setWord, restart, check, shuffle };
