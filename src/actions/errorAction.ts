import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class ErrorAction implements Action {
  get description(): string {
    return "Throw an error for testing purposes.";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Error, ActionTag.TestOnly]);
  }

  perform(_player: Player): void {
    throw new Error("This is an error for testing purposes.");
  }
}
