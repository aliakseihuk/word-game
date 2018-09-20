import { IUser } from "./IUser";
import { IAi } from "./IAI";
import { GAME_MODES } from "../constants/gamemodes";

export interface ILoadedState {
    error: boolean;
    user?: IUser;
    ai?: IAi;
    mode?: GAME_MODES;
}
