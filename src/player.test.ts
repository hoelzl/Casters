import { describe, test, expect } from "@jest/globals";
import { createWorldAndPlayer } from "./data/testObjects";
import { SkipTurnAction } from "./actions/skipTurnAction";
import { QuitAction } from "./actions/quitAction";
import { Strategy } from "./strategy";
import { Player } from "./player";
import { Action } from "./action";

class InteractiveStrategyForTests implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  selectAction(_player: Player, actions: Action[]): Action {
    return actions?.[0] ?? new SkipTurnAction();
  }
}

class ErrorStrategyForTests implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  selectAction(_player: Player, _actions: Action[]): Action {
    throw new Error("This strategy always throws an error.");
  }
}

function expectActionOfType(
  actions: Action[],
  type: { new (): Action },
  expected: boolean,
): void {
  const action = actions.find((action) => action instanceof type);
  if (expected) {
    expect(action).toBeDefined();
  } else {
    expect(action).not.toBeDefined();
  }
}

describe("Player", () => {
  test("getPossibleActions() includes default action for non-interactive player", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = player.getPossibleActions();

    expectActionOfType(actions, SkipTurnAction, true);
    expectActionOfType(actions, QuitAction, false);
  });

  test("getPossibleActions() includes default actions for interactive player", () => {
    const [_world, player] = createWorldAndPlayer({
      strategy: new InteractiveStrategyForTests(),
    });
    const actions = player.getPossibleActions();

    expectActionOfType(actions, SkipTurnAction, true);
    expectActionOfType(actions, QuitAction, true);
  });

  test("selectAction() does not invoke strategy if no actions are available", () => {
    const [_world, player] = createWorldAndPlayer({
      strategy: new ErrorStrategyForTests(),
    });
    expect(() => player.selectAction([])).not.toThrow();
  });

  test("selectAction() returns SkipTurnAction if no actions are available", () => {
    const [_world, player] = createWorldAndPlayer();
    const action = player.selectAction([]);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() invokes strategy if actions are available", () => {
    const [_world, player] = createWorldAndPlayer({
      strategy: new ErrorStrategyForTests(),
    });
    expect(() => player.selectAction([new SkipTurnAction()])).toThrow(
      "This strategy always throws an error.",
    );
  });
});
