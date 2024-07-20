import React from "react";
import styles from "./index.module.scss";

export type Point = {
  x: number;
  y: number;
};

interface IWhiteBoardProps {
  points: Point[];
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function WhiteBoardComp(props: IWhiteBoardProps) {
  const { points, handleClick } = props;
  return (
    <div className={styles.whiteBoardContainer} onClick={handleClick}>
      {points.map((point, index) => (
        <div
          key={index}
          className={styles.point}
          style={{
            left: point.x - 5,
            top: point.y - 5,
          }}
        />
      ))}
    </div>
  );
}

export default WhiteBoardComp;
