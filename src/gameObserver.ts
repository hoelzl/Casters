import {Result} from "./result.js";
import {Game} from "./game.js";
import {PlayerObserver} from "./playerObserver.js";

export enum GameOverReason {
    PlayerWon,
    PlayerDied,
    Quit,
    Error,
    TurnLimitReached,
}

export interface GameObserver extends PlayerObserver{
    noteGameStarted(game: Game): void;
    noteGameOver(game: Game, reason: GameOverReason): void;
    noteResult(game: Game, result: Result): void;
    noteException(game: Game, msg: string): void;
}