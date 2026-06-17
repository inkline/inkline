import { defineStories } from "@inkline/storybook";
import type { HamburgerMenuProps } from "../styled/IHamburgerMenu.ink.tsx";

// `open` is the two-way model prop (added by `defineModel`, so not a member of `HamburgerMenuProps`).
// Include it explicitly to expose it as a control and drive the `Open` variant.
const meta = defineStories<HamburgerMenuProps & { open?: boolean }>({
  component: "IHamburgerMenu",
  title: "Components/Navigation/HamburgerMenu",
  args: {
    ariaLabel: "Toggle menu",
    open: false,
    disabled: false,
  },
  argTypes: {
    open: { control: "boolean", description: "Open (expanded) state" },
    ariaLabel: { control: "text", description: "Accessible name (aria-label)" },
    ariaControls: {
      control: "text",
      description: "Id of the controlled region (aria-controls)",
    },
    color: {
      control: "select",
      options: ["light", "dark", "neutral"],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    animation: {
      control: "select",
      options: ["close", "arrow-up", "arrow-down", "arrow-left", "arrow-right", "minus", "plus"],
      description: "Icon morph shown while open",
    },
    disabled: { control: "boolean", description: "Disabled state" },
  },
});

export default meta;

export const Default = {};
export const Open = { args: { open: true } };
export const Disabled = { args: { disabled: true } };
export const Colors = { render: "./HamburgerMenuColors.ink.tsx" };
export const Sizes = { render: "./HamburgerMenuSizes.ink.tsx" };
export const Animations = { render: "./HamburgerMenuAnimations.ink.tsx" };
export const Toggle = { render: "./HamburgerMenuToggle.ink.tsx" };
