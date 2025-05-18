import { render } from "solid-js/web";
import { bigrams, source } from "./frequencies";
import { Board } from "./layout";
import { BigramTable, Letters } from "./panels";
import { leftBoard, rightBoard } from "./store";

function App() {
    return <div>
        <div class="flex gap-5 font-sans">
            <Board board={leftBoard} />
            <Board board={rightBoard} />
            <Letters />
            <BigramTable array={bigrams} />
        </div>
        <p>Source for data: {source}</p>
    </div>;
}

render(() => <App />, document.body!);