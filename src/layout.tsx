import { useSelector } from '@xstate/store/solid';
import { For } from "solid-js";
import { LetterKey } from "./key";
import { leftBoard } from "./store";

export function Keyboard(props: { board: typeof leftBoard }) {
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
