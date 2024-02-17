import {Action} from "./action.js";
import {Player} from "./player.js";

export interface Strategy {
    selectAction(player: Player, actions: Action[]): Action;
    get isInteractive(): boolean;
}