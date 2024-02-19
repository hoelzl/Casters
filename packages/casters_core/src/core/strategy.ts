import { Action } from "./action";
import { Player } from "./player";

export interface Strategy {
  selectAction(player: Player, actions: Action[]): Promise<Action>;
  get isInteractive(): boolean;
}
