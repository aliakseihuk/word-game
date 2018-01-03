import * as actions from '../../actions';
import { game as reducer } from '../game';

describe('game reducer', () => {
  it('should return initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toBeDefined();
  });

  it('should set word', () => {
    const word = 'TEST';
    const state = reducer(undefined, actions.setWord(word));
    expect(state.user).toEqual({ word, letters: [] });
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
    });

    it('invalid by user', () => {
      const newState = reducer(state, actions.checkWordByUser('TESTU'));
      expect(newState.user.win).toEqual(false);
    });

    it('correct by ai', () => {
      const newState = reducer(state, actions.checkWordByAI('TESTU'));
      expect(newState.ai.win).toEqual(true);
    });

    it('invalid by ai', () => {
      const newState = reducer(state, actions.checkWordByAI('TESTA'));
      expect(newState.ai.win).toEqual(false);
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
      const newState = reducer(state, actions.shuffleByUser());
      expect(newState.ai.letters).toEqual(['T', 'T', 'E', 'S', 'A']);
    });

    it('by ai', () => {
      const newState = reducer(state, actions.shuffleByAI());
      expect(newState.user.letters).toEqual(['T', 'S', 'U', 'T', 'E']);
    });

    afterEach(() => {
      Math = unmockable; // eslint-disable-line no-native-reassign
    });
  });
});
