export { default as IBadge } from "./badge/styled/IBadge.ink.tsx";
export { default as IBadgeBase } from "./badge/headless/IBadgeBase.ink.tsx";

export { default as IButton } from "./button/styled/IButton.ink.tsx";
export { default as IButtonBase } from "./button/headless/IButtonBase.ink.tsx";

// Checkbox ships as a single styled component (ICheckbox) composing the label wrapper and the native
// control. The headless parts remain individually exported for advanced/custom composition.
export { default as ICheckbox } from "./checkbox/styled/ICheckbox.ink.tsx";
export { default as ICheckboxBase } from "./checkbox/headless/ICheckboxBase.ink.tsx";
export { default as ICheckboxControlBase } from "./checkbox/headless/ICheckboxControlBase.ink.tsx";

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

// Radio ships as a single styled component (IRadioGroup) that composes every headless part. The
// headless parts remain individually exported for advanced/custom composition.
export { default as IRadioGroup } from "./radio/styled/IRadioGroup.ink.tsx";
export { default as IRadioGroupBase } from "./radio/headless/IRadioGroupBase.ink.tsx";
export { default as IRadioBase } from "./radio/headless/IRadioBase.ink.tsx";
export { default as IRadioFieldBase } from "./radio/headless/IRadioFieldBase.ink.tsx";

// Switch ships as a single styled component (ISwitch) that composes every headless part. The
// headless parts remain individually exported for advanced/custom composition.
export { default as ISwitch } from "./switch/styled/ISwitch.ink.tsx";
export { default as ISwitchBase } from "./switch/headless/ISwitchBase.ink.tsx";
export { default as ISwitchControlBase } from "./switch/headless/ISwitchControlBase.ink.tsx";
export { default as ISwitchLabelBase } from "./switch/headless/ISwitchLabelBase.ink.tsx";
