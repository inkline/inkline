/**
 * Derive a compiled component's Angular element selector from its authored name.
 *
 * PascalCase selectors technically match inside Angular-parsed templates, but they break the
 * moment a tag passes through an HTML parser — which lowercases it — e.g. when bootstrapping
 * from a server-rendered document. So every compiled component gets a kebab-case selector with
 * the `ink-` prefix (the leading `I` of Inkline component names folds into the prefix), which is
 * also what keeps generic names like `Label` from colliding with native elements:
 *
 * - `IBadge` → `ink-badge`
 * - `IInputControlBase` → `ink-input-control-base`
 * - `Label` → `ink-label`
 * - `prefixSuffix` (a story render component) → `ink-prefix-suffix`
 */
export function angularSelector(componentName: string): string {
  const base = componentName.replace(/^I(?=[A-Z])/, "");
  const kebab = base
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
  return `ink-${kebab}`;
}

/**
 * The attribute-selector form for a headless component, binding the directive to a native element
 * via an attribute (the Angular Material `button[mat-button]` pattern). The element tag is the
 * headless component's static root tag and the attribute token reuses {@link angularSelector}:
 *
 * - `IButtonBase` on `<button>` → `button[ink-button-base]`
 * - `IBadgeBase` on `<div>` → `div[ink-badge-base]`
 */
export function angularAttrSelector(componentName: string, tag: string): string {
  return `${tag}[${angularSelector(componentName)}]`;
}
