import { Action, ActionTag, registerDefaultActions } from "../action";
import { Player } from "../player";

export class InvestigateAction implements Action {
  get description(): string {
    return "Investigate the current location.";
  }

  perform(player: Player): void {
    throw new Error("Not implemented.");
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Investigation, ActionTag.Aggressive]);
  }
}

registerDefaultActions(new InvestigateAction());
