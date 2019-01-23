import { IUser } from "./IUser";
import { GAME_MODES, LANG_CODES } from "src/constants";

type GameVocabulary = {
    language: LANG_CODES,
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    dictionary: string[],
}

interface IGameState {
    vocabulary: GameVocabulary,
    user: IUser,
    ai: IUser,
    mode: GAME_MODES,
    error?: Error,
}

export default IGameState;
