import { defineComponent } from "@inkline/core";
import IHamburgerMenu from "../styled/IHamburgerMenu.ink.tsx";

// Each toggle is rendered open so its morph target (the `animation` axis) is visible.
export default defineComponent(() => {
  return (
    <div id="story">
      <IHamburgerMenu animation="close" open={true} ariaLabel="Close morph" />
      <IHamburgerMenu animation="arrow-up" open={true} ariaLabel="Arrow-up morph" />
      <IHamburgerMenu animation="arrow-down" open={true} ariaLabel="Arrow-down morph" />
      <IHamburgerMenu animation="arrow-left" open={true} ariaLabel="Arrow-left morph" />
      <IHamburgerMenu animation="arrow-right" open={true} ariaLabel="Arrow-right morph" />
      <IHamburgerMenu animation="minus" open={true} ariaLabel="Minus morph" />
      <IHamburgerMenu animation="plus" open={true} ariaLabel="Plus morph" />
    </div>
  );
});
