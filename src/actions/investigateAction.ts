import {Action, ActionTag} from "../action.js";
import {Player} from "../player.js";

export class InvestigateAction implements Action {
    get description(): string {
        return "Investigate the current location.";
    }

    perform(player: Player): void {
    }

    get tags(): Set<ActionTag> {
        return new Set([ActionTag.Investigation, ActionTag.Aggressive]);
    }
}
