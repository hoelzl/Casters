import {GameObserver, GameOverReason} from "./gameObserver.js";
import {World} from "./world.js";
import {createWorld} from "./worldFactory.js";
import {Strategy} from "./strategy.js";
import {Player} from "./player.js";
import {GameInProgress, Result} from "./result.js";
import {QuitGameException} from "./actions/quitAction.js";

export class Game {
    constructor(gameJson: string, observer?: GameObserver) {
        this._world = createWorld(gameJson);
        if (observer) {
            this.registerObserver(observer);
        }
    }

    addPlayerByName(name: string, strategy: Strategy): Player {
        return this.addPlayerByLocation(name, this._world.initialLocationName, strategy)
    }

    addPlayerByLocation(name: string, location: string, strategy: Strategy): Player {
        return this.addPlayer(new Player(name, this._world.getLocation(location), strategy));
    }

    addPlayer(player: Player) : Player {
        for (let observer of this._observers) {
            player.registerObserver(observer);
        }
        this._players.push(player);
        return player;
    }

    registerObserver(observer: GameObserver): void {
        for (let player of this._players) {
            player.registerObserver(observer);
        }
        this._observers.push(observer);
    }

    run(): void {
        try {
            this.notifyGameStarted();
            for (let player of this._players) {
                for (let i = 0; i < 10; i++) {
                    this.notifyTurnStarted(player);
                    player.takeTurn();
                }
            }
            this.notifyGameOver(GameOverReason.TurnLimitReached);
            this.notifyResult();
        } catch (e: any) {
            if (e instanceof QuitGameException) {
                this.notifyGameOver(GameOverReason.Quit);
            } else {
                this.notifyException(e.message);
                this.notifyGameOver(GameOverReason.Error);
            }
        }
    }

    private notifyGameStarted(): void {
        for (let observer of this._observers) {
            observer.noteGameStarted(this);
        }
    }

    private notifyTurnStarted(player: Player): void {
        for (let observer of this._observers) {
            observer.noteTurnStarted(player);
        }
    }

    private notifyGameOver(reason: GameOverReason): void {
        for (let observer of this._observers) {
            observer.noteGameOver(this, reason);
        }
    }

    private notifyResult(): void {
        for (let observer of this._observers) {
            observer.noteResult(this, this._result);
        }
    }

    private notifyException(msg: string): void {
        for (let observer of this._observers) {
            observer.noteException(this, msg);
        }
    }

    private _world: World;
    private _players: Player[] = [];
    private _observers: GameObserver[] = [];
    private _result: Result = new GameInProgress();
}
