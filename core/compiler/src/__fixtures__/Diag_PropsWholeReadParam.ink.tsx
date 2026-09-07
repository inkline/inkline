import { defineComponent } from "@inkline/core";

// The annotation channel reads the same object as a whole, through the setup parameter. The binding
// is named `props`, so INK0074 does not apply; the output breaks the same way regardless of which
// channel declared the props. INK0075, from the same rule as the macro channel's.
export default defineComponent((props: { label: string }) => {
  return <div title={JSON.stringify(props)} />;
});
