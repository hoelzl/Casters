import { Action, ActionTag } from "../core/action";
import { Player } from "../core/player";

export class SkipTurnAction implements Action {
  get description(): string {
    return "Do nothing during the current turn.";
  }

  get shortDescription(): string {
    return "Skip Turn";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.SkipTurn]);
  }

  async perform(_player: Player): Promise<void> {
    // Do nothing.
  }
}
