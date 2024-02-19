import select from "@inquirer/select";
import { Action } from "casters_core/core/action";
import { Player } from "casters_core/core/player";
import { Strategy } from "casters_core/core/strategy";

// noinspection JSUnusedGlobalSymbols
export class SelectActionInteractively implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  async selectAction(_player: Player, actions: Action[]): Promise<Action> {
    return this.pickAction(actions);
  }

  async pickAction(actions: Action[]): Promise<Action> {
    const choices = actions.map((a) => ({
      name: a.shortDescription,
      value: a,
      description: a.description,
    }));
    return select({
      message: "Choose an action",
      choices: choices,
    });
  }
}
