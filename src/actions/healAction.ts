import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class HealAction implements Action {
  private static readonly _tags = new Set([ActionTag.Helpful]);

  get description(): string {
    return "Heal yourself or another player.";
  }

  get tags(): Set<ActionTag> {
    return HealAction._tags;
  }

  perform(player: Player): void {
    throw new Error("Method not implemented.");
  }
}
