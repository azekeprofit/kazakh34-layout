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
      init: (context, event: { layout: string }) =>
        initKeyboardStore(event.layout),
      setKey: (
        context,
        event: letterKey
      ) => {
        const currentLetter = context.rows[event.row][event.col];
        const swappedLetter = context.letters[event.letter];
        if (swappedLetter) {
          swappedLetter.letter = currentLetter.letter;
          context.letters[currentLetter.letter] = swappedLetter;
          context.rows[swappedLetter.row][swappedLetter.col]=swappedLetter;
        } else delete context.letters[currentLetter.letter];
        currentLetter.letter = event.letter;
        context.letters[event.letter] = currentLetter;
      },
    },
  });

export const keyboard = keyboardStore(azeke);
export const cyrillicBoard = keyboardStore(cyrillic);
