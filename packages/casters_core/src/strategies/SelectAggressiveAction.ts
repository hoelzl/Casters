import { Action, ActionTag } from "../core/Action";
import { SelectActionWithProperty } from "./SelectActionWithProperty";

export class SelectAggressiveAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Aggressive);
  }
}
