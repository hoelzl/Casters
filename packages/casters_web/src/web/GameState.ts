import { Action } from "casters_core/core/action";
import { Game } from "casters_core/core/game";
import { Location } from "casters_core/core/location";
import {
  GameObserverBase,
  GameOverReason,
} from "casters_core/core/gameObserver";
import { Player } from "casters_core/core/player";

export type GameState = {
  currentLocation: Location;
  availableActions: Action[];
};

export class UpdateStateObserver extends GameObserverBase {
  constructor(state: GameState) {
    super();
    this.state = state;
    this.onStateChange = () => {};
  }

  noteGameOver(_game: Game, _reason: GameOverReason) {
    this.state.availableActions = [];
    this.onStateChange();
  }

  notePossibleActions(_player: Player, actions: Action[]) {
    this.state.availableActions = actions;
    this.onStateChange();
  }

  noteStartingAction(_player: Player, _action: Action) {
    this.state.currentLocation = _player.location;
    this.onStateChange();
  }

  noteTurnStarted(_player: Player) {
    this.state.availableActions = [];
    this.onStateChange();
  }

  state: GameState;
  onStateChange: () => void;
}
