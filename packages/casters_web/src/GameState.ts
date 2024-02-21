import { MoveAction } from "casters_core/actions/MoveAction";
import { Action, ActionTag } from "casters_core/core/Action";
import { Game } from "casters_core/core/Game";
import {
  GameObserverBase,
  GameOverReason,
} from "casters_core/core/GameObserver";
import { Location } from "casters_core/core/Location";
import { Player } from "casters_core/core/Player";

export type GameState = {
  currentLocation: Location;
  availableActions: Action[];
  notifications: string[];
};

export function movementActions(GameState: GameState) {
  return GameState.availableActions.filter((action) =>
    action.tags.has(ActionTag.Movement),
  ) as MoveAction[];
}

export function nonMovementActions(GameState: GameState) {
  return GameState.availableActions.filter(
    (action) => !action.tags.has(ActionTag.Movement),
  );
}

export class UpdateStateObserver extends GameObserverBase {
  constructor(state: GameState) {
    super();
    this.state = { ...state };
    this.onStateChange = () => {};
  }

  noteGameOver(_game: Game, _reason: GameOverReason) {
    this.state.availableActions = [];
    this.onStateChange();
  }

  notePossibleActions(_player: Player, actions: Action[]) {
    this.state.availableActions = this.removeQuitAction(actions);
    this.onStateChange();
  }

  noteStartingAction(_player: Player, _action: Action) {
    this.state.currentLocation = _player.location;
    this.onStateChange();
  }

  noteTurnStarted(_player: Player) {
    this.state.availableActions = [];
    this.state.currentLocation = _player.location;
    this.onStateChange();
  }

  private removeQuitAction(actions: Action[]): Action[] {
    return actions.filter((action) => !action.tags.has(ActionTag.Quit));
  }

  state: GameState;
  onStateChange: () => void;
}
