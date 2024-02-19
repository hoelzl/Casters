import { describe, expect, test } from "@jest/globals";
import { QuitAction, QuitGameException } from "./quitAction";
import { ActionTag } from "../core/action";
import { createPlayer } from "../data/testObjects";

describe("QuitAction", () => {
  test("has correct description", () => {
    expect(new QuitAction().description).toBe("Quit the game.");
  });

  test("has correct tags", () => {
    expect(new QuitAction().tags).toEqual(
      new Set([ActionTag.Quit, ActionTag.InteractiveOnly]),
    );
  });

  test("perform() raises QuitGameException", () => {
    const player = createPlayer();
    const action: QuitAction = new QuitAction();
    expect(action.perform(player)).rejects.toBeInstanceOf(QuitGameException);
  });
});
