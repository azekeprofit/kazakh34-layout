import { render } from "solid-js/web";
import { bigrams, source } from "./frequencies";
import { Keyboard } from "./layout";
import { BigramTable, Letters } from "./panels";
import { azeke, cyrillic, leftBoard, rightBoard, setLayout } from "./store";

function App() {
    return <div>
        <div class="flex gap-5 font-sans">
            <Keyboard board={leftBoard} />
            <Keyboard board={rightBoard} />
            <Letters />
            <BigramTable array={bigrams} />
        </div>
        <div>
                <button onClick={()=>setLayout(azeke)}>
                    azeke
                </button>
                <button onClick={()=>setLayout(cyrillic)}>
                    cyrillic
                </button>
        </div>
        <p>Source for data on Kazakh letter frequency: {source}</p>
    </div>;
}

render(() => <App />, document.body!);