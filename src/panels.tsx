import { For } from "solid-js";
import { fingerColors, letterFrequencies } from "./frequencies";
import { useSelector } from "@xstate/store/solid";
import { keyboard } from "./store";

export function Letters() {
    const letters = useSelector(keyboard,c=>c.context.letters);
    const missing = (l: string) => !letters()[l];
    const missingCount = () => Object.keys(letterFrequencies).filter(missing).length;

    return <div>
        <div>Most frequent letters:</div>
        <div><For each={Object.entries(letterFrequencies)}>{
            (([letter, freq]) => <span
                class={`cursor-default ${missing(letter) && 'bg-red-200'}`}
                title={freq.toString()}>{letter}</span>)}</For></div>
        <div>
            <div>Letters missing: {missingCount()}</div>
        </div>
    </div>
}

export function BigramTable({ array }: { array: Record<string, number> }) {
    return <div class={`w-[200px]`}>
        <div>Most frequent bigrams:</div>
        <For each={Object.entries(array)}>{
            ([letter, freq]) => <Bigram bigram={letter} freq={freq} />
        }</For>
        <div>Highlighted bigrams are typed with the same finger</div>
    </div>
}


function Bigram(props: { bigram: string, freq: number }) {
    const letters=useSelector(keyboard,k=>k.context.letters);
    const col = (letter: string) => fingerColors[letters()[letter]?.col];
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
