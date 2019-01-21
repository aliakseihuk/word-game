import IGameState from "src/interfaces/IGameState";
import { LANG_CODES, GAME_MODES } from "src/constants";
import enWords from 'src/data/en-vocabulary.json';


const DEFAULT_WORD = 'WORD';
const initialState: IGameState = {
    vocabulary: {
      language: LANG_CODES.EN,
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      dictionary: enWords
    },
    user: {
      word: '',
      letters: [],
      win: false
    },
    ai: {
      word: '',
      letters: [],
      win: false
    },
    mode: GAME_MODES.START,
    error: undefined
  };

const CONFIG = {
    DEFAULT_WORD,
    initialState,
};

export default CONFIG;
