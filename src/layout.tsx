import { For, resetErrorBoundaries } from "solid-js";

export type layout = [left: string, right: string];

export const cyrillic: layout = [
  `
йцуке
фывап
ячсми
`,
  `
нгшщз
ролдж
тьбю⏎
`,
];

export const fingerColors = ['bg-blue-100', 'bg-yellow-100', 'bg-green-100', 'bg-orange-100', 'bg-orange-100']

export const rowClasses=['underline underline-offset-[-2ex]','','underline']

export function Board({ letters, fingers }: { letters: string, fingers: string[] }) {
  const rows = letters.trim().split('\n');
  return <div class='capitalize'>
    <div class="grid grid-row ms-3 gap-2">
      <For each={rows}>
        {(row,rowIndex) =>
          <div class="grid grid-cols-5 gap-2">
            <For each={row.split('')}>
              {(letter, index) => <div
                class={`w-12 h-12 flex items-center justify-center ${fingers[index()]} ${rowClasses[rowIndex()]} rounded-md shadow-sm font-bold text-xl`}
              >
                {letter}
              </div>
              }
            </For>
          </div>}</For></div>
  </div>
}