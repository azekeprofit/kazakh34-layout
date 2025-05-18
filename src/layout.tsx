import { For } from "solid-js";
import { letter, rowClasses } from "./frequencies";
import { useSelector } from '@xstate/store/solid';
import { leftBoard, letterKey } from "./store";

export type layout = [left: string, right: string];

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

export function Board(props: { board: typeof leftBoard }) {
  const rows = useSelector(props.board, s => s.context.rows);
  return <div class='capitalize'>
    <div class="grid grid-row ms-3 gap-2">
      <For each={rows()}>
        {(row) =>
          <div class="grid grid-cols-5 gap-2">
            <For each={row}>
              {(letter) => <LetterKey letter={letter} board={props.board} />}
            </For>
          </div>}</For></div>
  </div>
}

function LetterKey(props: { letter: letterKey,board: typeof leftBoard }) {
  const fingers=useSelector(props.board,s=>s.context.fingers);
  return <div
    class={`w-12 h-12 flex items-center justify-center ${fingers()[props.letter.col]} ${rowClasses[props.letter.row]} rounded-md shadow-sm font-bold text-xl`}
  >
    {props.letter.letter}
  </div>
}