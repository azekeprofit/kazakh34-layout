import { useSelector } from "@xstate/store/solid";
import { leftBoard, letterKey, rightBoard, useBoards } from "./store"
import { zmkCodes } from "./frequencies";
import { For } from "solid-js";

export function ZMK() {
    const left = useSelector(leftBoard, (s) => s.context.rows);
    const right = useSelector(rightBoard, (s) => s.context.rows);

    const l = (row: number, col: number) => zmkCodes[left()[row][col].letter];
    const r = (row: number, col: number) => zmkCodes[right()[row][col].letter];
    return <div class='mt-2'>ZMK layer:
        <pre class="m-0 border-1">
            {`
&kp ${l(0, 0)}        &kp ${l(0, 1)}       &kp ${l(0, 2)}      &kp ${l(0, 3)}      &kp ${l(0, 4)}    &kp ${r(0, 0)} &kp ${r(0, 1)}       &kp ${r(0, 2)}       &kp ${r(0, 3)}        &kp ${r(0, 4)}
&ht LSHIFT ${l(1, 0)} &ht LCTRL ${l(1, 1)} &ht LGUI ${l(1, 2)} &ht LALT ${l(1, 3)} &kp ${l(1, 4)}    &kp ${r(1, 0)} &rht LALT ${r(1, 1)} &rht RGUI ${r(1, 2)} &rht LCTRL ${r(1, 3)} &rht LSHIFT ${r(1, 4)}
&kp ${l(2, 0)}        &kp ${l(2, 1)}       &kp ${l(2, 2)}      &kp ${l(2, 3)}      &kp ${l(2, 4)}    &kp ${r(2, 0)} &kp ${r(2, 1)}       &kp ${r(2, 2)}       &kp ${r(2, 3)}        &trans`.trim()}
        </pre>
        Text:
        <pre class="m-0 border-1">
            <For each={[0, 1, 2]}>
                {(i) => <>{left()[i].map(l => l.letter).join('')} {right()[i].map(l => l.letter).join('')}
                <br/></>}
            </For>

        </pre>
    </div>;
}