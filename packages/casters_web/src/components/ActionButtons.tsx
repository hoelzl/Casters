import React from "react";
import { GameState, nonMovementActions } from "../GameState";
import { Resolver } from "../SelectActionUsingReact";
import { ActionButton } from "./ActionButton";
import styles from "./Casters.module.css";

type ActionButtonsProps = {
  gameState: GameState;
  resolver: Resolver;
};

export function ActionButtons({ gameState, resolver }: ActionButtonsProps) {
  const actions = nonMovementActions(gameState);
  const children =
    actions.length === 0 ? (
      <p className={styles.overlay + " " + styles.fullWidth}>
        No more actions are available.
      </p>
    ) : (
      actions.map((action, index) => (
        <ActionButton action={action} index={index} resolver={resolver} />
      ))
    );
  return <div className={styles.otherActions}>{children}</div>;
}
