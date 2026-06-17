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
 * The camelCase attribute selector for a compiled component used as an attribute-selector
 * directive/host-element (the Angular Material pattern, e.g. `<button mat-button>`). The leading
 * `I` folds into the `ink` prefix, mirroring {@link angularSelector}:
 *
 * - `IButtonBase` → `inkButtonBase`
 * - `IBadge` → `inkBadge`
 * - `Label` → `inkLabel`
 */
export function angularAttrSelector(componentName: string): string {
  const base = componentName.replace(/^I(?=[A-Z])/, "");
  return "ink" + base.charAt(0).toUpperCase() + base.slice(1);
}

/** An element-plus-attribute selector for an attribute-selector component (`button[inkButtonBase]`). */
export function angularElementSelector(tag: string, attr: string): string {
  return `${tag}[${attr}]`;
}
