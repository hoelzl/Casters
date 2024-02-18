import select from "@inquirer/select";
import { Action } from "../action";
import { Player } from "../player";
import { Strategy } from "../strategy";

// noinspection JSUnusedGlobalSymbols
export class SelectActionInteractively implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  async selectAction(player: Player, actions: Action[]): Promise<Action> {
    return await this.pickAction(actions);
  }

  async pickAction(actions: Action[]): Promise<Action> {
    const choices = actions.map((a) => ({
      name: a.description,
      value: a,
    }));
    return select({
      message: "Choose an action",
      choices: choices,
    });
  }
}
