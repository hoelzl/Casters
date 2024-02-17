import {Action, ActionTag} from "../action.js";
import {Player} from "../player.js";

export class ErrorAction implements Action {
    get description(): string {
        return "Raise an error for testing purposes.";
    }

    get tags(): Set<ActionTag> {
        return new Set([ActionTag.Error]);
    }

    perform(_player: Player): void {
        throw new Error("This is an error for testing purposes.");
    }
}