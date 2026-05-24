import { createRef, defineComponent, onMount } from "@inkline/core";

const Child = defineComponent(() => {
  return <div>Child</div>;
});

export default defineComponent(() => {
  const childRef = createRef();
  onMount(() => {
    console.log(childRef.current);
  });
  return <Child ref={childRef} />;
});
