import { push } from 'react-router-redux';
import * as actions from './actions';

const setWord = word => {
  return dispatch => {
    dispatch(actions.setWord(word));
    dispatch(push('/game'));
  };
};
const restart = actions.restart;

const isWin = state => {
  return state.game.user.win || state.game.ai.win;
};

const check = value => {
  return (dispatch, getState) => {
    dispatch(actions.check(value));
    if (!getState().game.error) {
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
    if (!getState().game.error) {
      dispatch(actions.activateAIStep());
    }
  };
};

export { setWord, restart, check, shuffle };