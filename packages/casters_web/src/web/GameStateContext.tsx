// GameStateContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Action, Game, gameData, Location, Player } from "./exports";
import { GameState, UpdateStateObserver } from "./GameState";
import { Resolver, SelectActionUsingReact } from "./SelectActionUsingReact";

const initialState: GameState = {
  currentLocation: new Location("Invalid Location", ""),
  availableActions: [],
};

const GameStateContext = createContext<{
  gameState: GameState;
  resolver: Resolver;
  startGame: () => Promise<void>;
}>({
  gameState: initialState,
  resolver: async (_action: Action) => {},
  startGame: async () => {},
});

type StateProps = {
  children: React.ReactNode;
};

function createGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const game = new Game(gameData);
  const interactivePlayer = new Player(
    "Interactive Player",
    game.world.initialLocation,
    new SelectActionUsingReact(setResolver),
  );
  game.addPlayer(interactivePlayer);
  return [game, interactivePlayer];
}

function createAndConfigureGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const [game, player] = createGameAndPlayer(setResolver);
  initialState.currentLocation = player.location;
  initialState.availableActions = player.getPossibleActions();
  return [game, player];
}

function createAndConfigureObserver(
  game: Game,
  gameState: GameState,
  setGameState: (
    value: ((prevState: GameState) => GameState) | GameState,
  ) => void,
) {
  const observer = new UpdateStateObserver(gameState);
  game.registerObserver(observer);
  const updateGameStateFromObserver = () => {
    console.log("GameStateProvider.updateGameStateFromObserver()");
    setGameState({ ...observer.state });
  };
  observer.onStateChange = updateGameStateFromObserver;
  return updateGameStateFromObserver;
}

export const GameStateProvider: React.FC<StateProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [resolver, setResolver] = useState<Resolver>(() => {});

  const [game] = createAndConfigureGameAndPlayer(setResolver);
  // noinspection JSUnusedLocalSymbols
  const updateGameStateFromObserver = createAndConfigureObserver(
    game,
    gameState,
    setGameState,
  );

  // Function to start the game
  const startGame = useCallback(async () => {
    console.log("GameStateProvider.startGame()");
    await game.run();
    // updateGameStateFromObserver();
    // updateGameStateFromStrategy();
  }, []);

  useEffect(() => {
    startGame().catch(console.error);
  }, [startGame]);

  return (
    <GameStateContext.Provider value={{ gameState, resolver, startGame }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
