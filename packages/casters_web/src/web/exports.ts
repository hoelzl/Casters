import { RawGameData } from "casters_core/core/worldFactory";
import gameDataImport from "casters_core/data/dungeon.json";

export {
  Action,
  ActionTag,
  ActionType,
  getDefaultActions,
  registerDefaultAction,
} from "casters_core/core/action";
export * from "casters_core/core/config";
export { Game } from "casters_core/core/game";
export {
  GameObserver,
  GameObserverBase,
  GameOverReason,
} from "casters_core/core/gameObserver";
export { Location } from "casters_core/core/location";
export { Pawn } from "casters_core/core/pawn";
export { Player } from "casters_core/core/player";
export {
  Result,
  GameInProgress,
  PlayerDied,
  PlayerWon,
} from "casters_core/core/result";
export { Strategy } from "casters_core/core/strategy";
export {
  capitalizeFirstLetter,
  getRandomElement,
  wrapText,
} from "casters_core/core/utils";
export { World } from "casters_core/core/world";
export { ErrorAction } from "casters_core/actions/errorAction";
export { HealAction } from "casters_core/actions/healAction";
export { InvestigateAction } from "casters_core/actions/investigateAction";
export { MoveAction } from "casters_core/actions/moveAction";
export { QuitAction, QuitGameException } from "casters_core/actions/quitAction";
export { registerAllDefaultActions } from "casters_core/actions/registerDefaultActions";
export { SelectActionWithProperty } from "casters_core/strategies/selectActionWithProperty";
export { SelectAggressiveAction } from "casters_core/strategies/selectAggressiveAction";
export { SelectHelpfulAction } from "casters_core/strategies/selectHelpfulAction";
export { SkipTurnStrategy } from "casters_core/strategies/skipTurnStrategy";

export const gameData: RawGameData = gameDataImport;
