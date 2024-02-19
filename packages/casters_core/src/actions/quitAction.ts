import { Action, ActionTag } from "../core/action";
import { Player } from "../core/player";

export class QuitGameException extends Error {
  constructor(public message: string = "Game quit by player.") {
    super(message);
  }
}

export class QuitAction implements Action {
  get description(): string {
    return "Quit the game.";
  }

  get shortDescription(): string {
    return "Quit";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Quit, ActionTag.InteractiveOnly]);
  }

  async perform(_player: Player): Promise<void> {
    throw new QuitGameException();
  }
}
