import { defineStories } from "@inkline/storybook";
import type { AvatarProps } from "../styled/IAvatar.ink.tsx";

const meta = defineStories<AvatarProps>({
  component: "IAvatar",
  title: "Components/Data Display/Avatar",
  args: {
    label: "JD",
  },
  argTypes: {
    src: { control: "text", description: "Image URL; falls back to the label when absent" },
    alt: { control: "text", description: "Alternative text for the image" },
    label: { control: "text", description: "Fallback text, typically initials" },
    color: {
      control: "select",
      options: ["primary", "light", "dark", "neutral"],
      description: "Color variant",
    },
    variant: { control: "select", options: ["solid", "soft"], description: "Style variant" },
    shape: { control: "select", options: ["circle", "square"], description: "Shape variant" },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    badge: { control: "boolean", description: "Show a status-indicator dot" },
    badgeColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "light",
        "dark",
        "neutral",
      ],
      description: "Color of the status badge",
    },
    badgePosition: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      description: "Corner the status badge sits in",
    },
  },
});

export default meta;

export const Default = {};
export const WithBadge = { args: { badge: true, badgeColor: "success" } };
export const Square = { args: { shape: "square" } };
export const Colors = { render: "./AvatarColors.ink.tsx" };
export const Variants = { render: "./AvatarVariants.ink.tsx" };
export const Shapes = { render: "./AvatarShapes.ink.tsx" };
export const Sizes = { render: "./AvatarSizes.ink.tsx" };
export const Image = { render: "./AvatarImage.ink.tsx" };
export const Badges = { render: "./AvatarBadges.ink.tsx" };
