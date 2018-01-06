import * as actions from './actions';

const setWord = actions.setWord;
const restart = actions.restart;

const checkLetter = letter => {
  return dispatch => {
    dispatch(actions.checkLetter(letter));
    dispatch(actions.activateAIStep());
  };
};

const checkWord = word => {
  return dispatch => {
    dispatch(actions.checkWord(word));
    dispatch(actions.activateAIStep());
  };
};

const shuffle = () => {
  return dispatch => {
    dispatch(actions.shuffle());
    dispatch(actions.activateAIStep());
  };
};

export { setWord, restart, checkLetter, checkWord, shuffle };
