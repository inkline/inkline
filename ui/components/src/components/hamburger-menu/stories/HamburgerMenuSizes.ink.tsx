import { defineComponent } from "@inkline/core";
import IHamburgerMenu from "../styled/IHamburgerMenu.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IHamburgerMenu size="sm" ariaLabel="Small menu" />
      <IHamburgerMenu size="md" ariaLabel="Medium menu" />
      <IHamburgerMenu size="lg" ariaLabel="Large menu" />
    </div>
  );
});
