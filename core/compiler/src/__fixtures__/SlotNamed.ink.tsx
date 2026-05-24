import { defineComponent, Slot } from "@inkline/core";
export default defineComponent(() => {
  return (
    <div>
      <header>
        <Slot name="header" />
      </header>
      <main>
        <Slot />
      </main>
      <footer>
        <Slot name="footer" />
      </footer>
    </div>
  );
});
