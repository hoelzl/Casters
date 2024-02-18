import { Action, ActionTag, registerDefaultActions } from "../action";
import { Player } from "../player";

export class ErrorAction implements Action {
  private static readonly _tags = new Set([
    ActionTag.Error,
    ActionTag.TestOnly,
    ActionTag.InteractiveOnly,
  ]);
  get description(): string {
    return "Throw an error for testing purposes.";
  }

  get tags(): Set<ActionTag> {
    return ErrorAction._tags;
  }

  perform(_player: Player): void {
    throw new Error("This is an error for testing purposes.");
  }
}

registerDefaultActions(new ErrorAction());
