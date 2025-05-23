import { useSelector } from "@xstate/store/solid";
import { For } from "solid-js";
import { letter } from "./frequencies";
import { keyboard } from "./store";

const zmkCodes: Record<letter, string> = {
    'а': 'F',
    'е': 'T',
    'ы': 'S',
    'н': 'Y',
    'і': 'N3',
    'т': 'N',
    'р': 'H',
    'л': 'K',
    'д': 'L',
    'с': 'C',
    'м': 'V',
    'қ': 'N0',
    'о': 'J',
    'к': 'R',
    'ғ': 'N5',
    'б': 'COMMA',
    'й': 'Q',
    'у': 'E',
    'з': 'P',
    'п': 'G',
    'ш': 'I',
    'г': 'U',
    'ң': 'N4',
    'и': 'B',
    'ж': 'SEMICOLON',
    'ұ': 'N9',
    'ө': 'MINUS',
    'ү': 'N8',
    'ә': 'N2',
    'я': 'Z',
    'х': 'LEFT_BRACKET',
    'ц': 'W',
    'ф': 'A',
    'в': 'D',
    'э': 'SQT',
    'ь': 'M',
    'ю': 'DOT',
    'һ': 'EQUAL',
    'ъ': 'RIGHT_BRACKET',
    'ч': 'X',
    'щ': 'O',
    'ё': 'GRAVE',
}

export function ZMK() {
    const letters = useSelector(keyboard, (s) => s.context.rows);

    const l = (row: number, col: number) => zmkCodes[letters()[row][col].letter];
    const r = (row: number, col: number) => zmkCodes[letters()[row][4 + col].letter];
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
                {(i) => <>{letters()[i].map(l => l.letter).join('')}<br /></>}
            </For>

        </pre>
    </div>;
}