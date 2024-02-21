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

  async perform(player: Player): Promise<void> {
    console.log("InvestigateAction.perform()");
    let msg = "You investigate the area.\n";
    const items = player.location.items;
    if (items.length === 0) {
      msg += "\nYou find nothing of interest.";
    } else {
      for (let item of items) {
        msg += `\n- You find a ${item.name}.`;
      }
    }
    player.notify(msg);
  }
}
