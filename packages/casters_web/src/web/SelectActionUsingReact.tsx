import { Action, Player, Strategy } from "./exports";
import "core-js/proposals/promise-with-resolvers";

export type Resolver = (action: Action) => void;

export class SelectActionUsingReact implements Strategy {
  constructor(public setResolver: (resolver: Resolver) => void) {}

  get isInteractive(): boolean {
    return true;
  }

  async selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    console.log("SelectActionUsingReact.selectAction");
    // @ts-ignore
    const { promise, resolve } = Promise.withResolvers(
      new Promise<Action>((action) => action),
    );
    console.log("SelectActionUsingReact.selectAction: promise", promise);
    this.setResolver(resolve);
    return promise;
  }
}
