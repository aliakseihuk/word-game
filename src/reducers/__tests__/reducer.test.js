import * as actions from '../../actions';
import * as types from '../../actions/types';
import { game as reducer } from '../game';
import * as reducerHelper from '../reducer.helper';

describe('game reducer', () => {
  it('should return initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toBeDefined();
  });

  it('should set word', () => {
    const word = 'TEST';
    const state = reducer(undefined, actions.setWord(word));
    expect(state.user).toEqual({ word, letters: [] });
    expect(state.mode).toEqual('game');
  });

  describe('should check letters', () => {
    const state = {
      user: {
        word: 'TESTU',
        letters: ['E']
      },
      ai: {
        word: 'TESTA',
        letters: ['E']
      }
    };

    it('by user', () => {
      let newState;
      let expectedai;
      const getState = letter => {
        const action = actions.checkLetterByUser(letter);
        return reducer(state, action);
      };

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

    it('by ai', () => {
      let newState;
      let expecteduser;

      const getState = letter => {
        const action = actions.checkLetterByAI(letter);
        return reducer(state, action);
      };

      newState = getState('a');
      expect(newState).toEqual({ ...state });

      newState = getState('e');
      expect(newState).toEqual({ ...state });

      newState = getState('u');
      expecteduser = { ...state.user, letters: [...state.ai.letters, 'U'] };
      expect(newState).toEqual({ ...state, user: expecteduser });

      newState = getState('t');
      expecteduser = {
        ...state.user,
        letters: [...state.ai.letters, 'T', 'T']
      };
      expect(newState).toEqual({ ...state, user: expecteduser });
    });
  });

  describe('should check words', () => {
    const state = {
      user: {
        word: 'TESTU'
      },
      ai: {
        word: 'TESTA'
      }
    };

    it('correct by user', () => {
      const newState = reducer(state, actions.checkWordByUser('TESTA'));
      expect(newState.user.win).toEqual(true);
      expect(newState.mode).toEqual('end');
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

    it('by user', () => {
      const newState = reducer(state, { type: types.SHUFFLE_BY_USER });
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
      expect(newState.mode).toEqual('end');
    });
  });
});
