import {Action} from "./action";
import {Player} from "./player";

export interface Strategy {
    selectAction(player: Player, actions: Action[]): Action;
    get isInteractive(): boolean;
}