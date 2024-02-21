import React from "react";
import { capitalizeFirstLetter, MoveAction } from "../exports";
import { Resolver } from "../SelectActionUsingReact";
import styles from "./Casters.module.css";

type MovementButtonProps = {
  key: number;
  direction: string;
  action: MoveAction | undefined;
  resolver: Resolver;
  hidden: boolean;
};

export function MovementButton({
  key,
  direction,
  action,
  resolver,
  hidden,
}: MovementButtonProps) {
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
