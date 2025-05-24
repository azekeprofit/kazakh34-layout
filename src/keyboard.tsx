import { useSelector } from '@xstate/store/solid';
import { For, Show } from "solid-js";
import { LetterKey } from "./key";
import { keyboard } from './store';

export function Keyboard() {
  const rows = useSelector(keyboard, s => s.context.rows);
  return <div class='capitalize'>
    <div class="grid grid-row ms-3 gap-2">
      <For each={rows()}>
        {(row,rowIndex) =>
          <div class="grid grid-cols-11 gap-2">
            <For each={row}>
              {(letter,col) => <>
                <LetterKey letter={letter} />
                <Show when={col()==4}>
                  <div></div>
                </Show>
              </>}
            </For>
          </div>}</For></div>
  </div>
}
