import { Action, ActionTag } from "../action";
import { Player } from "../player";

export class MoveAction implements Action {
  constructor(public direction: string) {
    this._direction = direction;
  }

  get description(): string {
    return `Move ${this._direction}.`;
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Movement]);
  }

  async perform(player: Player): Promise<void> {
    let newLocation = player.location.getExit(this._direction);
    player.moveToLocation(newLocation);
  }

  private readonly _direction: string;
}
