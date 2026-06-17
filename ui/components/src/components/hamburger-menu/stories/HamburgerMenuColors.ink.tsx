import { defineComponent } from "@inkline/core";
import IHamburgerMenu from "../styled/IHamburgerMenu.ink.tsx";

export default defineComponent(() => {
  return (
    <div id="story">
      <IHamburgerMenu color="light" ariaLabel="Light menu" />
      <IHamburgerMenu color="dark" ariaLabel="Dark menu" />
      <IHamburgerMenu color="neutral" ariaLabel="Neutral menu" />
    </div>
  );
});
