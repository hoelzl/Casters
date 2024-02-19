import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createPlayer } from "../data/testObjects";
import { SelectAggressiveAction } from "./selectAggressiveAction";
import { MoveAction } from "../actions/moveAction";
import { InvestigateAction } from "../actions/investigateAction";
import { ActionTag } from "../core/action";

describe("SelectAggressiveAction", () => {
  test("is not interactive", () => {
    expect(new SelectAggressiveAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", async () => {
    const player = createPlayer();
    const action = await new SelectAggressiveAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns aggressive action if available", async () => {
    const player = createPlayer();
    const actions = [
      new MoveAction("north"),
      new InvestigateAction(),
      new MoveAction("south"),
    ];
    const action = await new SelectAggressiveAction().selectAction(
      player,
      actions,
    );
    expect(action.tags).toContain(ActionTag.Aggressive);
  });

  test("selectAction() returns random action if no aggressive actions", async () => {
    const player = createPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = await new SelectAggressiveAction().selectAction(
      player,
      actions,
    );
    expect(action).toBeInstanceOf(MoveAction);
  });
});
