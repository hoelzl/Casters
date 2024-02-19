import { Action, ActionTag } from "../core/action";
import { SelectActionWithProperty } from "./selectActionWithProperty";

export class SelectAggressiveAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Aggressive);
  }
}
