import { Action } from "../action";
import { Player } from "../player";
import { Strategy } from "../strategy";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { getRandomElement } from "../utils";

export abstract class SelectActionWithProperty implements Strategy {
  selectAction(_player: Player, actions: Action[]): Action {
    if (actions.length === 0) {
      return new SkipTurnAction();
    }
    let aggressiveActions = actions.filter(this.actionPredicate);

    return getRandomElement(
      aggressiveActions?.length ? aggressiveActions : actions,
    );
  }

  abstract actionPredicate(a: Action): boolean;

  get isInteractive(): boolean {
    return false;
  }
}
