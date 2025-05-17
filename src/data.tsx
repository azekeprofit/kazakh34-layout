import { For } from "solid-js";
import { bigrams, letterFrequencies, source } from "./frequencies";
import { Board, cyrillic, fingerColors } from "./layout";

export function FreqData() {
    const [left, right] = cyrillic;
    return <div>
        <div class="flex gap-5 font-sans">
            <Board letters={left} fingers={fingerColors} />
            <Board letters={right} fingers={fingerColors.reverse()} />
            <Letters left={left} right={right} />
            <Table title='Bigram' array={bigrams} />
        </div>
        <p>Source for data: {source}</p>
    </div>;
}

function Letters({ left, right }: { left: string, right: string }) {
    const missing = (letter: string) => !(left + right).includes(letter);
    const howMany = (side: string) => Object.keys(letterFrequencies).filter(l => side.includes(l)).length;
    return <div>
        <div><For each={Object.entries(letterFrequencies)}>{
            (([letter, freq], index) => <span
                class={`cursor-default ${missing(letter) && 'bg-red-200'}`}
                title={freq.toString()}>{letter}</span>)}</For></div>
        <div>
            <p>On the left: {howMany(left)}</p>
            <p>On the right: {howMany(right)}</p>
        </div>
    </div>
}

function Table({ array, title }: { array: Record<string, number>, title: string }) {
    return <div>
        <div class={`overflow-y-scroll h-[300px] w-[200px]`}>
            <table class='w-full'>
                <thead><tr><th></th>
                    <th class="text-left">{title}</th>
                    <th class='text-right'>Frequency</th>
                </tr>
                </thead>
                <tbody>
                    <For each={Object.entries(array)}>{
                        (([letter, freq], index) =>
                            <tr>
                                <td class='text-gray-500 text-sm w-3'>{index() + 1}</td>
                                <td>{letter}</td>
                                <td class="text-right">{freq}</td>
                            </tr>
                        )
                    }</For>
                </tbody>
            </table>
        </div></div>
}
