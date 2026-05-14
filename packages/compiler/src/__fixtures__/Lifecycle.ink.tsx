// @ts-nocheck
import { createSignal, defineComponent, onMount, onCleanup } from "@inkline/core";
export default defineComponent(() => {
  const [mounted, setMounted] = createSignal(false);
  onMount(() => {
    setMounted(true);
  });
  onCleanup(() => {
    console.log("cleanup");
  });
  return <span>{mounted() ? "mounted" : "pending"}</span>;
});
