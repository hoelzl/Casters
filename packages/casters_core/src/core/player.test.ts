import { describe, expect, test } from "@jest/globals";
import { Action } from "./action";
import { ErrorAction } from "../actions/errorAction";
import { MoveAction } from "../actions/moveAction";
import { QuitAction, QuitGameException } from "../actions/quitAction";
import { SkipTurnAction } from "../actions/skipTurnAction";
import {
  createPlayer,
  createPlayerAndObserver,
  createWorldAndPlayer,
  ErrorStrategyForTests,
  InteractiveStrategyForTests,
} from "../data/testObjects";

function expectActionOfType(
  actions: Action[],
  type: { new (...args: any[]): Action },
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
  test("getPossibleActions() contains move actions", () => {
    const player = createPlayer();
    const actions = player.getPossibleActions();

    expectActionOfType(actions, MoveAction, true);
  });

  test("getPossibleActions() includes default action for non-interactive player", () => {
    const player = createPlayer();
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
    const player = createPlayer({ strategy: new ErrorStrategyForTests() });
    expect(player.selectAction([])).resolves.toBeDefined();
  });

  test("selectAction() returns SkipTurnAction if no actions are available", () => {
    const player = createPlayer();
    const action = player.selectAction([]);
    expect(action).resolves.toBeInstanceOf(SkipTurnAction);
  });

  test("selectAction() invokes strategy if actions are available", () => {
    const player = createPlayer({ strategy: new ErrorStrategyForTests() });
    expect(player.selectAction([new SkipTurnAction()])).rejects.toBeDefined();
  });

  test("perform() does not throw if action does not throw", () => {
    const player = createPlayer();
    expect(player.perform(new SkipTurnAction())).resolves.toBeUndefined();
  });

  test("perform() throws if action throws", () => {
    const player = createPlayer();
    expect(player.perform(new QuitAction())).rejects.toBeInstanceOf(
      QuitGameException,
    );
  });

  test("perform() calls noteActionPerformed", async () => {
    let [player, observer] = createPlayerAndObserver();
    await player.perform(new SkipTurnAction());
    expect(observer.calls).toContain("noteActionPerformed: SkipTurnAction");
  });

  test("performIfPossible() calls noteActionImpossible if action is not possible", async () => {
    let [player, observer] = createPlayerAndObserver();
    await player.performIfPossible(new ErrorAction());
    expect(observer.calls).toContain(
      "noteActionImpossible: ErrorAction (This is an error for testing purposes.)",
    );
  });

  test("performIfPossible() calls noteGameQuit if action is QuitAction", async () => {
    let [player, observer] = createPlayerAndObserver();
    try {
      await player.performIfPossible(new QuitAction());
    } catch (e) {
      expect(e).toBeInstanceOf(QuitGameException);
    }
    expect(observer.calls).toContain("noteQuitAction: Game quit by player.");
  });
});
