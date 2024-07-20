import React from "react";
import styles from "./index.module.scss";

export type TButtonProps = {
  name: string;
  onClick: () => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button(props: TButtonProps) {
  const { name, onClick } = props;
  return (
    <button {...props} className={styles.button} onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
