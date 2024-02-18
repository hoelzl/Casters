import { ActionType, registerDefaultAction } from "../action";
import { ErrorAction } from "./errorAction";
import { InvestigateAction } from "./investigateAction";
import { QuitAction } from "./quitAction";
import { SkipTurnAction } from "./skipTurnAction";

const allDefaultActionTypes: ActionType[] = [
  ErrorAction,
  InvestigateAction,
  QuitAction,
  SkipTurnAction,
];

let defaultActionsRegistered: boolean = false;

export function registerAllDefaultActions() {
  if (defaultActionsRegistered) {
    return;
  }

  for (const actionType of allDefaultActionTypes) {
    registerDefaultAction(new actionType());
  }
  defaultActionsRegistered = true;
}
