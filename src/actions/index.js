import * as actions from './actions';

const setWord = actions.setWord;

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
    dispatch(actions.shuffle);
    dispatch(actions.activateAIStep());
  };
};

export { setWord, checkLetter, checkWord, shuffle };
