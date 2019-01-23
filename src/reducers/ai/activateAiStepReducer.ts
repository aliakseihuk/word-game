import IGameState from "src/interfaces/IGameState";
import { GAME_MODES } from "src/constants";
import { shuffleLetters, checkLetter } from "../reducer.helper";
import { pickLetter } from "./ai.reducer.helper";

const activateAiStepReducer = (state: IGameState) => {
 // todo: check if ai win after each ai action not
 if (state.user.word === state.user.letters.reduce((p, c) => p + c, '')) {
    return {
      ...state,
      ai: {
        ...state.ai,
        win: true,
      },
      mode: GAME_MODES.END,
    };
  }

  if (state.user.letters.length === state.user.word.length) {
    // shuffle letters if ai can't find one
    const letters = shuffleLetters(state.user.letters);

    return {
      ...state,
      user: {
        ...state.user,
        letters,
      }
    };
  } else {
    const letter = pickLetter(state.user.checkedLetters);
    const user = checkLetter(state.user, letter);
    if (user.checkedLetters) {
      user.checkedLetters.push(letter);
    }
   
    
    return {
      ...state,
      user,
    };
  }
}

export default activateAiStepReducer;
