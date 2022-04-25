import {Configuration, Theme, UserConfiguration} from '../types';
import { setValueByPath } from '@grozav/utils';

/**
 * Recursively apply resolvers to each key value pair in the source object, setting the value in the target object
 *
 * @param config
 * @param source
 * @param target
 * @param parentPath
 */
export const applyResolvers = (
    config: Configuration,
    source: Record<string, any>,
    target: Record<string, any> = {},
    parentPath: string[] = []
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
        // and apply resolvers to object fields recursively
        if (typeof value === 'object') {
            return applyResolvers(config, value, target, path);
        }

        config.resolvers.forEach((resolver) => {
            // Check if resolver test path matches and set resolve
            // return value at target path
            if (resolver.test.test(joinedPath)) {
                const targetValue = resolver.resolve(context);

                if (typeof resolver.set === 'function') {
                    resolver.set(context, targetValue);
                } else {
                    // Compute target path by processing the path string
                    const targetPath = joinedPath.replace(resolver.test, resolver.set);

                    setValueByPath(target, targetPath, targetValue);
                }
            }
        });
    });

    return target;
};
