import {Player} from "./player.js";

export enum ActionTag {
    // Action types
    Movement,
    Interaction,
    Investigation,
    Rest,
    // Player disposition
    Aggressive,
    Defensive,
    Helpful,
    // Meta actions
    SkipTurn,
    Quit,
    Save,
    Error,
    // Size of set for action tags
    ActionTagCount,
}

export interface Action {
    get description(): string;
    get tags(): Set<ActionTag>;
    perform(player: Player): void;
}