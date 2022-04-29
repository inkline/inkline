import { Configuration, Theme, UserConfiguration } from '../types';
import { setValueByPath } from '@grozav/utils';

/**
 * Recursively apply resolvers to each key value pair in the source object, setting the value in the target object
 *
 * @param config
 * @param source
 * @param target
 * @param parentPath
 * @param options
 */
export const applyResolvers = (
    config: Configuration,
    source: Record<string, any>,
    target: Record<string, any> = {},
    parentPath: string[] = [],
    options = {
        recurseOn: 'pre',
        stopOnMatch: false
    }
): Record<string, any> => {
    Object.entries(source).forEach(([key, value]) => {
        const path = [...parentPath, key];
        const joinedPath = path.join('.');

        const context: UserConfiguration.ConfigurationContext<typeof value> = {
            config,
            theme: target as Theme,
            path,
            value
        };

        // If the value is an object, increase depth by one level
        // and apply resolvers to object fields recursively, pre-resolve
        if (typeof value === 'object' && options.recurseOn === 'pre') {
            return applyResolvers(config, value, target, path, options);
        }

        // @TODO Maybe extract this and add a applyVariantResolvers() function?
        let matches = 0;
        config.resolvers.forEach((resolver) => {
            // Check if resolver test path matches and set resolve
            // return value at target path
            if (resolver.test.test(joinedPath) && !resolver.skip?.test(joinedPath)) {
                const targetValue = resolver.resolve(context);

                if (typeof resolver.set === 'function') {
                    resolver.set(context, targetValue);
                } else {
                    // Compute target path by processing the path string
                    const targetPath = joinedPath.replace(resolver.test, resolver.set);

                    setValueByPath(target, targetPath, targetValue);
                }

                matches += 1;
            }
        });

        // If stopOnMatch option is true and there was a resolver pattern match,
        // stop recursive execution
        if (options.stopOnMatch && matches > 0) {
            return;
        }

        // Increase depth and apply resolvers to object fields recursively, post-resolve
        if (typeof value === 'object' && options.recurseOn === 'post') {
            return applyResolvers(config, value, target, path, options);
        }
    });

    return target;
};
