"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const action_1 = require("./action");
const moveAction_1 = require("../actions/moveAction");
const quitAction_1 = require("../actions/quitAction");
const registerDefaultActions_1 = require("../actions/registerDefaultActions");
const skipTurnAction_1 = require("../actions/skipTurnAction");
const config_1 = __importDefault(require("./config"));
const pawn_1 = require("./pawn");
(0, registerDefaultActions_1.registerAllDefaultActions)();
class Player {
    _pawn;
    _observers = [];
    constructor(name, location, strategy) {
        this._pawn = new pawn_1.Pawn(name, location);
        this._strategy = strategy;
    }
    _strategy;
    get strategy() {
        return this._strategy;
    }
    // noinspection JSUnusedGlobalSymbols
    set strategy(strategy) {
        this._strategy = strategy;
    }
    get name() {
        return this._pawn.name;
    }
    get location() {
        return this._pawn.location;
    }
    // noinspection JSUnusedGlobalSymbols
    get description() {
        return `${this.name} at ${this.location.name}`;
    }
    moveToLocation(location) {
        this._pawn.moveToLocation(location);
    }
    async takeTurn() {
        let actions = this.getPossibleActions();
        let action = await this.selectAction(actions);
        if (!action) {
            action = new skipTurnAction_1.SkipTurnAction();
        }
        return this.performIfPossible(action);
    }
    getPossibleActions(addTestOnlyActions = config_1.default.debug) {
        let result = [];
        for (let [direction, _] of this.location.exits) {
            result.push(new moveAction_1.MoveAction(direction));
        }
        result = result.concat(this.getNonInteractiveDefaultActions(addTestOnlyActions));
        if (this.strategy.isInteractive) {
            result = result.concat(this.getInteractiveDefaultActions(addTestOnlyActions));
        }
        this.notePossibleActions(result);
        return result;
    }
    getNonInteractiveDefaultActions(addTestOnlyActions = false) {
        return (0, action_1.getDefaultActions)().filter((action) => {
            if (!addTestOnlyActions && action.tags.has(action_1.ActionTag.TestOnly)) {
                return false;
            }
            return !action.tags.has(action_1.ActionTag.InteractiveOnly);
        });
    }
    getInteractiveDefaultActions(addTestOnlyActions = false) {
        return (0, action_1.getDefaultActions)().filter((action) => {
            if (!addTestOnlyActions && action.tags.has(action_1.ActionTag.TestOnly)) {
                return false;
            }
            return action.tags.has(action_1.ActionTag.InteractiveOnly);
        });
    }
    async selectAction(actions) {
        if (actions.length === 0) {
            return new skipTurnAction_1.SkipTurnAction();
        }
        return this.strategy.selectAction(this, actions);
    }
    async perform(action) {
        this.noteStartingAction(action);
        await action.perform(this);
        this.noteActionPerformed(action);
    }
    async performIfPossible(action) {
        try {
            await this.perform(action);
        }
        catch (e) {
            if (e instanceof quitAction_1.QuitGameException) {
                this.noteGameQuit();
                throw e;
            }
            else {
                this.noteActionImpossible(action, e.message);
            }
        }
    }
    registerObserver(observer) {
        this._observers.push(observer);
    }
    notePossibleActions(actions) {
        for (let observer of this._observers) {
            observer.notePossibleActions(this, actions);
        }
    }
    noteStartingAction(action) {
        for (let observer of this._observers) {
            observer.noteStartingAction(this, action);
        }
    }
    noteActionPerformed(action) {
        for (let observer of this._observers) {
            observer.noteActionPerformed(this, action);
        }
    }
    noteActionImpossible(action, message) {
        for (let observer of this._observers) {
            observer.noteActionImpossible(this, action, message);
        }
    }
    noteGameQuit() {
        for (let observer of this._observers) {
            observer.noteGameQuit(this, "Game quit by player.");
        }
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map