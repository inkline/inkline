import { createRef, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const myRef = createRef();
  // Deliberately invalid: `MyComponent` is never imported or declared. The fixture asserts the
  // compiler forwards a ref to an unresolved component element without erroring; TypeScript
  // correctly reports TS2304 for the undeclared name.
  // @ts-expect-error -- undeclared component identifier, by design
  return <MyComponent ref={myRef} />;
});
