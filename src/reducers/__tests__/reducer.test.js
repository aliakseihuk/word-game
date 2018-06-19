import * as actions from '../../actions/actions';
import * as types from '../../actions/types';
import { game as reducer } from '../game';
import * as reducerHelper from '../reducer.helper';
import * as mods from '../../constants/mods';
import * as errors from '../../constants/errors';
import { createError } from '../reducer.helper';

describe('game reducer', () => {
  it('should return initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toBeDefined();
  });

  it('should set word', () => {
    const word = 'TEST';
    const state = reducer(undefined, actions.setWord(word));
    expect(state.user).toEqual({ word, letters: [] });
    expect(state.mode).toEqual(mods.GAME);
  });

  it('should return error with short words', () => {
    let word;
    let state;
    const error = createError(errors.ERROR_0_ID, errors.ERROR_0_MSG);
    word = '';
    state = reducer(undefined, actions.setWord(word));
    expect(state.error).toEqual(error);
    word = 'W';
    state = reducer(undefined, actions.setWord(word));
    expect(state.error).toEqual(error);
    word = 'WW';
    state = reducer(undefined, actions.setWord(word));
    expect(state.error).toEqual(error);
    word = 'WWW';
    state = reducer(undefined, actions.setWord(word));
    expect(state.error).not.toBeDefined();
  });

  describe('should check', () => {
    const state = {
      user: {
        word: 'TESTU',
        letters: ['E'],
        win: false
      },
      ai: {
        word: 'TESTA',
        letters: ['E'],
        win: false
      }
    };

    const getState = value => {
      return reducer(state, actions.check(value));
    };

    it('with empty entry error', () => {
      const errorState = getState('');
      const error = reducerHelper.createError(
        errors.ERROR_1_ID,
        errors.ERROR_1_MSG
      );
      expect(errorState.error).toEqual(error);
    });

    it('with wrong length error', () => {
      const errorState = getState('TEST');
      const error = reducerHelper.createError(
        errors.ERROR_2_ID,
        errors.ERROR_2_MSG
      );
      expect(errorState.error).toEqual(error);
    });

    it('valid letter', () => {
      let newState;
      let expectedai;

      newState = getState('U');
      expect(newState).toEqual({ ...state });

      newState = getState('E');
      expect(newState).toEqual({ ...state });

      newState = getState('A');
      expectedai = { ...state.ai, letters: [...state.ai.letters, 'A'] };
      expect(newState).toEqual({ ...state, ai: expectedai });

      newState = getState('T');
      expectedai = { ...state.ai, letters: [...state.ai.letters, 'T', 'T'] };
      expect(newState).toEqual({ ...state, ai: expectedai });
    });

    it('wrong word', () => {
      const newState = reducer(state, actions.check('TESTU'));
      expect(newState.user.win).toEqual(false);
    });

    it('valid word', () => {
      const newState = reducer(state, actions.check('TESTA'));
      expect(newState.user.win).toEqual(true);
      expect(newState.mode).toEqual(mods.END);
    });
  });

  describe('should shuffle', () => {
    const state = {
      user: {
        word: 'TESTU',
        letters: ['T', 'T', 'E', 'S', 'U']
      },
      ai: {
        word: 'TESTA',
        letters: ['T', 'T', 'E', 'S', 'A']
      }
    };

    let unmockable;

    beforeEach(() => {
      unmockable = Math;
      const mock = Object.create(Math);
      let counter = 0;
      const values = [0.5, 0.1, 0.7, 0.0, 0.9];
      mock.random = () => values[counter++ % values.length];
      Math = mock; // eslint-disable-line no-native-reassign
    });

    it('with error empty or one letter', () => {
      const newState = reducer({ ai: { letters: [] } }, actions.shuffle());
      const error = reducerHelper.createError(
        errors.ERROR_3_ID,
        errors.ERROR_3_MSG
      );
      expect(newState.error).toEqual(error);

      reducer({ ai: { letters: ['A'] } }, actions.shuffle());
      expect(newState.error).toEqual(error);
    });

    it('letters', () => {
      const newState = reducer(state, { type: types.SHUFFLE });
      expect(newState.ai.letters).toEqual(['T', 'S', 'A', 'T', 'E']);
    });

    afterEach(() => {
      Math = unmockable; // eslint-disable-line no-native-reassign
    });
  });

  describe('should automate ai step', () => {
    it("check letter if ai doesn't know all letters", () => {
      const state = {
        vocabulary: {
          alphabet: 'ABC'
        },
        user: {
          word: 'TESTU',
          letters: ['T', 'T', 'E', 'S']
        }
      };

      reducerHelper.checkLetter = jest.fn();
      reducer(state, { type: types.ACTIVATE_AI_STEP });
      expect(reducerHelper.checkLetter).toBeCalled();
    });

    it("shuffle if ai don't recognize word", () => {
      const state = {
        vocabulary: {
          alphabet: 'ABC'
        },
        user: {
          word: 'TESTU',
          letters: ['T', 'T', 'E', 'S', 'U']
        }
      };

      reducerHelper.shuffle = jest.fn();
      reducer(state, { type: types.ACTIVATE_AI_STEP });
      expect(reducerHelper.shuffle).toBeCalled();
    });

    it('win if ai recognizes word', () => {
      const state = {
        vocabulary: {
          alphabet: 'ABC'
        },
        user: {
          word: 'TESTU',
          letters: ['T', 'E', 'S', 'T', 'U']
        },
        ai: {
          win: false
        }
      };

      const newState = reducer(state, { type: types.ACTIVATE_AI_STEP });
      expect(newState.ai.win).toEqual(true);
      expect(newState.mode).toEqual(mods.END);
    });
  });

  it('should restart', () => {
    const someState = {
      user: {},
      ai: {},
      mode: mods.GAME
    };

    const initialState = reducer(undefined, {});
    const newState = reducer(someState, actions.restart());
    expect(newState).toEqual(initialState);
  });
});
