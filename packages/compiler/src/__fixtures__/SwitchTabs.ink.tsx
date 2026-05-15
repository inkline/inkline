// @ts-nocheck
import { createSignal, defineComponent, Switch, Match } from "@inkline/core";
export default defineComponent(() => {
  const [tab, setTab] = createSignal("a");
  return (
    <div>
      <Switch>
        <Match when={tab() === "a"}>
          <p>Tab A</p>
        </Match>
        <Match when={tab() === "b"}>
          <p>Tab B</p>
        </Match>
      </Switch>
      <button onClick={() => setTab(tab() === "a" ? "b" : "a")}>Switch</button>
    </div>
  );
});
