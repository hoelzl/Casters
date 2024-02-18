import { describe, expect, test } from "@jest/globals";
import { MoveAction } from "./moveAction";
import { ActionTag } from "../action";
import { createWorldAndPlayer } from "../data/testObjects";

describe("MoveAction", () => {
  test("has correct description", () => {
    expect(new MoveAction("north").description).toBe("Move north.");
  });

  test("has correct tags", () => {
    expect(new MoveAction("north").tags).toEqual(new Set([ActionTag.Movement]));
  });

  test("perform() moves the player for valid direction", () => {
    const [_world, player] = createWorldAndPlayer();
    const action: MoveAction = new MoveAction("north");
    action.perform(player);
    expect(player.location.name).toBe("Room 2");
  });

  test("perform() does nothing for invalid direction", () => {
    const [_world, player] = createWorldAndPlayer();
    const action: MoveAction = new MoveAction("invalid");

    expect(() => action.perform(player)).toThrow(
      "Exit 'invalid' does not exist.",
    );
  });
});
