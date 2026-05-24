import { defineComponent, defineSlot } from "@inkline/core";
export default defineComponent(() => {
  const header = defineSlot("header");
  const content = defineSlot();
  return (
    <div>
      <header>{header}</header>
      <main>{content}</main>
    </div>
  );
});
