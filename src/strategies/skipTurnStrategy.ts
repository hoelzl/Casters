import { Strategy } from "../strategy";
import { Player } from "../player";
import { Action } from "../action";
import { SkipTurnAction } from "../actions/skipTurnAction";

export class SkipTurnStrategy implements Strategy {
  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, _actions: Action[]): Action {
    return new SkipTurnAction();
  }
}
