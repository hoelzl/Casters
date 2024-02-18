import { Action, ActionTag } from "../action";
import { SelectActionWithProperty } from "./selectActionWithProperty";

export class SelectHelpfulAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Helpful);
  }
}
