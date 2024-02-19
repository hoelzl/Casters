import { Strategy } from "../core/strategy";
import { Player } from "../core/player";
import { Action } from "../core/action";
import { SkipTurnAction } from "../actions/skipTurnAction";

export class SkipTurnStrategy implements Strategy {
  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    return Promise.resolve(new SkipTurnAction());
  }
}
