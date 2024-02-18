import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class InvestigateAction implements Action {
  get description(): string {
    return "Investigate the current location.";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Investigation, ActionTag.Aggressive]);
  }

  async perform(_player: Player): Promise<void> {
    throw new Error("Not implemented.");
  }
}
