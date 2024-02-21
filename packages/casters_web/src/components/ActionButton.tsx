import React from "react";
import { Action } from "../exports";
import { Resolver } from "../SelectActionUsingReact";
import styles from "./Casters.module.css";
import { v4 as uuidv4 } from "uuid";

type ActionButtonProps = {
  action: Action;
  resolver: Resolver;
};

export function ActionButton({ action, resolver }: ActionButtonProps) {
  const className = styles.button;
  const title = action.shortDescription;

  return (
    <button onClick={() => resolver.resolve(action)} className={className}>
      {title}
    </button>
  );
}
