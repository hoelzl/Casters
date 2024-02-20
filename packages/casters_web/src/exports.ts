import { RawGameData } from "casters_core/core/worldFactory";
import gameDataImport from "casters_core/data/dungeon.json";

export {
  Action,
  ActionTag,
  ActionType,
  getDefaultActions,
  registerDefaultAction,
} from "casters_core/core/Action";
export * from "casters_core/core/config";
export { Game } from "casters_core/core/Game";
export {
  GameObserver,
  GameObserverBase,
  GameOverReason,
} from "casters_core/core/GameObserver";
export { Location } from "casters_core/core/Location";
export { Pawn } from "casters_core/core/Pawn";
export { Player } from "casters_core/core/Player";
export {
  Result,
  GameInProgress,
  PlayerDied,
  PlayerWon,
} from "casters_core/core/Result";
export { Strategy } from "casters_core/core/Strategy";
export {
  capitalizeFirstLetter,
  getRandomElement,
  wrapText,
} from "casters_core/core/utils";
export { World } from "casters_core/core/World";
export { ErrorAction } from "casters_core/actions/ErrorAction";
export { HealAction } from "casters_core/actions/HealAction";
export { InvestigateAction } from "casters_core/actions/InvestigateAction";
export { MoveAction } from "casters_core/actions/MoveAction";
export { QuitAction, QuitGameException } from "casters_core/actions/QuitAction";
export { registerAllDefaultActions } from "casters_core/actions/registerDefaultActions";
export { SelectActionWithProperty } from "casters_core/strategies/SelectActionWithProperty";
export { SelectAggressiveAction } from "casters_core/strategies/SelectAggressiveAction";
export { SelectHelpfulAction } from "casters_core/strategies/SelectHelpfulAction";
export { SkipTurnStrategy } from "casters_core/strategies/SkipTurnStrategy";

export const gameData: RawGameData = gameDataImport;
