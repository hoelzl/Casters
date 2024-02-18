import { Result } from "./result";
import { Game } from "./game";
import { PlayerObserver } from "./playerObserver";

// noinspection JSUnusedGlobalSymbols
export enum GameOverReason {
  PlayerWon,
  PlayerDied,
  Quit,
  Error,
  TurnLimitReached,
}

export interface GameObserver extends PlayerObserver {
  noteGameStarted(game: Game): void;
  noteGameOver(game: Game, reason: GameOverReason): void;
  noteResult(game: Game, result: Result): void;
  noteException(game: Game, msg: string): void;
}
