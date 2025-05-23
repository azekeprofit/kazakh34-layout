import { createStoreWithProducer } from "@xstate/store";
import { produce } from "immer";
import { azeke, cyrillic } from "./layout";

export interface letterKey {
  letter: string;
  row: number;
  col: number;
}

function initKeyboardStore(layout: string) {
  const letters: Record<string, letterKey> = {};
  const rows = layout
    .trim()
    .split("\n")
    .map((line, row) =>
      line
        .replace(" ", "")
        .split("")
        .map((letter, col) => {
          const obj = { letter, row, col };
          letters[letter] = obj;
          return obj;
        })
    );
  return { letters, layout, rows };
}

export const keyboardStore = (layout: string) =>
  createStoreWithProducer(produce, {
    context: initKeyboardStore(layout),
    on: {
      init: (context, event: { layout: string }) => {
        context = initKeyboardStore(event.layout);
      },
      setKey: (
        context,
        event: { row: number; col: number; letter: string }
      ) => {
        const oldLetter = context.rows[event.row][event.col];
        const newLetter = context.letters[event.letter];
        if (newLetter) {
          newLetter.letter = oldLetter.letter;
          context.letters[oldLetter.letter] = newLetter;
        } else delete context.letters[oldLetter.letter];
        oldLetter.letter = event.letter;
        context.letters[event.letter] = oldLetter;
      },
    },
  });

export const keyboard = keyboardStore(azeke);
export const cyrillicBoard = keyboardStore(cyrillic);
