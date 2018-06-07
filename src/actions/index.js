import * as actions from './actions';

const restart = actions.restart;

const check = value => {
  return (dispatch, getState) => {
    dispatch(actions.check(value));
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
      dispatch(actions.activateAIStep());
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
  };
};

const setWord = word => {
  return (dispatch, getState) => {
    dispatch(actions.setWord(word));
    const state = getState();
    if (!state.error) {
      dispatch(actions.save());
    }
  };
};

export { setWord, restart, check, shuffle };
