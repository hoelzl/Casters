"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const gameObserver_1 = require("./gameObserver");
const worldFactory_1 = require("./worldFactory");
const player_1 = require("./player");
const result_1 = require("./result");
const quitAction_1 = require("../actions/quitAction");
class Game {
    constructor(gameData, observer) {
        if (typeof gameData === "string") {
            this._world = (0, worldFactory_1.createWorldFromString)(gameData);
        }
        else {
            this._world = (0, worldFactory_1.createWorldFromJsonData)(gameData);
        }
        if (observer) {
            this.registerObserver(observer);
        }
    }
    get world() {
        return this._world;
    }
    // noinspection JSUnusedGlobalSymbols
    addPlayerByName(name, strategy) {
        return this.addPlayerByLocation(name, this._world.initialLocationName, strategy);
    }
    addPlayerByLocation(name, location, strategy) {
        return this.addPlayer(new player_1.Player(name, this._world.getLocation(location), strategy));
    }
    addPlayer(player) {
        for (let observer of this._observers) {
            player.registerObserver(observer);
        }
        this._players.push(player);
        return player;
    }
    registerObserver(observer) {
        for (let player of this._players) {
            player.registerObserver(observer);
        }
        this._observers.push(observer);
    }
    // noinspection JSUnusedGlobalSymbols
    async run() {
        try {
            this.notifyGameStarted();
            for (let player of this._players) {
                for (let i = 0; i < 10; i++) {
                    this.notifyTurnStarted(player);
                    await player.takeTurn();
                }
            }
            this.notifyGameOver(gameObserver_1.GameOverReason.TurnLimitReached);
            this.notifyResult();
        }
        catch (e) {
            if (e instanceof quitAction_1.QuitGameException) {
                this.notifyGameOver(gameObserver_1.GameOverReason.Quit);
            }
            else {
                this.notifyException(e.message);
                this.notifyGameOver(gameObserver_1.GameOverReason.Error);
            }
        }
    }
    notifyGameStarted() {
        for (let observer of this._observers) {
            observer.noteGameStarted(this);
        }
    }
    notifyTurnStarted(player) {
        for (let observer of this._observers) {
            observer.noteTurnStarted(player);
        }
    }
    notifyGameOver(reason) {
        for (let observer of this._observers) {
            observer.noteGameOver(this, reason);
        }
    }
    notifyResult() {
        for (let observer of this._observers) {
            observer.noteResult(this, this._result);
        }
    }
    notifyException(msg) {
        for (let observer of this._observers) {
            observer.noteException(this, msg);
        }
    }
    _world;
    _players = [];
    _observers = [];
    _result = new result_1.GameInProgress();
}
exports.Game = Game;
//# sourceMappingURL=game.js.map