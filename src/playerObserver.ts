import {Action} from "./action.js";
import {Player} from "./player.js";

export interface PlayerObserver {
    notify(player: Player, msg: string): void;

    noteTurnStarted(player: Player): void;

    notePossibleActions(player: Player, actions: Action[]): void;

    noteActionPerformed(player: Player, action: Action): void;

    noteActionImpossible(player: Player, action: Action, reason: string): void;
}