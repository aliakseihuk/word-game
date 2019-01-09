import { IUser } from "src/interfaces/IUser";
import { IAi } from "src/interfaces/IAI";

export interface IGame {
    user: IUser,
    ai: IAi,
    error: Error,
}
