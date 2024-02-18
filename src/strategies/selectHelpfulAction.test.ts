import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createWorldAndPlayer } from "../data/testObjects";
import { SelectHelpfulAction } from "./selectHelpfulAction";
import { MoveAction } from "../actions/moveAction";
import { ActionTag } from "../action";
import { HealAction } from "../actions/healAction";

describe("SelectHelpfulAction", () => {
  test("is not interactive", () => {
    expect(new SelectHelpfulAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", () => {
    const [_world, player] = createWorldAndPlayer();
    const action = new SelectHelpfulAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns helpful action if available", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = [
      new MoveAction("north"),
      new HealAction(),
      new MoveAction("south"),
    ];
    const action = new SelectHelpfulAction().selectAction(player, actions);
    expect(action.tags).toContain(ActionTag.Helpful);
  });

  test("selectAction() returns random action if no helpful actions", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = new SelectHelpfulAction().selectAction(player, actions);
    expect(action).toBeInstanceOf(MoveAction);
  });
});
