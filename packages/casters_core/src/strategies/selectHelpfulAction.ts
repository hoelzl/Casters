import { Action, ActionTag } from "../core/action";
import { SelectActionWithProperty } from "./selectActionWithProperty";

export class SelectHelpfulAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Helpful);
  }
}
