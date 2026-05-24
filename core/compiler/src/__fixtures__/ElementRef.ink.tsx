import { createRef, defineComponent, onMount } from "@inkline/core";
export default defineComponent(() => {
  const inputRef = createRef();
  onMount(() => {
    inputRef.current?.focus();
  });
  return <input ref={inputRef} placeholder="auto-focus" />;
});
