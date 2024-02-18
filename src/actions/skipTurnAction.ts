import { Action, ActionTag, registerDefaultActions } from "../action";
import { Player } from "../player";

export class SkipTurnAction implements Action {
  get description(): string {
    return "Skip the turn.";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.SkipTurn]);
  }

  perform(_player: Player): void {
    // Do nothing.
  }
}

// Register this action type with the system
registerDefaultActions(new SkipTurnAction());