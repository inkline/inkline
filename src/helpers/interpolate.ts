import { render } from 'micromustache';

/**
 * Interpolate values from given scope
 *
 * @param template
 * @param scope
 */
export const interpolate = <TemplateType = any, ScopeType = {}>(template: TemplateType, scope: ScopeType) => {
    return render(`${template}`, scope, { tags: ['<%', '%>'] });
};
