import LocalStorage from 'src/services/localStorage/LocalStorage';

import * as types from 'src/actions/types';
import {checkLetter, shuffleLetters, validateValue, createError} from './reducer.helper';
import * as errors from 'src/constants/errors';
import * as mods from 'src/constants/mods';
import CONFIG from 'src/config';
import IGameState from 'src/interfaces/IGameState';
import activateAiStepReducer from './ai/activateAiStepReducer';

const { initialState } = CONFIG;

export function game(state: IGameState = initialState, action: any) {
  switch (action.type) {
    case types.SET_WORD:
      {
        if (action.word.length < 3) {
          return {
            ...state,
            error: createError(errors.ERROR_0_ID, errors.ERROR_0_MSG)
          };
        }
        state = {
          ...state,
          error: undefined,
        };
        const user = {
          ...initialState.user,
          word: action
            .word
            .toUpperCase(),
        };

        const words = state
          .vocabulary
          .dictionary
          .filter(w => w.length === action.word.length);
        const wIndex = Math.floor(Math.random() * words.length);
        const aiWord = words[wIndex];
        const ai = {
          ...initialState.ai,
          word: aiWord,
        };

        return {
          ...state,
          user,
          ai,
          mode: mods.GAME
        };
      }

    case types.CHECK:
      {
        const value = action
          .value
          .toUpperCase();
        const error = validateValue(value, state.ai.word.length);
        if (error) {
          return {
            ...state,
            error
          };
        }
        state = {
          ...state,
          error: undefined,
        };
        if (value.length === 1) {
          const stats = checkLetter(state.ai, value);
          return {
            ...state,
            ai: stats
          };
        } else {
          // check word
          const win = state.ai.word === value;
          const mode = (win) ? mods.END : state.mode;

          return {
            ...state,
            user: {
              ...state.user,
              win
            },
            mode
          };
        }
      }

    case types.SHUFFLE:
      {
        state = {
          ...state,
          error: undefined,
        };
        const error = (state.ai.letters.length < 2)
          ? createError(errors.ERROR_3_ID, errors.ERROR_3_MSG)
          : undefined;
        const letters = (error) ? state.ai.letters : shuffleLetters(state.ai.letters);

        return {
          ...state,
          ai: {
            ...state.ai,
            letters,
          },
          error
        };
      }

    case types.ACTIVATE_AI_STEP:
      {
        return activateAiStepReducer(state);
      }

    case types.LOAD:
      {
        if (action.loadedState && action.loadedState.error) {
          const error = createError(errors.ERROR_4_ID, errors.ERROR_4_MSG);
          const mode = mods.START;

          return {
            ...initialState,
            error,
            mode
          };
        }

        return action.loadedState;
      }

    case types.SAVE:
      {
        LocalStorage.saveData('ai', state.ai);
        LocalStorage.saveData('user', state.user);
        LocalStorage.saveData('mode', state.mode);

        return state;
      }

    case types.RESTART:
      {
        return initialState;
      }

    default:
      return state;
  }
}
