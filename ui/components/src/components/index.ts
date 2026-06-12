export { default as IBadge } from "./badge/styled/IBadge.ink.tsx";
export { default as IBadgeBase } from "./badge/headless/IBadgeBase.ink.tsx";

export { default as IButton } from "./button/styled/IButton.ink.tsx";
export { default as IButtonBase } from "./button/headless/IButtonBase.ink.tsx";

// Input ships as a single styled component (IInput) that composes every headless part. The headless
// parts remain individually exported for advanced/custom composition.
export { default as IInput } from "./input/styled/IInput.ink.tsx";
export { default as IInputBase } from "./input/headless/IInputBase.ink.tsx";
export { default as IInputControlBase } from "./input/headless/IInputControlBase.ink.tsx";
export { default as IInputGroupBase } from "./input/headless/IInputGroupBase.ink.tsx";
export { default as IInputPrefixBase } from "./input/headless/IInputPrefixBase.ink.tsx";
export { default as IInputSuffixBase } from "./input/headless/IInputSuffixBase.ink.tsx";
export { default as IInputPrependBase } from "./input/headless/IInputPrependBase.ink.tsx";
export { default as IInputAppendBase } from "./input/headless/IInputAppendBase.ink.tsx";
