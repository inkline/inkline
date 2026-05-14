// @ts-nocheck
import { createEffect, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  createEffect(() => {
    console.log("static");
  });
  return <div>Hello</div>;
});
