import * as actions from './actions';

const setWord = actions.setWord;
const restart = actions.restart;

const check = value => {
  return (dispatch, getState) => {
    dispatch(actions.check(value));
    const state = getState();
    if (!state.error) {
      dispatch(actions.activateAIStep());
    }
  };
};

const shuffle = () => {
  return (dispatch, getState) => {
    dispatch(actions.shuffle());
    const state = getState();
    if (!state.error) {
      dispatch(actions.activateAIStep());
    }
  };
};

export { setWord, restart, check, shuffle };
