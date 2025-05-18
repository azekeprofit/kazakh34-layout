import { useSelector } from "@xstate/store/solid";
import { createSignal, useContext } from "solid-js";
import { BoardMode } from "./app";
import { letters } from "./frequencies";
import { cBoard, leftBoard, letterKey } from "./store";

function heatMapColorforValue(place: number) {
    var h = (place / letters().length) * 180;
    return "hsl(" + h + ", 100%, 50%)";
}

export function LetterKey(props: { letter: letterKey, board: typeof leftBoard }) {
    const [inputMode, setInput] = createSignal(false);
    const fingers = useSelector(props.board, s => s.context.fingers);
    const cRows = useSelector(cBoard.get(props.board), s => s.context.rows);
    const boardMode = useContext(BoardMode);
    const frequencyPlace = () => letters().indexOf(props.letter.letter);
    const different = () => cRows()[props.letter.row][props.letter.col].letter !== props.letter.letter;
    
    return <div class={`w-12 h-12
     flex items-center justify-center rounded-md shadow-sm font-bold text-xl cursor-pointer
     ${boardMode() == 'fingers' && `
        ${inputMode() && 'animate-bounce'}
        ${fingers()[props.letter.col]}
        `}
        ${boardMode() == 'diff' && different() && 'bg-red-500'}
     `}
        tabIndex={-1}
        title={frequencyPlace().toString()}
        style={boardMode() == 'heatmap' && { background: heatMapColorforValue(frequencyPlace()) }}
        onclick={() => setInput(true)}
        onkeypress={(e) => {
            props.board.send({ type: 'setKey', letter: e.key, row: props.letter.row, col: props.letter.col });
            setInput(false);
        }}
        onblur={() => setInput(false)}
    >
        {props.letter.letter}
    </div>
}