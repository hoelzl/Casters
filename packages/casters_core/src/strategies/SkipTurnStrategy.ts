import { Strategy } from "../core/Strategy";
import { Player } from "../core/Player";
import { Action } from "../core/Action";
import { SkipTurnAction } from "../actions/SkipTurnAction";

export class SkipTurnStrategy implements Strategy {
  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    return Promise.resolve(new SkipTurnAction());
  }
}
