import * as actions from '../../actions';
import { game as reducer } from '../game';

describe('game reducer', () => {

  it('should return initial state', () => {
    const initialState = reducer(undefined, {});
    expect(initialState).toBeDefined();
  });

  it('should set word', () => {
    const word = 'test';
    const state = reducer(undefined, actions.setWord(word));
    expect(state.user).toEqual({ word, letters: []});
  });

  describe('should check letters', () => {
    
    const state = {
      user: {
        word: 'testu',
        letters: ['e']
      },
      ai: {
        word: 'testa',
        letters: ['e']
      }
    };

    it('by user', () => {
      
      let newState;
      let expectedai;
      const getState = (letter) => {
        const action = actions.checkLetterByUser(letter);
        return reducer(state, action);
      }
      
      newState = getState('u');
      expect(newState).toEqual({ ...state});

      newState = getState('e');
      expect(newState).toEqual({ ...state});

      newState = getState('a');
      expectedai = { ...state.ai, letters: [...state.ai.letters, 'a'] };
      expect(newState).toEqual({ ...state, ai: expectedai });

      newState = getState('t');
      expectedai = {...state.ai, letters: [...state.ai.letters, 't', 't'] };
      expect(newState).toEqual({ ...state, ai: expectedai });

    });
    
    it('by ai', () => {
      let newState;
      let expecteduser;

      const getState = (letter) => {
        const action = actions.checkLetterByAI(letter);
        return reducer(state, action);
      }
      
      newState = getState('a');
      expect(newState).toEqual({ ...state});

      newState = getState('e');
      expect(newState).toEqual({ ...state});

      newState = getState('u');
      expecteduser = { ...state.user, letters: [...state.ai.letters, 'u'] };
      expect(newState).toEqual({ ...state, user: expecteduser });

      newState = getState('t');
      expecteduser = {...state.user, letters: [...state.ai.letters, 't', 't'] };
      expect(newState).toEqual({ ...state, user: expecteduser });
    });
  });

  describe('should check words', () => {

    const state = {
      user: {
        word: 'testu'
      },
      ai: {
        word: 'testa'
      }
    };

    it('correct by user', () => {
      const newState = reducer(state, actions.checkWordByUser('testa'));
      expect(newState.user.win).toEqual(true);
    });

    it('invalid by user', () => {
      const newState = reducer(state, actions.checkWordByUser('testa'));
      expect(newState.user.win).toEqual(true);
    });

    it('correct by ai', () => {
      const newState = reducer(state, actions.checkWordByAI('test'));
      expect(newState.ai.win).toEqual(false);
    });

    it('invalid by ai', () => {
      const newState = reducer(state, actions.checkWordByUser('test'));
      expect(newState.user.win).toEqual(false);
    });
  });

  describe('should shuffle', () => {

    const state = {
      user: {
        word: 'testu',
        letters: ['t','t','e','s','u']
      },
      ai: {
        word: 'testa',
        letters: ['t','t','e','s','a']
      }
    };

    let unmockable;

    beforeEach(() => {
      unmockable = Math;
      const mock = Object.create(Math);
      let counter = 0;
      const values = [.5,.1,.7,.0,.9];
      mock.random = () => values[counter++ % values.length];
      Math = mock; // eslint-disable-line no-native-reassign
    });

    it('by user', () => {
      const newState = reducer(state, actions.shuffleByUser());
      expect(newState.ai.letters).toEqual(['t', 's', 'a', 't', 'e']);
    });

    it('by ai', () => {
      const newState = reducer(state, actions.shuffleByAI());
      expect(newState.user.letters).toEqual(['t', 's', 'u', 't', 'e']);
    });

    afterEach(() => {
      Math = unmockable; // eslint-disable-line no-native-reassign
    });
  });
});