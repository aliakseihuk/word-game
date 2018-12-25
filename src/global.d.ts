import { IGame } from "src/interfaces";

declare global {
    export type Callback = (...args: any[]) => any;
    export type GameState = {
        game: IGame,
    };
}

