export { default as IBadge } from "./badge/styled/IBadge.ink.tsx";
export { default as IBadgeBase } from "./badge/headless/IBadgeBase.ink.tsx";

export { default as IButton } from "./button/styled/IButton.ink.tsx";
export { default as IButtonBase } from "./button/headless/IButtonBase.ink.tsx";

// Callout ships as a single styled component (ICallout) that composes every headless part. The
// headless parts remain individually exported for advanced/custom composition.
export { default as ICallout } from "./callout/styled/ICallout.ink.tsx";
export { default as ICalloutBase } from "./callout/headless/ICalloutBase.ink.tsx";
export { default as ICalloutContentBase } from "./callout/headless/ICalloutContentBase.ink.tsx";
export { default as ICalloutDismissBase } from "./callout/headless/ICalloutDismissBase.ink.tsx";
export { default as ICalloutIconBase } from "./callout/headless/ICalloutIconBase.ink.tsx";

export { default as IFieldGroup } from "./field-group/styled/IFieldGroup.ink.tsx";
export { default as IFieldGroupBase } from "./field-group/headless/IFieldGroupBase.ink.tsx";

export { default as IHamburgerMenu } from "./hamburger-menu/styled/IHamburgerMenu.ink.tsx";
export { default as IHamburgerMenuBase } from "./hamburger-menu/headless/IHamburgerMenuBase.ink.tsx";

// Input ships as a single styled component (IInput) that composes every headless part. The headless
// parts remain individually exported for advanced/custom composition.
export { default as IInput } from "./input/styled/IInput.ink.tsx";
export { default as IInputBase } from "./input/headless/IInputBase.ink.tsx";
export { default as IInputControlBase } from "./input/headless/IInputControlBase.ink.tsx";
export { default as IInputPrefixBase } from "./input/headless/IInputPrefixBase.ink.tsx";
export { default as IInputSuffixBase } from "./input/headless/IInputSuffixBase.ink.tsx";
