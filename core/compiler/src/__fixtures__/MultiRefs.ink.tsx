// @ts-nocheck
import { createRef, defineComponent, onMount } from "@inkline/core";
export default defineComponent(() => {
  const inputRef = createRef();
  const buttonRef = createRef();
  onMount(() => {
    inputRef.current?.focus();
  });
  return (
    <div>
      <input ref={inputRef} placeholder="focus me" />
      <button ref={buttonRef}>Click</button>
    </div>
  );
});
