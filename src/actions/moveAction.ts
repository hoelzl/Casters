import {Action, ActionTag} from "../action.js";
import {Player} from "../player.js";

export class MoveAction implements Action {
    constructor(public direction: string) {
        this._direction = direction;
    }

    get description(): string {
        return `Move ${this._direction}.`;
    }

    perform(player: Player): void {
        let newLocation = player.location.getExit(this._direction);
        player.moveToLocation(newLocation);
    }

    get tags(): Set<ActionTag> {
        return new Set([ActionTag.Movement]);
    }

    private readonly _direction: string;
}