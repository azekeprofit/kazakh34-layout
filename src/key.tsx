import { useSelector } from "@xstate/store/solid";
import { leftBoard, letterKey } from "./store";
import { createSignal } from "solid-js";

export function LetterKey(props: { letter: letterKey, board: typeof leftBoard }) {
    const [inputMode, setInput] = createSignal(false);
    const fingers = useSelector(props.board, s => s.context.fingers);
    return <div class={`w-12 h-12
     flex items-center justify-center rounded-md shadow-sm font-bold text-xl
     ${inputMode() && 'animate-bounce'}
     ${fingers()[props.letter.col]}`}
     tabIndex={-1}
        onclick={() => setInput(true)}
        onkeypress={(e) => {
            props.board.send({ type: 'setKey', letter: e.key, row: props.letter.row, col: props.letter.col });
            setInput(false);
        }}
        onblur={()=>setInput(false)}
    >
        {props.letter.letter}
    </div>
}