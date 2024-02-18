import { Strategy } from "../strategy";
import { Player } from "../player";
import { Action } from "../action";
import { SkipTurnAction } from "../actions/skipTurnAction";

export class SelectActionInteractively implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  selectAction(_player: Player, actions: Action[]): Action {
    return actions?.[0] ?? new SkipTurnAction();
  }
}
