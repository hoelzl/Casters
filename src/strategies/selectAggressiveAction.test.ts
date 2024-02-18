import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createWorldAndPlayer } from "../data/testObjects";
import { SelectAggressiveAction } from "./selectAggressiveAction";
import { MoveAction } from "../actions/moveAction";
import { InvestigateAction } from "../actions/investigateAction";
import { ActionTag } from "../action";

describe("SelectAggressiveAction", () => {
  test("is not interactive", () => {
    expect(new SelectAggressiveAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", () => {
    const [_world, player] = createWorldAndPlayer();
    const action = new SelectAggressiveAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns aggressive action if available", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = [
      new MoveAction("north"),
      new InvestigateAction(),
      new MoveAction("south"),
    ];
    const action = new SelectAggressiveAction().selectAction(player, actions);
    expect(action.tags).toContain(ActionTag.Aggressive);
  });

  test("selectAction() returns random action if no aggressive actions", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = new SelectAggressiveAction().selectAction(player, actions);
    expect(action).toBeInstanceOf(MoveAction);
  });
});
