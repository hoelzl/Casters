import React from "react";
import { Action, capitalizeFirstLetter, MoveAction } from "./exports"; // @ts-ignore
import styles from "./GameComponent.module.css";
import { GameState, movementActions, nonMovementActions } from "./GameState";
import { Resolver } from "./SelectActionUsingReact";

const mixedStyles = {
  topOverlay: styles.fullWidth + " " + styles.overlay + " " + styles.topOverlay,
  bottomContent: styles.fullWidth + " " + styles.bottomContent,
  descriptionBox: styles.overlay + " " + styles.descriptionBox,
};

function createButtons(actions: Action[], resolver: Resolver) {
  if (actions.length === 0) {
    return [<p className={styles.overlay}>No more actions are available.</p>];
  }
  return actions.map((action: Action, index: number) => {
    let className = styles.button;
    let title = action.shortDescription;
    return (
      <button
        key={index}
        onClick={() => resolver.resolve(action)}
        className={className}
      >
        {title}
      </button>
    );
  });
}

function createMovementButton(
  key: number,
  direction: string,
  action: MoveAction | undefined,
  resolver: Resolver,
  hidden: boolean,
) {
  let props: any = {
    key: key,
    className: `${styles.button} ${styles.directionButton} ${styles[direction]}`,
    disabled: hidden,
  };
  if (!hidden && action !== undefined) {
    props.onClick = () => resolver.resolve(action);
  } else {
    props.className += ` ${styles.disabled}`;
  }

  return <button {...props}>{capitalizeFirstLetter(direction)}</button>;
}

const compassDirections = ["north", "south", "east", "west"];

function createMovementButtons(
  actions: MoveAction[],
  resolver: Resolver,
  directions: string[] = compassDirections,
) {
  return directions.map((direction, index) => {
    const action = actions.find((a) => a.direction === direction);
    const hidden = action === undefined;
    return createMovementButton(index, direction, action, resolver, hidden);
  });
}

type GameComponentProps = {
  gameState: GameState;
  resolver: Resolver;
};

function imageLocation(imageName: string) {
  return `./assets/images/${imageName}.webp`;
}

export const GameComponent = ({ gameState, resolver }: GameComponentProps) => {
  return (
    <div className={styles.gameContainer}>
      <img
        className={styles.backgroundImage}
        src={imageLocation(gameState.currentLocation.imageName)}
        alt={gameState.currentLocation.name}
      />
      <div className={mixedStyles.topOverlay}>
        <h1>{gameState.currentLocation.name}</h1>
      </div>
      <div className={mixedStyles.bottomContent}>
        <div className={styles.movementActions}>
          {createMovementButtons(movementActions(gameState), resolver)}
        </div>
        <div className={mixedStyles.descriptionBox}>
          <p className={styles.descriptionText}>
            {gameState.currentLocation.description}
          </p>
        </div>
        <div className={styles.otherActions}>
          {createButtons(nonMovementActions(gameState), resolver)}
        </div>
      </div>
    </div>
  );
};
