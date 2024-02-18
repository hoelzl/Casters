import { Action, ActionTag, getDefaultActions } from "./action";
import { MoveAction } from "./actions/moveAction";
import { QuitGameException } from "./actions/quitAction";
import { SkipTurnAction } from "./actions/skipTurnAction";
import config from "./config";
import { GameObserver } from "./gameObserver";
import { Location } from "./location";
import { Pawn } from "./pawn";
import { PlayerObserver } from "./playerObserver";
import { Strategy } from "./strategy";

export class Player {
  private _pawn: Pawn;
  private _observers: PlayerObserver[] = [];

  constructor(name: string, location: Location, strategy: Strategy) {
    this._pawn = new Pawn(name, location);
    this._strategy = strategy;
  }

  private _strategy: Strategy;

  get strategy(): Strategy {
    return this._strategy;
  }

  set strategy(strategy: Strategy) {
    this._strategy = strategy;
  }

  get name(): string {
    return this._pawn.name;
  }

  get location(): Location {
    return this._pawn.location;
  }

  get description(): string {
    return `${this.name} at ${this.location.name}`;
  }

  moveToLocation(location: Location): void {
    this._pawn.moveToLocation(location);
  }

  takeTurn(): void {
    let actions = this.getPossibleActions();
    let action = this.selectAction(actions);
    if (!action) {
      action = new SkipTurnAction();
    }
    this.performIfPossible(action);
  }

  getNonInteractiveDefaultActions(
    addTestOnlyActions: boolean = false,
  ): Action[] {
    return getDefaultActions().filter((action) => {
      if (!addTestOnlyActions && action.tags.has(ActionTag.TestOnly)) {
        return false;
      }
      return !action.tags.has(ActionTag.InteractiveOnly);
    });
  }

  getInteractiveDefaultActions(addTestOnlyActions: boolean = false): Action[] {
    return getDefaultActions().filter((action) => {
      if (!addTestOnlyActions && action.tags.has(ActionTag.TestOnly)) {
        return false;
      }
      return action.tags.has(ActionTag.InteractiveOnly);
    });
  }

  getPossibleActions(addTestOnlyActions: boolean = config.debug): Action[] {
    let result: Action[] = [];
    for (let [direction, _] of this.location.exits) {
      result.push(new MoveAction(direction));
    }
    result = result.concat(
      this.getNonInteractiveDefaultActions(addTestOnlyActions),
    );
    if (this.strategy.isInteractive) {
      result = result.concat(
        this.getInteractiveDefaultActions(addTestOnlyActions),
      );
    }
    this.notePossibleActions(result);
    return result;
  }

  selectAction(actions: Action[]): Action {
    if (actions.length === 0) {
      return new SkipTurnAction();
    }
    return this.strategy.selectAction(this, actions);
  }

  perform(action: Action): void {
    action.perform(this);
    this.noteActionPerformed(action);
  }

  performIfPossible(action: Action): void {
    try {
      this.perform(action);
    } catch (e: any) {
      if (e instanceof QuitGameException) {
        this.noteGameQuit();
      } else {
        this.noteActionImpossible(action, e.message);
      }
    }
  }

  registerObserver(observer: GameObserver): void {
    this._observers.push(observer);
  }

  // noinspection JSUnusedLocalSymbols
  private notify(msg: string): void {
    for (let observer of this._observers) {
      observer.notify(this, msg);
    }
  }

  private notePossibleActions(actions: Action[]): void {
    for (let observer of this._observers) {
      observer.notePossibleActions(this, actions);
    }
  }

  private noteActionPerformed(action: Action): void {
    for (let observer of this._observers) {
      observer.noteActionPerformed(this, action);
    }
  }

  private noteActionImpossible(action: Action, message: string): void {
    for (let observer of this._observers) {
      observer.noteActionImpossible(this, action, message);
    }
  }

  private noteGameQuit(): void {
    for (let observer of this._observers) {
      observer.noteGameQuit(this, "Game quit by player.");
    }
  }
}