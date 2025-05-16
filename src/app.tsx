import { render } from "solid-js/web";
import { createSignal, Show } from 'solid-js';



function Counter() {
  const [count, setCount] = createSignal(1);

  return (<>
    <p class={count() % 2 == 0 ? 'text-red-600 font-bold' : 'text-amber-800'}>{count()}</p>
    <button onclick={() => setCount(c => c + 1)}>plus</button>
  </>
  );
}

render(() => <Counter />, document.body!);