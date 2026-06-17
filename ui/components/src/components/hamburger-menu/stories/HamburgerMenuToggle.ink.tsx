import { createSignal, defineComponent, Show } from "@inkline/core";
import IHamburgerMenu from "../styled/IHamburgerMenu.ink.tsx";

// The full disclosure pattern: clicking the toggle flips `open` (morphing the icon) and shows/hides
// the navigation it controls, linked via `aria-controls`.
export default defineComponent(() => {
  const [open, _setOpen] = createSignal(false);
  return (
    <div id="story">
      <IHamburgerMenu ariaControls="primary-nav" ariaLabel="Toggle navigation" $bind:open={open} />
      <Show when={open()}>
        <nav id="primary-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </Show>
    </div>
  );
});
