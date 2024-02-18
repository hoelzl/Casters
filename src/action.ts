import { Player } from "./player";

// noinspection JSUnusedGlobalSymbols
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
  // Action Properties
  InteractiveOnly,
  Error,
  TestOnly,
  // Size of set for action tags
  ActionTagCount,
}

export interface Action {
  get description(): string;

  get tags(): Set<ActionTag>;

  perform(player: Player): void;
}

// type ActionType = { new (): Action };

const defaultActions: Action[] = [];

export function registerDefaultActions(action: Action): void {
  defaultActions.push(action);
}

export function getDefaultActions(): Action[] {
  return defaultActions;
}