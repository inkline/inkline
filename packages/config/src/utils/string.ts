import { render, Scope } from 'micromustache';

/**
 * Convert string to kebab-case
 * @param string
 */
export function toKebabCase(string: string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Interpolate values from given scope
 *
 * @param template
 * @param scope
 */
export const interpolate = <TemplateType = any, ScopeType = Record<string, unknown>>(
    template: TemplateType,
    scope: ScopeType
) => {
    return render(`${template as string}`, scope as Scope, { tags: ['<%', '%>'] });
};
