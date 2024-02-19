import { Action, ActionTag } from "../core/Action";
import { Player } from "../core/Player";

export class InvestigateAction implements Action {
  get description(): string {
    return "Investigate the current location.";
  }

  get shortDescription(): string {
    return "Investigate";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Investigation, ActionTag.Aggressive]);
  }

  async perform(_player: Player): Promise<void> {
    throw new Error("Not implemented.");
  }
}
