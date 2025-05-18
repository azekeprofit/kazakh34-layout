import { useSelector } from "@xstate/store/solid";
import { For, Show } from "solid-js";
import { letterFrequencies } from "./frequencies";
import { cyrillic } from "./layout";
import { leftBoard, letterKey, rightBoard, useBoard } from "./store";

const missing = (letter: string) => !(cyrillic.join('').includes(letter));

export function Letters() {
    const [left, right] = useBoard();
    const missingCount = () => Object.keys(letterFrequencies).filter(l => !left()[l] && !right()[l]).length;
    const howMany = (side: typeof left) => Object.keys(letterFrequencies).filter(l => side()[l]).length;

    return <div>
        <div><For each={Object.entries(letterFrequencies)}>{
            (([letter, freq], index) => <span
                class={`cursor-default ${missing(letter) && 'bg-red-200'}`}
                title={freq.toString()}>{letter}</span>)}</For></div>
        <div>
            <div>{howMany(left)} : {howMany(right)}</div>
            <div>Missing: {missingCount()}</div>
        </div>
    </div>
}

export function BigramTable({ array }: { array: Record<string, number> }) {
    return <div class={`h-[250px] w-[200px] font-mono`}>
        <For each={Object.entries(array)}>{
            ([letter, freq]) => <Bigram bigram={letter} freq={freq} />
        }</For></div>
}


function Bigram(props: { bigram: string, freq: number }) {
    const [left, right, lFingers, rFingers] = useBoard();
    const col = (letter: string) => lFingers()[left()[letter]?.col] || rFingers()[right()[letter]?.col];
    const sameFinger = () => col(props.bigram[0]) === col(props.bigram[1]);
    return <span class='inline-block' title={props.freq.toString()}>
        <Letter letter={props.bigram[0]} fingerClass={sameFinger() && col(props.bigram[0])} />
        <Letter letter={props.bigram[1]} fingerClass={sameFinger() && col(props.bigram[1])} />
        &nbsp;
    </span>
}
function Letter(props: { letter: string, fingerClass: string }) {
    return <span class={props.fingerClass}>{props.letter}</span>
}
