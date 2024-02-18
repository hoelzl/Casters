import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class QuitGameException extends Error {
  constructor(public message: string = "Game quit by player.") {
    super(message);
  }
}

export class QuitAction implements Action {
  get description(): string {
    return "Quit the game.";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Quit]);
  }

  perform(_player: Player): void {
    throw new QuitGameException();
  }
}
