import { createRef, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const myRef = createRef();
  return <MyComponent ref={myRef} />;
});
