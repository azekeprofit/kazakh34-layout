import { render } from "solid-js/web";
import { bigrams, source } from "./frequencies";
import { Keyboard } from "./layout";
import { BigramTable, Letters } from "./panels";
import { azeke, cyrillic, leftBoard, rightBoard, setLayout } from "./store";
import { createContext, createSignal } from "solid-js";
import { ZMK } from "./zmk";

type boardModeType = 'fingers' | 'heatmap' | 'diff';
export const BoardMode = createContext<() => boardModeType>(null!);

function App() {
    const [mode, setMode] = createSignal<boardModeType>('fingers');
    const changeMode = e => setMode(e.target.value as boardModeType);

    return <div class='font-mono'>
        <h1>Kazakh layout analysis for 34 key split keyboard</h1>

        <p>
            <button onClick={() => setLayout([leftBoard, rightBoard], cyrillic)}>
                cyrillic
            </button> - standard layout, copied from standard Cyrillic, with Kazakh specific letters tucked away to numbers row
        </p>
        <p>
            <button onClick={() => setLayout([leftBoard, rightBoard], azeke)}>
                azeke
            </button> - my personal layout, with most frequent Kazakh letters placed on a 34 key split keyboard with the missing rarer letters put on ZMK combos (see full <a href="https://github.com/azekeprofit/zmk-config/blob/main/config/cradio.keymap">keymap</a> at my ZMK fork repo.
        </p>

        <div class="flex gap-5 font-sans">
            <BoardMode.Provider value={mode}>
                <Keyboard board={leftBoard} />
                <Keyboard board={rightBoard} />
            </BoardMode.Provider>
            <Letters />
            <BigramTable array={bigrams} />
        </div>
        <div>
            Mode:
            <label><input type="radio" name='mode' value='fingers' checked={true} onClick={changeMode} />fingers</label>
            <label><input type="radio" name='mode' value='heatmap' onClick={changeMode} />heatmap</label>
            <label><input type="radio" name='mode' value='diff' onClick={changeMode} />differences from cyrillic</label>
        </div>
        <ZMK />
        <p>Source for data on Kazakh letter frequency: {source}</p>
    </div>;
}

render(() => <App />, document.body!);