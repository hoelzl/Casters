import { Location } from "./location";
import { Strategy } from "./strategy";
import { Pawn } from "./pawn";
import { Action } from "./action";
import { GameObserver } from "./gameObserver";
import { SkipTurnAction } from "./actions/skipTurnAction";
import { PlayerObserver } from "./playerObserver";
import { MoveAction } from "./actions/moveAction";
import { InvestigateAction } from "./actions/investigateAction";
import { QuitAction } from "./actions/quitAction";
import { ErrorAction } from "./actions/errorAction";
import config from "./config";
import { HealAction } from "./actions/healAction";

export class Player {
  private _pawn: Pawn;
  private readonly _strategy: Strategy;

  constructor(name: string, location: Location, strategy: Strategy) {
    this._pawn = new Pawn(name, location);
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

  get strategy(): Strategy {
    return this._strategy;
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

  getPossibleActions(): Action[] {
    let result: Action[] = [];
    for (let [direction, _] of this.location.exits) {
      result.push(new MoveAction(direction));
    }
    // TODO: Figure out a way to make this more dynamic
    result.push(new InvestigateAction());
    result.push(new SkipTurnAction());
    result.push(new HealAction());
    if (this.strategy.isInteractive) {
      result.push(new QuitAction());
      if (config.debug) {
        result.push(new ErrorAction());
      }
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
      if (e instanceof QuitAction) {
        this.noteGameQuit();
      } else {
        this.noteActionImpossible(action, e.message);
      }
    }
  }

  registerObserver(observer: GameObserver): void {
    this._observers.push(observer);
  }

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
    this.notify("Game quit by player.");
  }

  private _observers: PlayerObserver[] = [];
}
