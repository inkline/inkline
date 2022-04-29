import { render } from 'micromustache';

/**
 * Interpolate values from given scope
 *
 * @param template
 * @param scope
 */
export const interpolate = <T = any, S = {}>(template: T, scope: S) => {
    return render(`${template}`, scope, { tags: ['<%', '%>'] });
};
