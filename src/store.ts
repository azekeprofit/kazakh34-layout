import { createStoreWithProducer } from "@xstate/store";
import { useSelector } from "@xstate/store/solid";
import { produce } from "immer";
import { fingerColors } from "./frequencies";

type layout = [left: string, right: string];
export const cyrillic: layout = [
  `
йцуке
фывап
ячсми
`,
  `
нгшщз
ролдж
тьбю⏎
`,
];

export const azeke: layout = [
  `
үұуке
қығап
өхсми
`,
  `
ніңгш
ролдж
тзбә⏎
`,
];

export interface letterKey {
  letter: string;
  row: number;
  col: number;
}

const boardStore = () =>
  createStoreWithProducer(produce, {
    context: {
      rows: [] as letterKey[][],
      fingers: [],
      letters: {} as Record<string, letterKey>,
    },
    on: {
      init: (context, event: { board: string; fingers: string[] }) => {
        const letters: Record<string, letterKey> = {};
        const rows = event.board
          .trim()
          .split("\n")
          .map((line, row) =>
            line.split("").map((letter, col) => {
              const obj = { letter, row, col };
              letters[letter] = obj;
              return obj;
            })
          );
        context.letters = letters;
        context.rows = rows;
        context.fingers = event.fingers;
      },
      setKey: (
        context,
        event: { row: number; col: number; letter: string }
      ) => {
        const oldLetter = context.rows[event.row][event.col];
        delete context.letters[oldLetter.letter];
        oldLetter.letter = event.letter;
        context.letters[event.letter] = oldLetter;
      },
    },
  });

export const leftBoard = boardStore();
export const rightBoard = boardStore();

export function setLayout(
  [leftBoard, rightBoard]: [typeof leftBoard, typeof leftBoard],
  [left, right]: layout
) {
  leftBoard.send({ type: "init", board: left, fingers: fingerColors });
  rightBoard.send({
    type: "init",
    board: right,
    fingers: fingerColors.map((f) => f + " ").reverse(),
  });
}

setLayout([leftBoard, rightBoard], cyrillic);

export const cLeft = boardStore();
export const cRight = boardStore();
setLayout([cLeft, cRight], cyrillic);

export const cBoard = new Map<typeof leftBoard, typeof leftBoard>();
cBoard.set(leftBoard, cLeft);
cBoard.set(rightBoard, cRight);

export const useBoards = () => {
  const left = useSelector(leftBoard, (s) => s.context.letters);
  const right = useSelector(rightBoard, (s) => s.context.letters);
  const leftFingers = useSelector(leftBoard, (s) => s.context.fingers);
  const rightFingers = useSelector(rightBoard, (s) => s.context.fingers);
  return [left, right, leftFingers, rightFingers];
};
