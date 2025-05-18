import { render } from "solid-js/web";
import { bigrams, source } from "./frequencies";
import { Keyboard } from "./layout";
import { BigramTable, Letters } from "./panels";
import { azeke, cyrillic, leftBoard, rightBoard, setLayout } from "./store";

function App() {
    return <div class='font-mono'>
        <h1>Kazakh layout analysis for 34 key split keyboard</h1>

        <p>
            <button onClick={() => setLayout(cyrillic)}>
                cyrillic
            </button> - standard layout, copied from standard Cyrillic, with Kazakh specific letters tucked away to numbers row
        </p>
        <p>
            <button onClick={() => setLayout(azeke)}>
                azeke
            </button> - my personal layout, with most frequent Kazakh letters placed on a 34 key split keyboard with the missing rarer letters put on ZMK combos (see full <a href="https://github.com/azekeprofit/zmk-config/blob/main/config/cradio.keymap">keymap</a> at my ZMK fork repo.
        </p>

        <div class="flex gap-5 font-sans">
            <Keyboard board={leftBoard} />
            <Keyboard board={rightBoard} />
            <Letters />
            <BigramTable array={bigrams} />
        </div>
        <p>Source for data on Kazakh letter frequency: {source}</p>
    </div>;
}

render(() => <App />, document.body!);