import { Action, ActionTag } from "../action";
import { SelectActionWithProperty } from "./selectActionWithProperty";

export class SelectAggressiveAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Aggressive);
  }
}
