import React, { useCallback, useMemo, useState } from "react";
import WhiteBoardComp, { Point } from "./components/WhiteBoard/WhiteBoard";
import Button, { TButtonProps } from "./components/CommandButtons/Button";
import { cloneDeep, isEqual, uniqWith } from "lodash";
import styles from "./index.module.scss";

function WhiteBoard() {
  const [points, setPoints] = useState<Point[]>([]);
  const [undoStack, setUndoStack] = useState<Point[]>([]);
  const [redoStack, setRedoStack] = useState<Point[]>([]);

  const handleClickOnWhiteBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    const newPoint = {
      x: e.clientX,
      y: e.clientY,
    };
    setPoints((prevPoints) => [...prevPoints, newPoint]);
    setUndoStack((prevPoints) => [...prevPoints, newPoint]);
    setRedoStack([]);
  };

  const handleClear = () => {
    setPoints([]);
    setUndoStack([]);
    setRedoStack([]);
  };

  const hanleClearAfter = useCallback((second: number) => {
    setTimeout(() => {
      handleClear();
    }, second * 1000);
  }, []);

  const handleUndo = useCallback(() => {
    setPoints((prevPoints) => {
      if (prevPoints.length < 1) {
        return [];
      }
      const newPoints = cloneDeep(prevPoints);
      const lastPoint = newPoints.pop();
      if (lastPoint) {
        setRedoStack((prevRedos) =>
          // * React Strict Mode call twice
          uniqWith([...prevRedos, lastPoint], isEqual)
        );
        setUndoStack((prevUndo) => {
          const newUndo = [...prevUndo];
          newUndo.pop();
          return newUndo;
        });
      }

      return newPoints;
    });
  }, []);

  const handleRedo = useCallback(() => {
    setRedoStack((prevRedos) => {
      if (prevRedos.length < 1) {
        return [];
      }

      const newRedos = cloneDeep(prevRedos);
      const lastRedo = newRedos.pop();
      if (lastRedo) {
        // * React Strict Mode call twice
        setUndoStack((prevUndo) => uniqWith([...prevUndo, lastRedo], isEqual));
        setPoints((prevPoints) => {
          return [...prevPoints, lastRedo];
        });
      }
      return newRedos;
    });
  }, []);

  const buttonProps: TButtonProps[] = useMemo(
    () => [
      {
        name: "Clear",
        onClick: () => {
          handleClear();
        },
        disabled: !points || points.length === 0,
      },
      {
        name: "Clear (after 2s)",
        onClick: () => {
          hanleClearAfter(2);
        },
        disabled: points.length === 0,
      },
      {
        name: "Undo",
        onClick: () => {
          handleUndo();
        },
        disabled: !undoStack || undoStack.length === 0,
      },
      {
        name: "Redo",
        onClick: () => {
          handleRedo();
        },
        disabled: !redoStack || redoStack.length === 0,
      },
    ],
    [handleRedo, handleUndo, hanleClearAfter, points, redoStack, undoStack]
  );
  return (
    <div>
      <div className={styles.commandBar}>
        {buttonProps.map((button) => (
          <Button name={button.name} onClick={button.onClick} />
        ))}
      </div>
      <WhiteBoardComp points={points} handleClick={handleClickOnWhiteBoard} />
    </div>
  );
}

export default WhiteBoard;
