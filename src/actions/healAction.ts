import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class HealAction implements Action {
  private static readonly _tags = new Set([ActionTag.Helpful]);

  get description(): string {
    return "Heal yourself or another player.";
  }

  get shortDescription(): string {
    return "Heal";
  }

  get tags(): Set<ActionTag> {
    return HealAction._tags;
  }

  async perform(_player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
