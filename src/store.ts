import { createStore } from "@xstate/store";
import { cyrillic } from "./layout";
import { fingerColors } from "./frequencies";
import { useSelector } from "@xstate/store/solid";

export interface letterKey {
  letter: string;
  row: number;
  col: number;
}

const boardStore = (board: string, fingers: string[]) => {
  const letters: Record<string, letterKey> = {};

  const rows = board
    .trim()
    .split("\n")
    .map((line, row) =>
      line.split("").map((letter, col) => {
        const obj = { letter, row, col };
        letters[letter] = obj;
        return obj;
      })
    );
  return {
    context: {
      rows,
      fingers,
      letters,
    },
    on: {},
  };
};

export const leftBoard = createStore(boardStore(cyrillic[0], fingerColors));
export const rightBoard = createStore(
  boardStore(cyrillic[1], fingerColors.map(f=>f+' ').reverse())
);

export const useBoard = () => {
  const left = useSelector(leftBoard, (s) => s.context.letters);
  const right = useSelector(rightBoard, (s) => s.context.letters);
  const leftFingers = useSelector(leftBoard, (s) => s.context.fingers);
  const rightFingers = useSelector(rightBoard, (s) => s.context.fingers);
  return [left, right, leftFingers, rightFingers];
};
