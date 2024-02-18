import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createPlayer } from "../data/testObjects";
import { SelectHelpfulAction } from "./selectHelpfulAction";
import { MoveAction } from "../actions/moveAction";
import { ActionTag } from "../action";
import { HealAction } from "../actions/healAction";

describe("SelectHelpfulAction", () => {
  test("is not interactive", () => {
    expect(new SelectHelpfulAction().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction if no actions", async () => {
    const player = createPlayer();
    const action = await new SelectHelpfulAction().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() returns helpful action if available", async () => {
    const player = createPlayer();
    const actions = [
      new MoveAction("north"),
      new HealAction(),
      new MoveAction("south"),
    ];
    const action = await new SelectHelpfulAction().selectAction(
      player,
      actions,
    );
    expect(action.tags).toContain(ActionTag.Helpful);
  });

  test("selectAction() returns random action if no helpful actions", async () => {
    const player = createPlayer();
    const actions = [new MoveAction("north"), new MoveAction("south")];
    const action = await new SelectHelpfulAction().selectAction(
      player,
      actions,
    );
    expect(action).toBeInstanceOf(MoveAction);
  });
});
